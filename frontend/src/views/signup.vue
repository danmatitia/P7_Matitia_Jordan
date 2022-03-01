<template>
  <div class="container_signup">
    <h2>Bienvenue sur votre réseau social d'entreprise</h2>
    <h3>Merci de remplir le formulaire d'inscription</h3>

    <form class="signup" @submit.prevent="signup">
      <label for="firstname">Prénom :</label>
      <input
        required
        v-model="firstname"
        type="text"
        name="firstName"
        id="firstname-input"
        placeholder="Pierre"
      />

      <label for="lastname">Nom :</label>
      <input
        required
        v-model="lastname"
        type="text"
        name="lastName"
        id="lastname-input"
        placeholder="Dupont"
      />

      <label for="email">Email :</label>
      <input
        required
        v-model="email"
        type="email"
        name="email"
        id="email-input"
        placeholder="utilisateur@domaine.fr"
      />

      <label for="password">Mot de passe :</label>
      <input
        required
        v-model="password"
        type="password"
        name="password"
        id="password-input"
      />

      <button type="submit" @click.prevent="buttonSignup">S'inscrire</button>
      <p v-if="message">{{ message }}</p>
    </form>

    <div class="container_login">
      <p>
        Vous avez déjà un compte? <router-link to="/login">login</router-link>.
      </p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "signup",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async buttonSignup() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };
      console.table(data);
      try {
        const res = await axios.post("/api/auth/signup", data);
        console.log(res);
        this.$router.push("/login");
      } catch (error) {
        alert(error?.response?.data?.error || "Une erreur est survenue.");
      }
    },
  },
};
</script>


<style scoped>
.container_signup {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px grey;
  margin-top: 50px;
  width: 95%;
  background-color: white;
}
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup input {
  width: 500px;
  margin-bottom: 15px;
  max-width: 94%;
  border-style: solid;
  border-color: #31bcc6;
  background-color: #d2fafa;
}
.signup button {
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background: #31bcc6;
  margin-top: 40px;
  margin-bottom: 60px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.signup button:hover {
  border-radius: 10px 0 10px 0;
}
.container_login {
  margin-top: 20px;
  box-shadow: 0px 0px 10px 0px grey;
}
</style>