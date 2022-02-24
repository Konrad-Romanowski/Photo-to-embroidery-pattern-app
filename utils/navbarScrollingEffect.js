function toggleScrolledClass(yPos) {
    let navbar = document.querySelector('.nav-bar');
    
    if(yPos > 200) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

export default function applyScrollingEffectToNavbar() {
    let yPos = window.scrollY;
    
    toggleScrolledClass(yPos);

    document.addEventListener('scroll', ()=>{
        yPos = window.scrollY;
        toggleScrolledClass(yPos);
    });
}