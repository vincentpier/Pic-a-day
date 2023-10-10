const getImageInfoForDate = async () => {
    const today = new Date();
    const imageInfoArray = [];

    // Fetch image info from the last 10 days - adjust if needed
    for (let i = 1; i <= 10; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const imageUrl = `images/${dateString}.png`;
        const keywords = localStorage.getItem(dateString) || 'No keywords available'; // Get keywords for the date

        imageInfoArray.push({ imageUrl, keywords, date: dateString });
    }

    return imageInfoArray;
};

const displayGallery = async () => {
    const imageInfoArray = await getImageInfoForDate();

    const galleryContainer = document.getElementById('gallery-container');

    // Go through image info and create elements for each image
    imageInfoArray.forEach(imageInfo => {
        const { imageUrl, keywords, date } = imageInfo;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container');

        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;

        const keywordsElement = document.createElement('p');
        keywordsElement.innerText = `Keywords: ${keywords}`;

        const dateElement = document.createElement('p');
        dateElement.innerText = `Date: ${date}`;

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(keywordsElement);
        imgContainer.appendChild(dateElement);

        galleryContainer.appendChild(imgContainer);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    displayGallery();
});
