require 'sinatra'
require 'liquid'
require 'kramdown'
require 'yaml'
require 'json'

# Configuration
use Rack::Static, :urls => ["/assets"], :root => "."
set :views, '_layouts'

# Configure Liquid
Liquid::Template.file_system = Liquid::LocalFileSystem.new('_includes')

# Register custom Liquid filters for Jekyll compatibility
module JekyllFilters
  def relative_url(input)
    input.to_s
  end

  def append(input, value)
    "#{input}#{value}"
  end

  def date(input, format)
    return '' unless input
    time = input.is_a?(Time) ? input : Time.parse(input.to_s)
    time.strftime(format.gsub('%-d', '%d').gsub('%B', '%B'))
  rescue
    input.to_s
  end
end

Liquid::Template.register_filter(JekyllFilters)

# Helper to load a collection (courses, lessons, dispatch_notes)
def load_collection(dir_name)
  dir_path = "_#{dir_name}"
  return [] unless Dir.exist?(dir_path)

  Dir.glob("#{dir_path}/*.{md,markdown}").map do |file|
    content = File.read(file)
    front_matter = {}
    if content =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
      parsed = YAML.unsafe_load($1)
      front_matter = parsed.is_a?(Hash) ? parsed : {}
    end

    slug = File.basename(file, '.*')
    front_matter.merge({
      'url' => "/#{dir_name.tr('_', '-')}/#{slug}/",
      'slug' => slug
    })
  end
end

# Load all collections at startup
# In Sinatra, we can use a before block to set up data for Liquid
before do
  @site_data = {
    'title' => 'Medic 138',
    'baseurl' => '',
    'courses' => load_collection('courses'),
    'lessons' => load_collection('lessons'),
    'dispatch_notes' => load_collection('dispatch_notes')
  }
end


# JSON endpoint for client-side search
get '/search.json' do
  content_type :json
  
  data = site_data
  results = []
  
  ['courses', 'lessons'].each do |type|
    data[type].each do |item|
      results << {
        title: item['title'],
        url: item['url'],
        summary: item['summary'],
        level: item['level'],
        topic: item['topic'],
        duration: item['duration'],
        type: type
      }
    end
  end
  
  results.to_json
end

# Helper to read and render content
def render_page(path)
  return "File not found: #{path}" unless File.exist?(path)

  content = File.read(path)
  if content =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
    front_matter = YAML.unsafe_load($1) || {}
    body = $'
  elsif content =~ /^(---\s*\n.*?\n?)^(\.\.\.\s*$\n?)/m
    front_matter = YAML.unsafe_load($1) || {}
    body = $'
  else
    front_matter = {}
    body = content
  end

  # First pass: render Liquid in body content
  liquid_body = Liquid::Template.parse(body)
  rendered_body = liquid_body.render('site' => @site_data, 'page' => front_matter)

  # Convert Markdown to HTML
  html_body = Kramdown::Document.new(rendered_body).to_html

  # Render with layout (supports nested layouts like lesson.html -> default.html)
  layout_name = front_matter['layout'] || 'default'
  result = html_body
  
  while layout_name
    layout_file = File.join(settings.views, "#{layout_name}.html")
    break unless File.exist?(layout_file)
    
    layout_content = File.read(layout_file)
    layout_front_matter = {}
    layout_body = layout_content
    
    # Parse layout's own frontmatter (for nested layouts)
    if layout_content =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
      layout_front_matter = YAML.unsafe_load($1) || {}
      layout_body = $'
    end
    
    liquid_layout = Liquid::Template.parse(layout_body)
    result = liquid_layout.render(
      'content' => result,
      'page' => front_matter,
      'site' => @site_data
    )
    
    # Check if this layout has a parent layout
    layout_name = layout_front_matter['layout']
  end
  
  result
end

# Routes
get '/' do
  if File.exist?('index.markdown')
    render_page('index.markdown')
  elsif File.exist?('index.html')
    render_page('index.html')
  else
    "Welcome to Medic 138 (Sinatra Version)"
  end
end

# Games / Lab route (renders with layout)
get '/lab/?' do
  render_page('games/index.html')
end

get '/games/?' do
  render_page('games/index.html')
end

# Explicit lesson routes (handle both /lesson/ and /lessons/ patterns)
get '/lesson/:slug/?' do |slug|
  candidates = ["_lessons/#{slug}.md", "_lessons/#{slug}.markdown"]
  found = candidates.find { |f| File.exist?(f) }
  if found
    render_page(found)
  else
    status 404
    "Lesson Not Found: #{slug}"
  end
end

get '/lessons/:slug/?' do |slug|
  candidates = ["_lessons/#{slug}.md", "_lessons/#{slug}.markdown"]
  found = candidates.find { |f| File.exist?(f) }
  if found
    render_page(found)
  else
    status 404
    "Lesson Not Found: #{slug}"
  end
end

# Explicit course routes
get '/courses/:slug/?' do |slug|
  candidates = ["_courses/#{slug}.md", "_courses/#{slug}.markdown"]
  found = candidates.find { |f| File.exist?(f) }
  if found
    render_page(found)
  else
    status 404
    "Course Not Found: #{slug}"
  end
end

get '/*' do |path|
  # Strip trailing slash for matching
  path = path.chomp('/')
  
  # Special case for terminology and games which are directories in root
  if path == "terminology" || path == "games"
    return render_page("#{path}/index.html")
  end

  # Try direct file paths
  candidates = [
    "#{path}.markdown",
    "#{path}.md",
    "#{path}/index.markdown",
    "#{path}/index.md",
    "#{path}/index.html"
  ]

  # Check if it's a static file that should be served directly (js, css, etc)
  if path =~ /\.(css|js|png|jpg|svg|json|pdf)$/ && File.exist?(path)
    return send_file path
  end

  # Collection-specific logic
  if path.start_with?('lessons/')
    slug = path.sub('lessons/', '')
    candidates << "_lessons/#{slug}.markdown"
    candidates << "_lessons/#{slug}.md"
  elsif path.start_with?('courses/')
    slug = path.sub('courses/', '')
    candidates << "_courses/#{slug}.markdown"
    candidates << "_courses/#{slug}.md"
  elsif path.start_with?('dispatch-notes/')
    slug = path.sub('dispatch-notes/', '')
    candidates << "_dispatch_notes/#{slug}.markdown"
    candidates << "_dispatch_notes/#{slug}.md"
  end

  found = candidates.find { |f| File.exist?(f) }
  if found
    render_page(found)
  else
    status 404
    "Not Found: #{path}"
  end
end
