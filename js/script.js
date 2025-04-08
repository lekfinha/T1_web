document.addEventListener('DOMContentLoaded', function() {
    const actividadForm = document.getElementById('actividad-form');
    const fotoContainer = document.getElementById('foto-container');
    let fotoCount = 1;

    // Cargar datos de regiones y comunas (ejemplo)
    const regionesComunas = {
        'Metropolitana': ['Santiago', 'Providencia', 'Ñuñoa', 'Las Condes', 'Maipú'],
        'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
        // Agregar más regiones según necesidad
    };

    // ========== Configuración inicial ==========
    // Llenar select de regiones
    const regionSelect = document.getElementById('region');
    Object.keys(regionesComunas).forEach(region => {
        regionSelect.innerHTML += `<option value="${region}">${region}</option>`;
    });

    // Actualizar comunas al cambiar región
    regionSelect.addEventListener('change', function() {
        const comunaSelect = document.getElementById('comuna');
        comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
        regionesComunas[this.value].forEach(comuna => {
            comunaSelect.innerHTML += `<option value="${comuna}">${comuna}</option>`;
        });
    });

    // ========== Manejo de fotos dinámicas ==========
    document.getElementById('agregar-foto').addEventListener('click', function(e) {
        e.preventDefault();
        if (fotoCount < 5) {
            fotoCount++;
            const newInput = document.createElement('div');
            newInput.classList.add('foto-input');
            newInput.innerHTML = `
                <input type="file" name="foto${fotoCount}" accept="image/*">
                <button class="eliminar-foto">×</button>
            `;
            fotoContainer.appendChild(newInput);
            
            // Manejar eliminación de fotos
            newInput.querySelector('.eliminar-foto').addEventListener('click', function() {
                this.parentElement.remove();
                fotoCount--;
            });
        }
    });

    // ========== Validaciones del formulario ==========
    actividadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const errors = [];

        // Limpiar errores previos
        document.querySelectorAll('.error').forEach(el => el.remove());

        // ===== Validación de sección "Dónde" =====
        const region = document.getElementById('region').value;
        const comuna = document.getElementById('comuna').value;
        const sector = document.getElementById('sector').value;

        if (!region) errors.push({ field: 'region', message: 'Seleccione una región' });
        if (!comuna) errors.push({ field: 'comuna', message: 'Seleccione una comuna' });
        if (sector.length > 100) errors.push({ field: 'sector', message: 'Sector no puede exceder 100 caracteres' });

        // ===== Validación de sección "Organizador" =====
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const contactoRed = document.getElementById('contacto-red-social').value;
        const contactoInfo = document.getElementById('contacto-info').value;

        if (!nombre || nombre.length > 200) errors.push({ field: 'nombre', message: 'Nombre obligatorio (max 200 caracteres)' });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push({ field: 'email', message: 'Email inválido' });
        if (celular && !/^\+\d{3}\.\d{8}$/.test(celular)) errors.push({ field: 'celular', message: 'Formato: +NNN.NNNNNNNN' });
        if (contactoRed && !contactoInfo) errors.push({ field: 'contacto-info', message: 'Ingrese información de contacto' });
        if (contactoInfo && contactoInfo.length < 4 || contactoInfo.length > 50) {
            errors.push({ field: 'contacto-info', message: 'Info contacto debe tener entre 4-50 caracteres' });
        }

        // ===== Validación de sección "Actividad" =====
        const inicio = document.getElementById('inicio').value;
        const termino = document.getElementById('termino').value;
        const descripcion = document.getElementById('descripcion').value;
        const tema = document.getElementById('tema').value;
        const otroTema = document.getElementById('otro-tema').value;
        const fotos = document.querySelectorAll('input[type="file"]');

        if (!inicio) errors.push({ field: 'inicio', message: 'Ingrese fecha/hora de inicio' });
        if (termino && new Date(termino) <= new Date(inicio)) {
            errors.push({ field: 'termino', message: 'Término debe ser posterior al inicio' });
        }
        if (tema === 'otro' && (!otroTema || otroTema.length < 3 || otroTema.length > 15)) {
            errors.push({ field: 'otro-tema', message: 'Especifique tema (3-15 caracteres)' });
        }
        if (fotos.length === 0) errors.push({ field: 'foto-container', message: 'Debe agregar al menos 1 foto' });

        // Mostrar errores
        if (errors.length > 0) {
            errors.forEach(error => {
                const field = document.getElementById(error.field);
                const errorElement = document.createElement('div');
                errorElement.className = 'error';
                errorElement.style.color = 'red';
                errorElement.textContent = error.message;
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            });
        } else {
            // Mostrar confirmación
            const confirmar = confirm('¿Está seguro que desea agregar esta actividad?');
            if (confirmar) {
                alert('Hemos recibido su información, muchas gracias y suerte en su actividad');
                window.location.href = 'index.html';
            }
        }
    });

    // ========== Manejo de campos condicionales ==========
    // Mostrar campo "otro tema"
    document.getElementById('tema').addEventListener('change', function() {
        const otroTemaGroup = document.getElementById('otro-tema-group');
        otroTemaGroup.style.display = this.value === 'otro' ? 'block' : 'none';
    });

    // Mostrar campo de red social
    document.getElementById('contacto-red').addEventListener('change', function() {
        const contactoInfoGroup = document.getElementById('contacto-info-group');
        contactoInfoGroup.style.display = this.value ? 'block' : 'none';
    });
});