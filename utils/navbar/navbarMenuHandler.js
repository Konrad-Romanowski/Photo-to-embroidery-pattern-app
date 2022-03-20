const navbarIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.nav-bar');

function toggleActiveClass() {
    navbarIcon.classList.toggle('active');
    navbar.classList.toggle('active');
}

export default function handleNavbarMenu() {
    navbarIcon.addEventListener('click', toggleActiveClass);

    const menuAnchorItems = Array.from(document.querySelectorAll('.nav-item'), item => item.firstChild);

    for(let item of menuAnchorItems) {
        item.addEventListener('click',() => {
            navbar.classList.contains('active') ? toggleActiveClass() : null;
        });
    }
}