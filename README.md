# Pic-a-day

## Description

### This repository allows the user to run a script that will open stable diffusion on a local server, get the top (n) trending words from google trends for the day, parse them into keywords, put them into the stable diffusion textbox and generate an image using the keywords as the prompt. It will then close the local server, and append the keywords to a csv file. Along with this is a rudimentary website that will show the daily image along with the date and prompts, and a gallery accessible via hyperlink that will host all prior entries. Images are saved locally in the images folder. I set the repository up this way so that everything could be run automatically once a day using a launchd, a script management system for Mac.

## Motivation

### The project aims to streamline the generation and display of daily images based on current trending topics, providing a visual representation of daily internet trends.

## Technical Details

### The main script is written in Python and utilizes Selenium for web interactions, PyTrends for accessing Google Trends, and Stable Diffusion for image generation. Additionally, there is a Bash script responsible for coordinating the execution of various components, including launching a local server with Stable Diffusion and running the Python script. This allows the user to run everything automatically, through launchd on Mac. While untested, users can attempt to adapt the setup for Task Scheduler on Windows or cron on Linux or Mac.

### Tested on 2020 iMac 
	- Processor: 3.8 GHz 8-Core Intel Core i7 
	- Graphics: AMD Radeon Pro 5500 XT 8 GB
	- Memory: 64 GB 2667 MHz DDR4
	- Operating system: macOS Sonoma 14.0

## Installation

### 1. Install an IDE so you can view/edit the website, script, and code. For this project I am using Visual Studio Code.
	- https://code.visualstudio.com/download
	
### 2. Python and Pip: 
	- Make sure you have Python installed. You can download it from (https://www.python.org/downloads/).
	- Ensure that pip, the Python package installer, is also installed.
	If you're using Python 3, pip should come pre-installed.
	
### 3. Clone the repository: 
	- git clone https://github.com/vincentpier/Pic-a-day.git
	- Change into project directory: 
	cd /path/to/z_website
	(for this project I have kept the directory on the Desktop)

### 4. Install Dependencies:

#### Pytrends - allows us to download reports from Google Trends https://pypi.org/project/pytrends/
	- pip install pytrends 

#### Selenium - allows us to automate web browser interactions. For this project I used Selenium to locate a text box, input keywords, and triggers actions on the web page. https://www.selenium.dev/    https://pypi.org/project/selenium/
	- pip install selenium

#### WebDriver - facilitates automated control of web browsers in Selenium projects, acting as the intermediary for executing actions like clicking buttons, filling forms, and navigating web pages. In this project, ChromeDriver is used as the WebDriver for Google Chrome. https://www.selenium.dev/documentation/webdriver/      https://chromedriver.chromium.org/getting-started

	- Download the appropriate WebDriver for Selenium. For this project, I used and tested the latest for Intel Mac (chromedriver-mac-x64) - ChromeDriver.

### 5. Install stable diffusion:
	- https://github.com/AUTOMATIC1111/stable-diffusion-webui
	- https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Installation-on-Apple-Silicon
	- change directories to stable-diffusion-webui
	- run the script: ./webui.sh
  
  #### Change these settings to allow pictures to go into your z_website directory and script to read the files
	- go to settings 
	- under Saving images/grids: change Images filename pattern to [date]
		(saves files in ISO format)
	- under Saving to a directory: Apply Save images to a subdirectory and add path to images in Directory name pattern
		(/path/to/z_website/images
	- Click apply settings
	

### 6. Run the project: 
	- change directories to z_website
	- run the script: ./run_scripts

### 7. View/Edit files
	- You can view the website, files, and scripts by opening z_website with Visual Code Studio. 
	- using the open liver server extension, (https://www.geeksforgeeks.org/how-to-enable-live-server-on-visual-studio-code/)
	you can right click on index.html + Open with Live Server.
	- The gallery will be filled with prior images from when I ran the script. You can keep them, or delete the files in images 	and delete the text in pastprompts.csv to start fresh.

## Usage
### 1. Run script manually
	- change directories to z_website
	- ./run_scripts

### 2. Run with launchd [Useful guide: launchd.info](https://launchd.info/)
	- create a XML file in Visual Studio Code
	- use file name as the Label, the full path to ‘run_scripts.sh’ as the ProgramArguments, and include specific paths in EnvironmentVariables. (You can get these by changing directories to ‘stable-diffusion-webui’ and type the command: ‘echo $PATH’).
	- Set your script to start at a specific time by using StartCalendarInterval
	- save the file as a plist, and move plist to ~/Library/LaunchAgents/ (user-specific) or /Library/LaunchDaemons/ (system-wide/any user)
 #### launchd commands
	- in Terminal you can:
		 	- load the script by typing launchctl load ~/Library/LaunchAgents/nameofyourscript.plist
			- unload the script by typing launchctl unload ~/Library/LaunchAgents/nameofyourscript.plist
			- start the script regardless of Start Variables (for testing) launchctl start nameofyourscript
			- stop the script after you’ve started it launchctl stop nameofyourscript
				
		
## Credits

This project wouldn't be possible without the following components and libraries:

- [Stable Diffusion Web](https://github.com/AUTOMATIC1111/stable-diffusion-webui): Used for generating images based on prompts.
- [PyTrends](https://pypi.org/project/pytrends/): Used for accessing Google Trends and downloading reports.

A special thanks to the authors and contributors of these projects for their valuable contributions to the open-source community.


