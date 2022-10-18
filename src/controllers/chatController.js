import { MongoDBChat } from "../persistencia/daos/chat/chatDao.js";
import UsersServices from "../services/usersServices.js";

export default class chatController {
  constructor() {
    this.chatDao = new MongoDBChat();
    this.servicesUser = new UsersServices();
  }

  getMessages = async(req, res) => {
    try {
      const user = await this.servicesUser.getByMail(req.session.user.email);
      res.render("chat", { user });
    } catch (error) {
      console.log(`Error al buscar los mensajes. ${error}`);
      return res.status(500).json({ error_description: "Error del servidor." });
    }
  }

  async getUserMessages(req, res) {
    try {
      const user = req.session.user;
      if (!user) return res.redirect("/login");
      const messages = await chatDao.listAll();
      res.render("chat-user", { messages });
    } catch (error) {
      console.log(`Error al buscar los mensajes del usuario. ${error}`);
      return res.status(500).json({ error_description: "Error del servidor." });
    }
  }

}
