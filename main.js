import applyScrollingEffectToNavbar from './utils/navbarScrollingEffect.js';
import handlePreview from './utils/previewHandler.js';
import handleCanvas from './utils/canvasHandler.js';
import handleDownload from './utils/downladHandler.js';

let img = new Image();

applyScrollingEffectToNavbar();
handlePreview(img);
handleCanvas(img);
handleDownload();