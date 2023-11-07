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
};
if (document.getElementById('image-container')) {
    // This is index.html
    displayDailyImage();
}