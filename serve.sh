#!/bin/bash
# Jekyll Server Script - ensures correct Ruby environment
# Usage: ./serve.sh [port]

# Kill any existing process on the port
PORT=${1:-4000}
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Use rbenv Ruby 3.3.6 (required for this project)
export PATH="$HOME/.rbenv/versions/3.3.6/bin:$HOME/.rbenv/shims:$PATH"

echo "🚀 Starting Jekyll on port $PORT..."
echo "   Ruby: $(ruby --version)"
echo "   Navigate to: http://localhost:$PORT"
echo ""

bundle exec jekyll serve --port $PORT --livereload
