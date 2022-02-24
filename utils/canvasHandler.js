export default function handleCanvas(img) {

    const canvas = document.getElementById('embroidery-canvas');
    const ctx = canvas.getContext('2d');
    
    const stichSizeSlider = document.getElementById('stich-size');
    const patternSection = document.getElementById('pattern-section');

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

}