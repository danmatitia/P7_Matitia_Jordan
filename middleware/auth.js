// MODULES
const jwt = require("jsonwebtoken"); // Crée et check un token d'identification sécurisé

// MIDDLEWARE AUTH
module.exports = (req, res, next) => {
  // Check si le token est bon
  try {
    // Check si le token est bon grâce à notre phrase secrète
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    res.locals.userId = decodedToken.userId;
    res.locals.isAdmin = decodedToken.isAdmin;
    next();
  } catch {
    res.status(401).json({ message: "Requête invalide!" });
  }
};