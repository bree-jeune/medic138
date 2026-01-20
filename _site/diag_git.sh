#!/bin/bash
cd /Users/zeyoung1/Downloads/medic138
echo "--- REMOTE ---"
git remote -v
echo "--- STATUS ---"
git status
echo "--- LOG ---"
git log -n 5 --oneline
echo "--- BRANCHES ---"
git branch -a
echo "--- REFS ---"
ls -R .git/refs
echo "--- PUSH TEST ---"
git push medic138 main --dry-run 2>&1
