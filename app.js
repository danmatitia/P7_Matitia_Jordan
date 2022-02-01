const express = require("express");
const app = express(); /*créer une application express*/
const path = require("path"); /* pour travailler avec les chemins de fichiers et de répertoires*/
const helmet = require("helmet"); /*sécurise les appli Express en définissant divers en-têtes HTTP*/

/*Importation des routes*/
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user"); // on récupère les routes pour l'user
const reponsesRoutes = require("./routes/reponses");

app.use((req, res, next) => { // configuration des CORS, pour permettre à différentes adresse localhost de communiquer entre elles
    res.setHeader('Access-Control-Allow-Origin', '*'); /*Accès à l'API depuis n'importe quelle origine*/
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); /*ajouter les headers mentionnés aux requêtes envoyées vers notre API*/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); /*Envoie des requêtes avec les méthodes demandées*/
    next();
  });


app.use(express.json()); /*transformer le corps des requêtes en objets JSON*/

app.use(helmet());

/*importation des routes*/
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/post", messagesRoutes);
app.use("/api/post", reponsesRoutes);

module.exports = app; /*export de l'application express pour le serveur node.js*/