let navbar = document.querySelector('.nav-bar');
let yPos = 0;

document.addEventListener('scroll', ()=>{
    yPos = window.scrollY;
    if(yPos > 200) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
})
