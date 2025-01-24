const videoWrapper = document.querySelector('.video-container');
const playButton = document.querySelector('.play-button');
playButton.addEventListener('click', () => {
    videoWrapper.classList.add('active');
});