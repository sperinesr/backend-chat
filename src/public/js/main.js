console.log("funciona")

// -ir a main.js
const socket = io()

// guardamos el nombre del usuario
let user;
//guardamos el chatbox de index.handlebars
const chatbox = document.getElementById("chatbox")

// usar objeto sweetalert ... Swal
// metodo fire

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese un usuario para identificarse en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre primero!"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    console.log("Nombre " + user)
})

// usar evento keyup
chatbox.addEventListener("keyup", (event) => {
    // si la tecla es enter enviar mensaje
    if (event.key == "enter") {
        // si el mensaje esta sin espacios y tiene mas de 0 caracteres se envia al servidor
        if (chatbox.value.trim().lengh > 0) {
            // evento message con los datos
            socket.emit("message", { user: user, message: chatbox.value })
            // limpiar chatbox
            chatbox.value = ""
        }
    }
})

// -ir a app.js

// listener de mensajes
socket.on("messagesLogs", (data) => {
    let log = document.getElementById("messagesLogs")
    let mensajes = ""
    data.foreach(mensaje => {
        mensajes = mensajes + `${mensaje.user} : ${mensaje.message} </br>`;
    })
    // mostrar en web
    log.innerHTML = mensajes;
})

// -ir a app.js