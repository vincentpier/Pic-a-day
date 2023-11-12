#!/bin/bash

# Working directory
WORKING_DIR="/Users/vincentgyurgyik/Desktop/z_website"

cd "$WORKING_DIR"
sleep 5

# Path to webui.sh
WEBUI_SCRIPT_PATH="/Users/vincentgyurgyik/stable-diffusion-webui"

# Path to SELENIUM_AUTOMATIC1111.py
SELENIUM_SCRIPT_PATH="/Users/vincentgyurgyik/Desktop/z_website/SELENIUM_AUTOMATIC1111.py"

# Run webui.sh
(cd /Users/vincentgyurgyik/stable-diffusion-webui && ./webui.sh) &

# Wait for the server to start (adjust this as needed)
sleep 20

# Run SELENIUM_AUTOMATIC1111.py
python3 "${SELENIUM_SCRIPT_PATH}"