document.addEventListener('DOMContentLoaded', function () {

    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed'); // Agregar la clase 'fixed' al encabezado
        } else {
            header.classList.remove('fixed'); // Quitar la clase 'fixed' del encabezado
        }
    });
}

function crearGaleria() {

    const CANTIDAD_IMAGENES = 16
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galería';

        // Event Handler
        imagen.onclick = function () {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen)
    }
}


function mostrarImagen(i) {

    const imagen = document.createElement('IMG');
    imagen.src = `img/gallery/full/${i}.jpg`; // Establecer la ruta correcta para la imagen
    imagen.alt = 'Imagen Galería';

    // Generar Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X'; // Corregir el nombre de la variable
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    // Agregar el modal al cuerpo del documento
    document.body.style.overflow = 'hidden'; // Establecer overflow: hidden en el cuerpo del documento
    document.body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('modal-fadeOut'); // Agregar la clase para el efecto de desvanecimiento
    setTimeout(() => {
        modal?.remove(); // Eliminar el modal después de que se complete el efecto de desvanecimiento
    }, 500); // Ajusta el tiempo para que coincida con la duración de la animación en milisegundos

    const body = document.querySelector('body')
    body.style.overflow = 'auto'; // Establecer overflow: auto en el cuerpo del documento   

}

function resaltarEnlace() {

    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        });

        navLinks.forEach(link => {

            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            } else {
                link.classList.remove('active'); // Asegúrate de quitar la clase 'active' de otros enlaces
            }

        });
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}