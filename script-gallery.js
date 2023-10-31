const getImageInfoForDate = async () => {
    const today = new Date();
    const imageInfoArray = [];
    const NUM_OF_DAYS_TO_GO_BACK = 40;

    // Fetch image info from the last 10 days - adjust if needed with NUM_OF_DAYS_TO_GO_BACK 
    for (let i = 1; i <= NUM_OF_DAYS_TO_GO_BACK; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const imageUrl = `images/${dateString}.png`;
        const keywords = localStorage.getItem(dateString) || 'No keywords available'; // Get keywords for the date
        //Check if image exists, only push if it does (If NUM_OF_DAYS_TO_GO_BACK is greater than images in folder)
        const imageExists = await checkImageExists(imageUrl);
        if (imageExists) {
            const keywords = localStorage.getItem(dateString) || 'No keywords available';
            imageInfoArray.push({ imageUrl, keywords, date: dateString });
        }
    }

    return imageInfoArray;
};

const checkImageExists = async (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
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
        keywordsElement.innerText = `Prompt: ${keywords}`;

        const dateElement = document.createElement('p');
        dateElement.innerText = `Date: ${date}`;

        imgElement.addEventListener('click', () => {
            displayLightbox(imageUrl);
        });

        imgContainer.appendChild(imgElement);
        imgContainer.appendChild(keywordsElement);
        imgContainer.appendChild(dateElement);

        galleryContainer.appendChild(imgContainer);
    });
};

//Full-size view on click
const displayLightbox = (imageUrl) => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = imageUrl;
    lightbox.style.display = 'flex';
};

// Close the lightbox
const closeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
};


document.addEventListener('DOMContentLoaded', () => {
    displayGallery();
});
