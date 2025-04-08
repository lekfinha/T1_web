document.addEventListener('DOMContentLoaded', function() {
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Validación de campos
        let errors = [];
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            errors.push("Todos los campos deben ser completados.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            // Mostrar modal de confirmación
            showModal("¡Formulario enviado correctamente!");
        }
    });

    // Formulario de dispositivo
    const deviceForm = document.getElementById('device-form');
    deviceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let errors = [];
        const deviceName = document.getElementById('device-name').value;
        const deviceBrand = document.getElementById('device-brand').value;
        const deviceType = document.getElementById('device-type').value;
        const deviceOS = document.getElementById('device-os').value;
        const devicePrice = document.getElementById('device-price').value;
        const deviceImage = document.getElementById('device-image').value;

        if (!deviceName || !deviceBrand || !deviceType || !deviceOS || !devicePrice || !deviceImage) {
            errors.push("Todos los campos deben ser completados.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            showModal("¡Formulario de dispositivo enviado correctamente!");
        }
    });

    // Formulario de comentarios
    const commentsForm = document.getElementById('comments-form');
    commentsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let errors = [];
        const commenterName = document.getElementById('commenter-name').value;
        const commentText = document.getElementById('comment-text').value;

        if (!commenterName || !commentText) {
            errors.push("Todos los campos deben ser completados.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            showModal("¡Comentario enviado correctamente!");
        }
    });

    // Función para mostrar modal de confirmación
    function showModal(message) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = '#fff';
        modal.style.padding = '20px';
        modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        modal.innerHTML = `<p>${message}</p><button onclick="this.parentElement.remove()">Cerrar</button>`;
        document.body.appendChild(modal);
    }
});
