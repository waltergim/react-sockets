//servidor de express
const express = require('express')

//servidor sockets
const http =  require('http')


//configuracion del sockets servers
const socketio = require('socket.io');

const path = require('path')

const Sockets = require('./sockets')

const cors = require("cors")

class Server {
    constructor(){
        this.app = express();;
        this.PORT = process.env.PORT || 8080;

        //http Server
        this.server = http.createServer( this.app )

        // configuarcion sockets
         this.io = socketio(this.server,{/*configuraciones */  });
    }

        middlewares(){
            // Desplegar directorio publico
            this.app.use(express.static(path.resolve(__dirname, '../public') ))
            this.app.use(cors())
        }
        configurarSockets(){
            new Sockets(this.io)
        }
    
    execute(){
        // inicializar middlewares
        this.middlewares()
        //inicializarSOckets
        this.configurarSockets()
        // inicializar server
        this.server.listen(this.PORT || 8080, () =>{
            console.log("server corriendo en puerto:",this.PORT)
        
        });
    }


}


module.exports = Server