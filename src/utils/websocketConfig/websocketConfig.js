import { MongoDBChat } from '../../persistencia/daos/chat/chatDao.js'

export default (io) => {
    io.on('connection', async (socket) => {
        console.log('nuevo cliente conectado');
      
        io.sockets.emit('messages', await MongoDBChat.listAll());
      
        socket.on('message', async (data) => {
          const { text, email } = data;
          const newMessage = {
            email,
            text,
            date: moment(new Date()).format('DD/MM/YYYY HH:mm'),
          };
      
          await MongoDBChat.save(newMessage);
      
          io.sockets.emit('messages', await MongoDBChat.listAll());
        });
      });
};