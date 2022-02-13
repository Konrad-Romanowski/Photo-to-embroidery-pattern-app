let navbar = document.querySelector('.nav-bar');
let yPos = 0;

document.addEventListener('scroll', ()=>{
    yPos = window.scrollY;
    if(yPos > 200) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const fileInput = document.getElementById('image-input');

fileInput.addEventListener('change', e => {
    const file = fileInput.files[0];
    const imageType = /image.*/;
    
    const previevSection = document.getElementById('previev-section');
    const errorMessageSection = document.getElementById('error-message');

    if (file.type.match(imageType)) {
        const reader = new FileReader();

        const imageNameContainer = document.getElementById('image-name');
        const imageResolutionContainer = document.getElementById('image-resolution');
        const stichSizeValueSpan = document.getElementById('stich-size-value');
        const stichSizeSlider = document.getElementById('stich-size')
        const previewImageContainer = document.getElementById('preview-image');
        imageNameContainer.innerText = file.name;

        stichSizeSlider.value = 12;
        stichSizeValueSpan.innerText = stichSizeSlider.value;

        stichSizeSlider.addEventListener('input', e => {
            stichSizeValueSpan.innerText = e.target.value;
        });

        reader.onload = e => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () =>{
                previewImageContainer.src = img.src;
                imageResolutionContainer.innerText = `${img.width} x ${img.height}`;
            }
        }

        reader.readAsDataURL(file);
        errorMessageSection.style.display = 'none';
        previevSection.style.display = 'block';
        previevSection.scrollIntoView();
    } else {
        // Case when file not supported!

        previevSection.style.display = 'none';
        errorMessageSection.style.display = 'block';
        errorMessageSection.scrollIntoView();
    }
});
