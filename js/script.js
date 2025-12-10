import { beneficiosProductos } from './data.js';

/* Función para mostrar notificaciones tipo toast */
function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = message;
    container.appendChild(toast);
    // eliminar después de duration
    setTimeout(() => {
        toast.style.animation = 'toast-out 300ms forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

document.addEventListener('DOMContentLoaded', function() {
    const btnPrincipal = document.querySelector('.btn-principal');
    const formulario = document.getElementById('formulario');
    const menuLinks = document.querySelectorAll('.menu a');

    btnPrincipal.addEventListener('click', function() {
        window.location.href = 'productos';
    });

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('Gracias por tu mensaje. Nos pondremos en contacto pronto.', 'success');
        formulario.reset();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* --- Lógica del modal de beneficios (para los botones en la página principal) --- */
    const btnBeneficios = document.querySelectorAll('.btn-beneficios');
    const modal = document.getElementById('modal-beneficios');
    const cerrarModal = document.querySelector('.cerrar');

    btnBeneficios.forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            const beneficios = beneficiosProductos[producto] || [{ titulo: 'Información', descripcion: 'No hay beneficios disponibles.' }];

            document.getElementById('modal-titulo').textContent = producto;
            const contenidoModal = document.getElementById('modal-beneficios-contenido');
            contenidoModal.innerHTML = '';

            beneficios.forEach(beneficio => {
                const div = document.createElement('div');
                div.className = 'beneficio-item';
                div.innerHTML = `<strong>${beneficio.titulo}</strong><p>${beneficio.descripcion}</p>`;
                contenidoModal.appendChild(div);
            });

            modal.classList.add('activo');
        });
    });

    if (cerrarModal) {
        cerrarModal.addEventListener('click', function() {
            modal.classList.remove('activo');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('activo');
            }
        });
    }
});
