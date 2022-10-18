import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import morgan from "morgan";
import indexRouter from "./routes/indexRoutes.js";
import os from "os";
import cluster from "cluster";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import { MongoDBChat } from "./persistencia/daos/chat/chatDao.js"
// import websocketConfig from "./utils/websocketConfig/websocketConfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

/** Variables de configuracion: */

const PORT = process.env.PORT || 8080;
const MODO = process.env.MODO || "fork";
const nroCPUs = os.cpus().length;

/** corremos el modo cluster si estamos en ese modo: */

if (cluster.isPrimary && MODO === "cluster") {
  console.log(
    `🧮 Primary PID ${process.pid} is running. On port ${PORT}. 🧑‍💻 MODO: ${MODO}.`
  );
  for (let i = 0; i < nroCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  /** Middlewares */
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.DB_MONGO,
        ttl: 60 * 10, // 10 minutes de tiempo de sesion
      }),
    })
  );

  /** Views */
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");

  app.use(express.static("public"));

  /** Routes */
  app.use("/api", indexRouter);
  app.get("/", (req, res) => {
    res.redirect("/api");
  });

  /** websockets */
  // websocketConfig(io);

  const chatDao = new MongoDBChat();

  io.on("connection", async (socket) => {
    console.log("nuevo cliente conectado");

    io.sockets.emit("messages", await chatDao.getAll());

    socket.on("message", async (data) => {
      const { text, email } = data;
      const newMessage = {
        email,
        text,
        date: moment(new Date()).format("DD/MM/YYYY HH:mm"),
      };

      await MongoDBChat.save(newMessage);

      io.sockets.emit("messages", await chatDao.getAll());
    });
  });

  /** Server */
  const server = httpServer.listen(PORT, () => {
    console.log(`Servidor inicializado en el puerto ${PORT}`);
  });

  server.on("error", (err) => {
    console.log("Error del servidor." + err);
  });
  process.on("exit", (code) => {
    console.log("Exit code -> " + code);
  });
}

// chat en websocket - en ruta /chat y /chat/:email para ver solo sus mensajes. -- Necesito solucionar el problema de los scripts

// mejorar el manejo de errores del formulario de registro
