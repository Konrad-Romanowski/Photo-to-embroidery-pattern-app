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

let img = new Image();

const fileInput = document.getElementById('image-input');
const stichSizeSlider = document.getElementById('stich-size');
const patternSection = document.getElementById('pattern-section');

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
        const previewImageContainer = document.getElementById('preview-image');
        imageNameContainer.innerText = file.name;

        stichSizeSlider.value = 12;
        stichSizeValueSpan.innerText = stichSizeSlider.value;

        stichSizeSlider.addEventListener('input', e => {
            stichSizeValueSpan.innerText = e.target.value;
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

const canvas = document.getElementById('embroidery-canvas');
const ctx = canvas.getContext('2d');

document.getElementById('create-pattern-btn').addEventListener('click', e => {
    let scale = parseInt(stichSizeSlider.value);

    let patternRows = Math.floor(img.height/scale) + (img.height % scale === 0 ? 0 : 1 );
    let patternColumns = Math.floor(img.width/scale) + (img.width % scale === 0 ? 0 : 1 );

    canvas.width = patternColumns * scale;
    canvas.height = patternRows * scale;

    ctx.drawImage(img, 0, 0, patternColumns * scale, patternRows * scale);

    const imageData = ctx.getImageData(0, 0, patternColumns * scale, patternRows * scale).data;

    let imageMap = [];
    for(let i = 0; i < patternColumns; i++) {
        imageMap[i] = [];
    }

    for (let xCoord = 0; xCoord < patternColumns; xCoord++) {
        for (let yCoord = 0; yCoord < patternRows; yCoord++) {

            const redColorIndexAtXY = yCoord*scale * (patternColumns * scale * 4) + xCoord*scale * 4;
            
            imageMap[xCoord][yCoord] = {rgbData: 
                [
                    imageData[redColorIndexAtXY],
                    imageData[redColorIndexAtXY + 1],
                    imageData[redColorIndexAtXY + 2]
                ]
            }
            ctx.fillStyle = `rgb(${[...imageMap[xCoord][yCoord].rgbData]})`;
            ctx.fillRect(xCoord*scale, yCoord*scale, scale, scale);
        }
    }

    // Draw vertical lines
    for(let i = 0; i <= patternColumns; i++){
        ctx.beginPath();
        ctx.moveTo(i*scale,0);
        ctx.lineTo(i*scale, patternRows*scale);
        ctx.stroke(); 
    }

    //Draw horizontal lines
    for(let i = 0; i <= patternRows; i++){
        ctx.beginPath();
        ctx.moveTo(0,i*scale);
        ctx.lineTo(patternColumns*scale, i*scale);
        ctx.stroke(); 
    }

    patternSection.style.display = 'block';
    patternSection.scrollIntoView();
});