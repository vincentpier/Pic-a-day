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
import subprocess


subprocess.Popen(["/Users/vincentgyurgyik/stable-diffusion-webui/webui.sh"])

time.sleep(10)

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
print(keywords)

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
#time.sleep(30)

#or can use input
input("Press Enter to close the browser...") 

# ... Perform other interactions as needed ...

# Close the browser
driver.quit()
