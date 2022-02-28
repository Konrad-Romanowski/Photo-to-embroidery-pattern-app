function downloadCanvasAsImage(){
    const canvas = document.getElementById('embroidery-canvas');
    let canvasImage = canvas.toDataURL('image/png');
    
    let a = document.createElement('a');
    a.download = `embroidery_pattern.png`;
    a.href = canvasImage;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
}

export default function handleDownload() {
    const downloadPatternBtn = document.getElementById('download-pattern-btn');
    
    downloadPatternBtn.addEventListener('click', downloadCanvasAsImage)
}
