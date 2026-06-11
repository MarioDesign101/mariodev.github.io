// Definimos la fecha objetivo: 27 de Septiembre de 2026 a las 00:00:00
const targetDate = new Date('September 27, 2026 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Cálculos matemáticos para días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Inyectar los valores en el HTML
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    // Si la cuenta llega a cero
    if (distance < 0) {
        clearInterval(interval);
        document.querySelector('.countdown-container').innerHTML = "<h1>¡Es el día!</h1>";
    }
}

// Ejecutar la función cada segundo
const interval = setInterval(updateCountdown, 1000);

// Ejecutar una vez al inicio para evitar el retraso de 1 segundo
updateCountdown();