// script.js - CÓDIGO FINAL Y CORREGIDO

// 🔑 CAMBIO CLAVE: La fecha y hora del evento: Martes 13 de Enero de 2026 a las 7:30pm
const eventDate = new Date("Jan 13, 2026 19:30:00").getTime(); 

// Elementos del DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const invitationCard = document.getElementById('invitation-card');
// Obtener el elemento de audio globalmente
const audio = document.getElementById('background-music'); 

// Función para formatear el tiempo
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// Función principal de la cuenta regresiva
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "¡LA FIESTA HA COMENZADO! 🎉";
        
    } else {
        daysEl.innerHTML = formatTime(days);
        hoursEl.innerHTML = formatTime(hours);
        minutesEl.innerHTML = formatTime(minutes);
        secondsEl.innerHTML = formatTime(seconds);
    }
}

// Iniciar la cuenta regresiva
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// --- FUNCIÓN DE DESBLOQUEO DE AUDIO (Se ejecuta con la interacción) ---
const unlockAudio = () => {
    if (audio && audio.muted) {
        // 🔑 CLAVE: Quitar el silencio y forzar la reproducción
        audio.muted = false;
        audio.volume = 0.6; 
        audio.play().catch(e => {
             // Esto es para depurar. Si falla, lo ignoramos y el usuario tendrá que activar el volumen manualmente.
             console.log("Error al intentar reproducir el audio:", e);
        });
        
        // Limpiamos los listeners para que no se ejecute múltiples veces
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchend', unlockAudio);
        document.removeEventListener('scroll', unlockAudio);
    }
};

// --- Manejo de la Carga de Contenido (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Animación de la Tarjeta
    setTimeout(() => {
        invitationCard.classList.add('visible');
    }, 500); 

    // 2. Activamos los listeners de interacción para el audio
    // Esto asegura que al hacer clic en CUALQUIER PARTE (título, contador, invitación, corazón), el audio intente reproducirse.
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchend', unlockAudio);
    document.addEventListener('scroll', unlockAudio);
});