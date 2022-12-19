//servidor de express
const express = require('express')

//servidor sockets
const http =  require('http')


//configuracion del sockets servers
const socketio = require('socket.io');

const path = require('path')

const Sockets = require('./sockets')

class Server {
    constructor(){
        this.app = express();;
        this.port = process.env.PORT;

        //http Server
        this.server = http.createServer( this.app )

        // configuarcion sockets
         this.io = socketio(this.server,{/*configuraciones */  });
    }

        middlewares(){
            // Desplegar directorio publico
            this.app.use(express.static(path.resolve(__dirname, '../public') ))
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
        this.server.listen(this.port, () =>{
            console.log("server corriendo en puerto:",this.port)
        
        });
    }


}


module.exports = Server