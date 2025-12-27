require 'yaml'
require 'fileutils'

def process_files(dir)
  Dir.glob("#{dir}/*.{md,markdown}").each do |path|
    content = File.read(path)
    
    # Simple frontmatter parser
    if content =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
      front_matter_raw = $1
      remaining_content = $'
      
      front_matter = YAML.unsafe_load(front_matter_raw) || {}
      
      # Extract metadata from body if not in FM
      level = remaining_content.match(/\*\*Level:\*\* (.*?)  ?/)&.[](1)
      topic = remaining_content.match(/\*\*Topic:\*\* (.*?)  ?/)&.[](1)
      duration = remaining_content.match(/\*\*Duration:\*\* (.*?)  ?/)&.[](1)
      summary = remaining_content.match(/\*\*Summary:\*\* (.*?)  ?/)&.[](1)
      
      # Clean up trailing spaces or newlines
      level&.strip!
      topic&.strip!
      duration&.strip!
      summary&.strip!

      # Update front matter
      front_matter['level'] ||= level if level
      front_matter['topic'] ||= topic if topic
      front_matter['duration'] ||= duration if duration
      front_matter['summary'] ||= summary if summary
      
      # Special case: use the first sentence as summary if missing
      if !front_matter['summary']
        first_p = remaining_content.strip.split("\n\n").first
        if first_p && !first_p.start_with?('#') && !first_p.start_with?('*')
             front_matter['summary'] = first_p.gsub(/[\r\n]+/, ' ').slice(0, 140) + "..."
        end
      end

      # Write back
      new_content = "---\n#{YAML.dump(front_matter).sub(/^---\s*\n/, '')}---\n#{remaining_content}"
      File.write(path, new_content)
      puts "Updated #{path}"
    else
      puts "Skipping #{path} (no FM)"
    end
  end
end

puts "Processing _lessons..."
process_files('_lessons')
puts "Processing _courses..."
process_files('_courses')
