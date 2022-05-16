import server from "../app";
import { Server, Socket } from 'socket.io';

const io = new Server(server);

io.on('connction', (client: Socket) => {
    console.log('Conected ===', client);
    // client.on()
});

export default io;

