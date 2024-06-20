#!/bin/sh

# Exit on error
set -e

# Log each command (for debugging)
set -x

# cleanup
rm -rf node_modules/
rm -rf .next/

# Install dependencies
npm install

# Start development server in the background
npm run dev &

# Keep the script running (optional)
# This is useful if you want the script to exit after the dev server stops
# (due to errors or manual termination). Remove the line if not needed.
trap "echo '** Development server stopped. **'; exit" INT TERM

echo "** Development server started. Press CTRL+C to stop. **"

# Wait for any background processes to finish before exiting
wait
