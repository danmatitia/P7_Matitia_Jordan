<template>
  <div>
    <h1>MON PROFIL</h1>
    <div id="container">
      <!-- ICI ajouter de quoi afficher les messages du profil -->
      <div class="les-messages">
        <h3>Mes messages</h3>
        <cardMessages
          :key="messages.id"
          v-for="messages of messages"
          :title="messages.title"
          :content="messages.content"
          :user="messages.User"
          :image="messages.image"
          :id="messages.id"
        />
      </div>
      <div id="profil">
        <!-- Email, Nom et prénom du profil -->
         <div v-if="dataProfile">
          <p>E-mail :{{ " " + dataProfile.email }}</p>
          <p>
            Prénom et Nom :
            {{ dataProfile.firstname + " " + dataProfile.lastname }}
          </p>
          <hr />
        </div>
        <!-- <div v-else id="chargement">
          Chargement
          <span></span>
          <span></span>
          <span></span>
        </div> -->
        <!-- modification Nom et prénom du profil -->
        <form method="post" @submit.prevent="updateProfile">
          <div>
            <label for="lastname">Nom</label><br />
            <input
              required
              v-model="lastname"
              type="text"
              name="lastName"
              id="lastname-input"
              placeholder="Dupont"
            />
          </div>
          <div>
            <label for="firstname">Prénom</label><br />
            <input
              required
              v-model="firstname"
              type="text"
              name="firstname"
              id="firstname-input"
              placeholder="Charles"
            />
          </div>

          <button type="submit" @click.prevent="updateProfile">Modifier</button>
          <p v-if="message">{{ message }}</p>
        </form>
        <hr />
        <!-- Supprimer le profil -->
        <button class="deletebtn" type="submit" @click.prevent="deleteProfile">
          Supprimer mon compte
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import cardMessages from "../components/cardMessages";
export default {
  name: "profile",
  components: { cardMessages },
  props: { 
    id: Number,
  },
  data() {
    return {
      token: "",
      userId: "",
      message: "",
      dataProfile: null,
      messages: [],
      email: "",
      firstname: "",
      lastname: "",
    };
  },
  methods: {
    loadProfile() {
      let userId = localStorage.getItem("id");
      axios
        .get("/api/auth/profile/" + userId)
        .then((res) => {
          this.dataProfile = res.data;
        })
        .catch((error) => {
          console.log({ error });
          if (error.status === 401) {
            this.$router.push("/login");
          }
        });
    },
    allMessagesProfile() {
      let userId = localStorage.getItem("id");
      axios
        .get("/api/auth/profile/" + userId + "/messages")
        .then((res) => {
          this.messages = res.data;
        })
        .catch((error) => {
          console.log({ error });
          if (error.status === 401) {
            this.$router.push("/login");
          }
        });
    },
    updateProfile() {
      let userId = localStorage.getItem("id");
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
      };
      axios
        .put("/api/auth/profile/" + userId, data)
        .then((res) => {
          alert("Votre profil a bien été mis à jour !");
          this.dataProfile = res.data.user;
        })
        .catch((error) => {
          this.error = error;
          if (error.status === 401) {
            this.$router.push("/login");
          }
        });
    },
    async deleteProfile() {
      const isConfirm = await confirm(
        "Confirmez vous la suppression du profil ?"
      );
      console.log({ isConfirm });
      if (!isConfirm) {
        return;
      }
      let userId = localStorage.getItem("id");
      axios
        .delete("/api/auth/profile/" + userId)
        .then(() => {
          alert("Votre compte est supprimé !");
          this.$router.push("/signup");
        })
        .catch((error) => {
          console.log({ error });
          alert("Le profil n'a pas pu être supprimé !");
        });
    },
  },
  mounted() {
    /*appeler les fonctions quand l'html sera pret*/
    this.loadProfile();
    this.allMessagesProfile();
  },
};
</script>



<style scoped>
/* v-else animation chargement */
#chargement {
  margin-top: 20px;
  color: #31bcc6;
}
#chargement span {
  width: 0.5em;
  height: 0.5em;
  margin: 0 2px;
  background-color: #31bcc6;
  border-radius: 50%;
  display: inline-block;
  animation-name: JumpingDots;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
span:nth-child(2) {
  animation-delay: 0.4s;
}
span:nth-child(3) {
  animation-delay: 0.8s;
}
@keyframes JumpingDots {
  30% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
/* fin animation chargement */
#container {
  display: flex;
  justify-content: space-around;
}
#profile {
  flex: 1;
  background-color: #d2fafa;
  height: 30%;
  margin: 20px 20px 20px 20px;
  border-radius: 10px;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.les-messages {
  flex: 2;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.les-messages h3 {
  background-color: #d2fafa;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 10px;
  margin-right: 20px;
  margin-left: 20px;
}
.deletebtn {
  width: 150px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background-color: rgb(216, 41, 41);
  margin-top: 40px;
  margin-bottom: 40px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.deletebtn:hover {
  border-radius: 10px 0 10px 0;
}
button {
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background: #31bcc6;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.error {
  font-size: 1.2em;
  color: rgb(216, 41, 41);
  margin-top: 20px;
}
form {
  padding-top: 20px;
}
#lastname-input,
#firstname-input {
  margin-bottom: 15px;
  margin-top: 5px;
  width: 500px;
  max-width: 94%;
  border-style: solid;
  border-color: #31bcc6;
  background-color: white;
  text-align: center;
}
hr {
  border: 2px solid #d6dfe2;
}
@media screen and (max-width: 1130px) {
  #container {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .les-messages {
    width: 100%;
  }
  #profil {
    width: 100%;
  }
}
</style>