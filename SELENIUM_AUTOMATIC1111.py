from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
#timer to close page\/
import time
#get trending from google\/
from pytrends.request import TrendReq
#parse trendquestresults for keywords\/
from urllib.parse import urlparse, parse_qs
#run terminal and open stablediffusion\/
import os

url = 'http://127.0.0.1:7860/'

# Create the WebDriver instance
driver = webdriver.Chrome()

# Open the website
driver.get(url)

pytrends = TrendReq()

trendingtoday = pytrends.today_searches(pn='US')
trendingtoday.head(3)

urls = trendingtoday[:3].tolist()

keywords = ', '.join([parse_qs(urlparse(url).query)['q'][0] for url in urls])

# Generate the HTML content with the current keywords
html_content = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Daily Image Viewer</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div id="image-container">
        <img id="daily-image" src="" alt="Daily Image">
        <p id="keywords">{keywords}</p> <!-- Update with the current keywords -->
    </div>
    <a href="gallery.html">View Gallery</a>

    <script>
        const keywords = "{keywords}";  // This will be replaced by Python
    </script>
    <script src="script-index.js"></script>
</body>
</html>
"""

# Write the HTML content to the index.html file
with open('index.html', 'w') as index_file:
    index_file.write(html_content)

print("index.html updated with the current keywords.")




textarea = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR,
     'textarea[data-testid="textbox"]'))
)


# Send keys to the textarea
textarea.send_keys(keywords)  # Replace with the text you want to enter

# Find and click the "Generate" button
generate_button = driver.find_element("id", 'txt2img_generate')
generate_button.click()

#closes browser after () seconds
time.sleep(45)

#or can use input
#input("Press Enter to close the browser...") 

# ... Perform other interactions as needed ...


def kill_server_on_port(port):
    # Find the PID associated with the server on the specified port
    pid_command = f'lsof -i :{port} | grep LISTEN | awk \'{{print $2}}\''
    pid = os.popen(pid_command).read().strip()
    
    if pid:
        # Kill the server using the PID
        os.system(f'kill {pid}')
        print(f'Server on port {port} (PID: {pid}) has been terminated.')
    else:
        print(f'No server found running on port {port}.')

# Call the function to kill the server on port 7860
kill_server_on_port(7860)


# Close the browser
driver.quit()
