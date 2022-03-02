const express = require("express");
const bodyParser = require('body-parser');
const path = require("path"); /* pour travailler avec les chemins de fichiers et de répertoires*/

const helmet = require("helmet"); /*sécurise les appli Express en définissant divers en-têtes HTTP*/

/*Importation des routes*/
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user"); // on récupère les routes pour l'user
const reponsesRoutes = require("./routes/reponses");

const app = express(); /*créer une application express*/

app.use((req, res, next) => { // configuration des CORS, pour permettre à différentes adresse localhost de communiquer entre elles
    res.setHeader('Access-Control-Allow-Origin', '*'); /*Accès à l'API depuis n'importe quelle origine*/
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); /*ajouter les headers mentionnés aux requêtes envoyées vers notre API*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); /*Envoie des requêtes avec les méthodes demandées*/
    next();
  });

app.use (bodyParser.urlencoded({ extended: true}));
app.use (bodyParser.json()); // Il va transformer le corps de la requête en objet JS


/*utilisation des routes*/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
// app.use("/api/reponses", reponsesRoutes);
app.use("/api/messages", messagesRoutes);

app.use(helmet());

module.exports = app; /*export de l'application express pour le serveur node.js*/