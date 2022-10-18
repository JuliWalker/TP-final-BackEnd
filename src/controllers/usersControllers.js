import UsersServices from "../services/usersServices.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
  encryptPassword,
  comparePassword,
} from "../utils/bcryptConfig/bcrypt.js";
import generateToken from "../utils/jwt/generateToken.js";

dotenv.config();

export default class UsersController {
  constructor() {
    this.servicesUser = new UsersServices();
  }

  /* Login */

  getLogin = async (req, res) => {
    try {
      res.status(200).render("login");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  postlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ message: "Complete los datos" });
      }
      const user = await this.servicesUser.getByMail(email);
      let isValid = false;
      if (user !== null) {
        isValid = await comparePassword(password, user.password);
      }
      if (!isValid) {
        return res
          .status(401)
          .redirect('/api/users/errorLogin');
      }
      req.session.user = user;
      const token = await generateToken(user);
      // pongo esta logica para usar las vistas en EJS:
      console.log(token)
      res.status(200).redirect('/api/productos') 
      // pero esto es lo que le deberia pasar al fron cuando lo tengamos creado:
/*       res.json({
        name: user.name,
        email: user.email,
        token,
      }); */
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error de servidor." });
    }
  };

  errorLogin = async (req, res) => {
    try {
      res.status(200).render("errorLogin");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /* Registro */

  getRegistro = async (req, res) => {
    try {
      res.status(200).render("registro");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  postRegistro = async (req, res) => {
    try {
      const newUser = req.body;
      const exist = await this.servicesUser.getByMail(newUser.email);
      if (exist) {
        res.status(401).redirect('/api/users/errorRegistro');
      } else {
        newUser.password = await encryptPassword(newUser.password);
        const newUserDB = await this.servicesUser.saveNew(newUser);
        req.session.user = {
          email: newUserDB.email,
          nombre: newUserDB.nombre,
          apellido: newUserDB.apellido,
          id: newUserDB._id,
        };
        res.status(200).redirect("/api/users/mailRegistro");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error_description: "Error en el servidor." });
    }
  };

  errorRegistro = async (req, res) => {
    try {
      res.status(200).render("errorRegistro");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /* Node Mailer */

  mailRegistro = async (req, res) => {
    try {
      let nombre = req.session.user.nombre;
      let apellido = req.session.user.apellido;
      let email = req.session.user.email;

      let htmlTemplate = `
            <h1>Bienvenido ${nombre} ${apellido}</h1>
            <p>
            Su correo ${email} ha sido registrado con éxito.
            </p>
            `;

      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.USER_ETHEREAL,
          pass: process.env.PASS_ETHEREAL,
        },
      });

      await transporter.sendMail({
        from: "Juli app",
        to: email,
        subject: "Regitro de usuario en Juli app",
        html: htmlTemplate,
      });

      res.status(200).redirect("/api/productos");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  /* LogOut */

  logout = async (req, res) => {
    try {
      const nombre = req.session.nombre;
      req.session.destroy((err) => {
        if (!err) {
          console.log("Session destroyed");
        } else {
          res.status(500).send({ status: "Error al borrar session" });
        }
      });
      res.status(200).render("logout", { nombre });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}
