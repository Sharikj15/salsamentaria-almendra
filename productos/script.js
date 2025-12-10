import { beneficiosProductos } from '../js/data.js';

document.addEventListener('DOMContentLoaded', function() {
    const btnFiltros = document.querySelectorAll('.btn-filtro');
    const productosCards = document.querySelectorAll('.producto-card');
    const btnBeneficios = document.querySelectorAll('.btn-beneficios');
    const modal = document.getElementById('modal-beneficios');
    const cerrarModal = document.querySelector('.cerrar');

    btnFiltros.forEach(btn => {
        btn.addEventListener('click', function() {
            const filtro = this.getAttribute('data-filtro');

            btnFiltros.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');

            productosCards.forEach(card => {
                if (filtro === 'todos') {
                    card.classList.remove('oculto');
                } else {
                    const categoria = card.getAttribute('data-categoria');
                    if (categoria === filtro) {
                        card.classList.remove('oculto');
                    } else {
                        card.classList.add('oculto');
                    }
                }
            });
        });
    });

    btnBeneficios.forEach(btn => {
        btn.addEventListener('click', function() {
            const producto = this.getAttribute('data-producto');
            const beneficios = beneficiosProductos[producto];
            
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

    cerrarModal.addEventListener('click', function() {
        modal.classList.remove('activo');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('activo');
        }
    });
});