// MODULES
const jwt = require("jsonwebtoken"); // Crée et check un token d'identification sécurisé

require('dotenv').config();

// MIDDLEWARE AUTH
module.exports = (req, res, next) => {
  // Check si le token est bon
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    res.locals.userId = decodedToken.userId;
    console.log(res.locals.userId);
    res.locals.isAdmin = decodedToken.isAdmin;
    console.log(res.locals.isAdmin);
    next();
  } catch {
    res.status(401).json({ message: "Requête invalide!" });
  }
};


   
