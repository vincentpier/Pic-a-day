const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const displayDailyImage = () => {
    const currentDate = getCurrentDate();
    const imageUrl = `images/${currentDate}.png`;
    const imageElement = document.getElementById('daily-image');
    const keywordsElement = document.getElementById('keywords');
    imageElement.src = imageUrl;
    keywordsElement.innerText = `Prompt: ${keywords} Date: ${currentDate}`;

      // Add current date/prompt to csv
const data = `"${keywords}",${currentDate},"${imageUrl}"\n`;

fs.appendFile('/Users/vincentgyurgyik/Desktop/z_website/pastprompts.csv', data, (err) => {
    if (err) {
        console.error('Error appending to CSV:', err);
    }
});

    // Retrieve the current number of stored items
    const storedItemsCount = localStorage.length;


    const maxKeyValuePairs = 20; // Maximum number of key-value pairs to store - make sure to edit this number with fetch image loop in gallery


    // If max number of kvp is reached, remove the oldest one
    if (storedItemsCount >= maxKeyValuePairs) {
        const oldestKey = localStorage.key(0);
        localStorage.removeItem(oldestKey);
    }

    // Store keywords for the current date in localStorage - key value pairs
    localStorage.setItem(currentDate, keywords);
};
if (document.getElementById('image-container')) {
    // This is index.html
    displayDailyImage();
}