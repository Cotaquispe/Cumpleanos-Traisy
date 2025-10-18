// script.js - CÓDIGO FINAL Y CORREGIDO

// -----------------------------------------------------------
// --- CONFIGURACIÓN DE FECHA Y ENLACES (Hora: 8:30 PM) ---
// -----------------------------------------------------------

// CLAVE: Hora del evento corregida a 8:30 PM (20:30:00). 
const EVENT_DATE = new Date("Jan 13, 2026 20:30:00"); 
const eventDate = EVENT_DATE.getTime(); 

// Información para los enlaces
const EVENT_NAME = "Quinceaños de Traisy";
const EVENT_LOCATION = "Av. Próceres de la Independencia 3166, San Juan de Lurigancho, Perú";
// Formato de fecha para Google Calendar: YYYYMMDDTHHMMSS
const EVENT_DATE_CALENDAR_FORMAT = "20260113T203000"; 
// Número de WhatsApp (***¡REEMPLAZA ESTE NÚMERO!***)
const WHATSAPP_NUMBER = "+51925718931"; 
const RSVP_MESSAGE = encodeURIComponent("¡Hola! Confirmo mi asistencia a los XV Años de Traisy.");

// -----------------------------------------------------------
// --- ELEMENTOS DEL DOM ---
// -----------------------------------------------------------
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const invitationCard = document.getElementById('invitation-card');
const audio = document.getElementById('background-music'); 

// Elementos de los botones de acción
const whatsappBtn = document.getElementById('whatsapp-btn');
const mapsBtn = document.getElementById('maps-btn');
const calendarBtn = document.getElementById('calendar-btn');


// -----------------------------------------------------------
// --- FUNCIONES PRINCIPALES ---
// -----------------------------------------------------------

// Función para formatear el tiempo
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// Función principal de la cuenta regresiva
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

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


// --- FUNCIÓN DE DESBLOQUEO DE AUDIO (SOLUCIÓN MÓVIL) ---
const unlockAudio = () => {
    // Si el elemento de audio existe y está en pausa (o silenciado al inicio)
    if (audio && audio.paused || audio.muted) {
        audio.muted = false; // 1. Desilenciar
        audio.volume = 0.6; 
        
        // 2. Intentamos reproducir
        audio.play().then(() => {
            console.log("Audio desbloqueado y reproduciéndose.");
            // 3. Si es exitoso, removemos solo los listeners que usamos
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchend', unlockAudio);
        }).catch(e => {
            // 4. Si falla, el navegador lo intentará de nuevo con la próxima interacción.
            console.log("El navegador sigue bloqueando la reproducción.", e);
        });
    }
};


// --- FUNCIÓN PARA CONFIGURAR LOS ENLACES DE ACCIÓN ---
function setupActionLinks() {
    // 1. WhatsApp (Asistencia)
    whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${RSVP_MESSAGE}`;
    
    // 2. Google Maps (Ubicación)
    // Corregido el formato de URL para Google Maps
    mapsBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_LOCATION)}`;
    
    // 3. Google Calendar (Agendar)
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_NAME)}&dates=${EVENT_DATE_CALENDAR_FORMAT}/${EVENT_DATE_CALENDAR_FORMAT}&details=Mis XV Años de Traisy - ¡Te esperamos!&location=${encodeURIComponent(EVENT_LOCATION)}`;
    
    calendarBtn.href = googleCalendarUrl;
}


// -----------------------------------------------------------
// --- EVENT LISTENERS Y SETUP INICIAL ---
// -----------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configurar los enlaces de WhatsApp, Mapa y Calendario
    setupActionLinks();
    
    // 2. Animación de la Tarjeta
    setTimeout(() => {
        invitationCard.classList.add('visible');
    }, 500); 

    // 3. Activación de Audio (Optimizado para Web y Móvil)
    // Nos enfocamos solo en las interacciones directas (click y toque)
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchend', unlockAudio); 
    // ✨ Eliminamos el 'scroll' para no depender de él.
});
