import jwt from "jsonwebtoken";
import 'dotenv/config'

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

export default function (req, res, next) {
  const authHeader = req.get('authorization');
  let token = ""
  if (authHeader && authHeader.toLowerCase().startsWith('bearer')) {
    token = authHeader.split(' ')[1];
  } else {
    return res.status(400).json({
      error: 'Token no válido',
    });
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: 'No autorizado',
      });
    }

    if (decoded.id) {
      next();
    } else {
      return res.status(400).json({
        error: 'Error de authorizacion',
      });
    }
  });
};
