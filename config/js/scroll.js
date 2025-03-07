document.addEventListener('scroll', () => {
    const header = document.querySelector('.header__general');
    if(window.scrollY > 400) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
})