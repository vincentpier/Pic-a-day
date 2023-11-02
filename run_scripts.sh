#!/bin/bash

TEXT_FILE="/Users/vincentgyurgyik/Desktop/z_website/debug.txt"
LOG_FILE="/Users/vincentgyurgyik/Desktop/z_website/debug.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S.%N') - $1" >> "$TEXT_FILE"
}

# Log the start of the script
log "Script started."

#test for launchd --not permanent
# Working directory
WORKING_DIR="/Users/vincentgyurgyik/Desktop/z_website"

cd "$WORKING_DIR"
#test delay for launchd --not permanent
sleep 5

# Log that we're changing the directory
log "Changed directory to z_website."

# Path to webui.sh
WEBUI_SCRIPT_PATH="/Users/vincentgyurgyik/stable-diffusion-webui"

# Path to SELENIUM_AUTOMATIC1111.py
SELENIUM_SCRIPT_PATH="/Users/vincentgyurgyik/Desktop/z_website/SELENIUM_AUTOMATIC1111.py"


# Run webui.sh
(cd /Users/vincentgyurgyik/stable-diffusion-webui && ./webui.sh) &

webui_exit_status=$?

if [ $webui_exit_status -ne 0 ]; then
    log "Web UI script error. Exit code: $webui_exit_status"
else
    log "Web UI script completed successfully."
fi

# Log stable
log "Into stable."

# Wait for the server to start (adjust this as needed)
sleep 20

# Run SELENIUM_AUTOMATIC1111.py
python3 "${SELENIUM_SCRIPT_PATH}"

log "Python script."

if [ $? -ne 0 ]; then
    log "Error occurred in Python script. Exit code: $?"
else
    log "Python script completed successfully."
fi

if [ $? -ne 0 ]; then
    log "Error occurred. Exit code: $?"
fi