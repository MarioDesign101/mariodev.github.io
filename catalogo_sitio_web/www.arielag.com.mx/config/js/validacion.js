document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario antes de validarlo
    
    // Validación de los campos
    const name = document.getElementById('nombre').value.trim();
    const cell = document.getElementById('telefono').value.trim();
    const email = document.getElementById('mail').value.trim();
    const subject = document.getElementById('asunto').value;
    const message = document.getElementById('mensaje').value.trim();

    // Expresión regular para validar un celular (solo números, con formato básico)
    const cellRegex = /^[0-9]{10,12}$/;

    // Expresión regular para validar el correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name || !cell || !email || !subject || !message) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (!cellRegex.test(cell)) {
        alert('Por favor ingrese un número de celular válido.');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Por favor ingrese un correo electrónico válido.');
        return;
    }

    // Si todos los campos son correctos, enviar el formulario
    sendEmail(name, cell, email, subject, message);
});

function sendEmail(name, cell, email, subject, message) {
    // Aquí puedes integrar con un servicio como EmailJS
    const formData = {
        name: name,
        cell: cell,
        email: email,
        subject: subject,
        message: message
    };

    // Este es un ejemplo de cómo podrías usar EmailJS (debes configurar tu servicio de EmailJS)

    emailjs.send("service_x886l2i","template_6s96dwc", formData)
        .then(function(response) {
            alert('Correo enviado exitosamente');
            document.getElementById('form').reset(); // Limpiar el formulario
        }, function(error) {
            alert('Hubo un error al enviar el correo, por favor intente más tarde.');
        });
}