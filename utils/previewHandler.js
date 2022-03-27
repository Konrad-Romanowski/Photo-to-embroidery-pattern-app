export default function handlePreview(img) {

    const fileInput = document.getElementById('image-input');
    const errorMessageSection = document.getElementById('error-message');
    const previevSection = document.getElementById('previev-section');
    const imageNameContainer = document.getElementById('image-name');
    const imageResolutionContainer = document.getElementById('image-resolution');
    const stitchSizeValueSpan = document.getElementById('stitch-size-value');
    const stitchSizeSlider = document.getElementById('stitch-size');
    const previewImageContainer = document.getElementById('preview-image');
    const patternSection = document.getElementById('pattern-section');
    
    fileInput.addEventListener('change', e => {
        const file = fileInput.files[0];
        const imageType = /image.*/;
        

        if (file.type.match(imageType)) {
            const reader = new FileReader();

            imageNameContainer.innerText = file.name;

            stitchSizeSlider.value = 12;
            stitchSizeValueSpan.innerText = stitchSizeSlider.value;

            stitchSizeSlider.addEventListener('input', e => {
                stitchSizeValueSpan.innerText = e.target.value;
            });

            reader.onload = e => {
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
            // Case when slected file is not supported

            previevSection.style.display = 'none';
            patternSection.style.display = 'none';
            errorMessageSection.style.display = 'block';
            errorMessageSection.scrollIntoView();
        }
    });
}