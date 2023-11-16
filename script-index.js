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

    // Check if image exists (if site is loaded before script runs for day there will be no image)
    fetch(imageUrl)
        .then(response => {
            if (response.ok) {
                imageElement.src = imageUrl;
                keywordsElement.innerText = `Prompt: ${keywords} Date: ${currentDate}`;
            } else {
                imageElement.src = 'images/noImage.png'
                keywordsElement.innerText = `No image available for ${currentDate}, come back later!`

                // Add 'no-image' class so we can adjust size
                imageElement.classList.add('no-image');
            }
        })
};
if (document.getElementById('image-container')) {
    // This is index.html
    displayDailyImage();
}