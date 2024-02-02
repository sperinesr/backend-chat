// CLASE 11 APLICATION CHAT CON WEBSOCKET

// 1) npm init --yes para generar el package.json de nuestro proyecto
// 2) instalamos dependencias necesarias para el chat: npm i express express-handlebars socket.io
// 3) instalar nodemon como dependencia npm i nodemon -D

// modulos
const express = require("express")
const app = express()
const PUERTO = 8080
const exhb = require("express-handlebars")
const socket = require("socket.io")

// handlebars configuracion
app.engine("handlebars", exhb.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// middleware
app.use(express.static("./src/public"))

// -vamos a views.router
const viewsRouter = require("./routes/views.router.js")

// rutas
app.use("/", viewsRouter)

// -importamos el script en main.handlebars
// -agregamos codigo en style.css


// socket.io
// referenciamos el server http para pasarla al socket
const httpServer = app.listen(PUERTO, () => {
    console.log("Escuchando...")
})

// creamos instancia de socket.io pasandole el parametro httpserver
const io = new socket.Server(httpServer)

// crear un array para guardar los mensajes que se vayan enviando en el chat
let mensajes = []

// metodo para establecer conexion se modificara despues
// io.on("connection", () => {
//     console.log("Cliente conectado")
// })

// -importamos script en index.handlebars
// -ir a index.handlebars
// -ir a main.js para configurar variables sweetalerT Y evento keyup

io.on("connection", (socket) => {
    console.log("Cliente conectado")
    socket.on("message", data => {
        // recibir data del cliente y se pushea en el array mensajes de arriba
        mensajes.push(data)
        // utilizamos el metodo emit que nos permite emitir eventos desde el servidor hacia el cliente
        io.emit("messagesLogs", mensajes)
    })
})

// -ir a main.js

// -ir apackage.json y poner debajo de script ,
//   "engines": {
//     "node": "14.x"
//   },

// subir a un repositorio github

// ir a https://glitch.com/
// conectar con github
// crear nuevo proyecto con link de github y listo