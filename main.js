import handleNavbar from './utils/navbarHandler.js';
import handlePreview from './utils/previewHandler.js';
import handleCanvas from './utils/canvasHandler.js';
import handleDownload from './utils/downladHandler.js';

let img = new Image();

handleNavbar();
handlePreview(img);
handleCanvas(img);
handleDownload();