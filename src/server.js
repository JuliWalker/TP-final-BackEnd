import express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import 'dotenv/config'
import morgan from "morgan";
import indexRouter from './routes/indexRoutes.js';
import os from "os";
import cluster from "cluster";
import {dirname} from 'path'
import { fileURLToPath } from 'url';
import http from "http";
import { Server } from "socket.io";
import websocketConfig from "./utils/websocketConfig/websocketConfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


/** Variables de configuracion: */

const PORT = process.env.PORT || 8080
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
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_MONGO,
            ttl: 60 * 10 // 10 minutes de tiempo de sesion
            })
    }
));


/** Views */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));


/** Routes */
app.use('/api', indexRouter);
app.get("/", (req, res) => {
  res.redirect("/api");
});


/** websockets */
websocketConfig(io);


/** Server */
try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}

}


// chat en websocket - en ruta /chat y /chat/:email para ver solo sus mensajes. -- Necesito solucionar el problema de los scripts

// mejorar el manejo de errores del formulario de registro