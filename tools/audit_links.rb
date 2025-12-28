require 'net/http'
require 'uri'
require 'set'

# Configuration
BASE_URL = "http://localhost:4567"
MAX_PAGES = 100 # Safety limit

class LinkAuditor
  def initialize
    @visited = Set.new
    @to_visit = ["/"]
    @broken_links = []
    @external_links = Set.new
  end

  def run
    puts "🚀 Starting link audit on #{BASE_URL}..."
    
    count = 0
    while !@to_visit.empty? && count < MAX_PAGES
      path = @to_visit.shift
      next if @visited.include?(path)
      
      @visited.add(path)
      count += 1
      
      audit_page(path)
    end

    report
  end

  private

  def audit_page(path)
    print "  Checking: #{path}... "
    uri = URI.join(BASE_URL, path)
    
    begin
      response = Net::HTTP.get_response(uri)
      
      if response.code == "200"
        puts "✅"
        extract_links(response.body, path) if response['Content-Type']&.include?('text/html')
      else
        puts "❌ (#{response.code})"
        @broken_links << { source: "Internal Link", path: path, code: response.code }
      end
    rescue => e
      puts "⚠️ Error: #{e.message}"
      @broken_links << { source: "Internal Link", path: path, error: e.message }
    end
  end

  def extract_links(html, source_path)
    # Simple regex to find hrefs
    html.scan(/href=["']([^"']+)["']/).flatten.each do |link|
      clean_link = link.split('#').first # Ignore anchors
      next if clean_link.nil? || clean_link.empty? || clean_link == "/"
      
      if clean_link.start_with?('http')
        @external_links.add(clean_link) unless clean_link.start_with?(BASE_URL)
      elsif clean_link.start_with?('/')
        @to_visit << clean_link unless @visited.include?(clean_link)
      elsif !clean_link.start_with?('mailto:', 'tel:', 'javascript:')
        # Relative link logic (basic)
        parent = source_path.end_with?('/') ? source_path : File.dirname(source_path)
        full_path = File.expand_path(clean_link, parent)
        @to_visit << full_path unless @visited.include?(full_path)
      end
    end

    # Also check images
    html.scan(/src=["']([^"']+)["']/).flatten.each do |src|
      next if src.start_with?('data:') || src.start_with?('http')
      
      uri = URI.join(BASE_URL, src)
      begin
        res = Net::HTTP.get_response(uri)
        if res.code != "200"
          @broken_links << { source: "Broken Image", path: src, found_on: source_path, code: res.code }
        end
      rescue
        @broken_links << { source: "Broken Image", path: src, found_on: source_path, error: "Connection Failed" }
      end
    end
  end

  def report
    puts "\n" + "="*40
    puts "📊 Audit Complete"
    puts "="*40
    puts "Pages Visited: #{@visited.size}"
    puts "External Links Found: #{@external_links.size}"
    
    if @broken_links.empty?
      puts "\n✨ SUCCESS: No broken links found!"
    else
      puts "\n🚩 FOUND #{@broken_links.size} ISSUES:"
      @broken_links.each do |issue|
        if issue[:source] == "Broken Image"
          puts "  [#{issue[:source]}] #{issue[:path]} (on #{issue[:found_on]}) -> #{issue[:code] || issue[:error]}"
        else
          puts "  [#{issue[:source]}] #{issue[:path]} -> #{issue[:code] || issue[:error]}"
        end
      end
    end
    puts "="*40
  end
end

LinkAuditor.new.run
