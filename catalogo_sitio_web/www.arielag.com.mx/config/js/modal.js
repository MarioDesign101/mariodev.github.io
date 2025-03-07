const images = [...document.querySelectorAll('.img__gallery')]; 

const modal = document.querySelector('.gallery__modal');

const closeBtn = document.querySelector('.close');

const imgModal = document.querySelector('.img-modal');

const tituloModal = document.querySelector('.titulomodal');

const left = document.querySelector('.left');

const right = document.querySelector('.right');

let index = 0; 

// Termino de declaracion de variables puestas en el DOM


// Añadiendo la clase active a la ventana modal
images.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage(i);
        modal.classList.toggle('active');
    })
})

// Modificación automatica de las imagenes

const updateImage = (i) => {
    let path = `config/img/${i+1}.jpg`;
    imgModal.src = path;
    tituloModal.innerHTML = `${i+1}`;
    index = i;
}

//  Botones de cierre y señalización izquierda y derecha

closeBtn.addEventListener('click', () => {
    modal.classList.toggle('active');
});

left.addEventListener('click', () => {
    if(index > 0) {
        updateImage(index - 1);
    }
})

right.addEventListener('click', () => {
    if(index < images.length - 1) {
        updateImage(index + 1);
    }
})