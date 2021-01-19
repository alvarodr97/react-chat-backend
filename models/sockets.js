const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require('../controllers/sockets');
const { comprobarJWT } = require('../helpers/jwt');

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            // console.log(socket.handshake.query['x-token']);

            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('Socket no identificado');

                return socket.disconnect();
            }

            await usuarioConectado(uid);

            // Unir el usuario a una sala de socket.io
            socket.join(uid);

            // TODO: validar JWT
            // si no es valido, desconectar

            // TODO: saber que usuario esta activo

            // TODO: emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());

            // TODO: Socket join, uid

            // TODO: Escuchar cuando cliente manda mensaje
            socket.on('mensaje-personal', async(payload) => {
                const mensaje = await grabarMensaje( payload );
                this.io.to( payload.para).emit('mensaje-personal', mensaje );
                this.io.to( payload.de).emit('mensaje-personal', mensaje );
            })
            // mensaje-personal

            // TODO: Disconnect
            // Marcar en BBDD que el user se desconecto

            // TODO: Emitir todos los usuario conectados
            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
                this.io.emit('lista-usuarios', await getUsuarios());
            })
            
        
        });
    }


}


module.exports = Sockets;