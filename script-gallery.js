const displayGallery = async () => {
    //Get text off the "pastprompts.csv" file
    const response = await fetch('pastprompts.csv');
    const csvData = await response.text();

    const lines = csvData.split('\n').reverse(); //Newest to oldest

    const galleryContainer = document.getElementById('gallery-container');

    for (const line of lines) {
        const parts = line.split(',');
        if (parts.length >= 4) {
            const keywords = parts.slice(0, -1).join(', '); //First three items as keywords
            const date = parts[parts.length - 1];        //Last item date
            const imageUrl = `images/${date}.png`;

            const imageExists = await checkImageExists(imageUrl);
            if (imageExists) {
                const imgContainer = document.createElement('div');
                imgContainer.classList.add('image-container');

                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;

                const keywordsElement = document.createElement('p');
                keywordsElement.innerText = `Keywords: ${keywords}`;

                const dateElement = document.createElement('p');
                dateElement.innerText = `Date: ${date}`;

                imgElement.addEventListener('click', () => {
                    displayLightbox(imageUrl);
                });

                imgContainer.appendChild(imgElement);
                imgContainer.appendChild(keywordsElement);
                imgContainer.appendChild(dateElement);

                galleryContainer.appendChild(imgContainer);
            }
        }
    }
};

const checkImageExists = async (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
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
