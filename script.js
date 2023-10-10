document.addEventListener('DOMContentLoaded', () => {

    // Function to get the current date in the format YYYY-MM-DD
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Function to display the image for the current date
    const displayDailyImage = () => {
        const currentDate = getCurrentDate();
        const imageUrl = `images/${currentDate}.png`;
        const imageElement = document.getElementById('daily-image');
        const keywordsElement = document.getElementById('keywords');
        imageElement.src = imageUrl;
        keywordsElement.innerText = `Prompt: ${keywords} Date: ${currentDate}`;
    };

    // Call the function to display the image for the current date
    displayDailyImage();
});