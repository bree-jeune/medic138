---
description: How to run the Jekyll development server for Medic 138
---
# Run Jekyll Development Server

// turbo-all

1. Navigate to the project directory:
```bash
cd /Users/zeyoung1/Downloads/medic138
```

2. Run the serve script (handles Ruby environment and port conflicts automatically):
```bash
./serve.sh
```

**Or to use a different port:**
```bash
./serve.sh 4001
```

3. Open in browser: http://localhost:4000 (or your chosen port)

## Troubleshooting

If you get "Address already in use" error:
```bash
lsof -ti:4000 | xargs kill -9
./serve.sh
```

If gems are missing, run:
```bash
export PATH="$HOME/.rbenv/versions/3.3.6/bin:$HOME/.rbenv/shims:$PATH"
bundle install
```
