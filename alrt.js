const telegramToken = "7642591605:AAHuYxCDUVq8Z0S6Bt6woRWU1fIQkI954Og";
const telegramChatId = "-4895002742";

function enviarMensajeTelegram(mensaje) {
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    axios.post(url, {
        chat_id: telegramChatId,
        text: mensaje
    })
    .then(response => {
        console.log("Mensaje enviado a Telegram");
    })
    .catch(error => {
        console.error("Error al enviar mensaje a Telegram:", error);
    });
}

function obtenerInfoDispositivo() {
    const userAgent = navigator.userAgent;
    const plataforma = navigator.platform;
    const fechaHora = new Date().toLocaleString();
    const idioma = navigator.language;
    const resolucionPantalla = `${screen.width}x${screen.height}`;

    return {
        userAgent,
        plataforma,
        fechaHora,
        idioma,
        resolucionPantalla
    };
}

function obtenerEmojiBandera(codigoPais) {
    const codePoints = [...codigoPais.toUpperCase()].map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

window.addEventListener("DOMContentLoaded", function() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const pais = data.country_name;
            const codigoPais = data.country_code;
            const bandera = obtenerEmojiBandera(codigoPais);

            const infoDispositivo = obtenerInfoDispositivo();
            const mensajeAlerta = `Alerta Cafe Andino` +
                `IP: ${ip} (${pais} ${bandera})\n` +
                `Dispositivo: ${infoDispositivo.plataforma}\n` +
                `Software: ${infoDispositivo.userAgent}\n` +
                `Idioma del navegador: ${infoDispositivo.idioma}\n` +
                `Resolución de pantalla: ${infoDispositivo.resolucionPantalla}\n` +
                `Fecha y hora: ${infoDispositivo.fechaHora}`;

            setTimeout(() => {
                enviarMensajeTelegram(mensajeAlerta);
            }, 1000);
        });
});

