






class Sockets{
    constructor(io){
        this.io = io
        this.socketsEvents()
    }

    socketsEvents(){
            //el servidor manda informacion al cliente
           this.io.on('connection', ( socket) => {


        //el servidor resive informacion del cliente 
        socket.on("mensaje-to-server",(data)=>{
            console.log(data)
            this.io.emit('mensaje-from-serve',data)
        })
        
        });
    }
}


module.exports = Sockets