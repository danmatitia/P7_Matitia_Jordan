<template>
  <div>
    <div v-if="messages">
      <div class="le-message">
        <h1>{{ messages.title }}</h1>
        <p>{{ messages.content }}</p>
        <img :src="messages.image" />
        <div>
          <button
            v-if="messages.iduser === me || isAdmin"
            @click.prevent="deleteMessages(messages.id)"
          >
            Supprimer
          </button>
        </div>
        <!-- pour poster une reponse -->
        <new-reponses @refresh="refreshReponses" :id="messages.id"></new-reponses>
      </div>
      <!-- Début des reponses -->
      <h2>Réponses :</h2>
      <div ref="reponses">
        <div class="card" :key="reponses.id" v-for="reponses of reponses">
          <p>
            {{ reponses.reponses }}
          </p>
          <p class="commDe">
            Publié par {{ reponses.user.firstName }} {{ reponses.user.lastName }}
          </p>
          <div v-if="reponses.user.id === me || isAdmin">
            <button @click.prevent="deleteReponses(reponses.id)">
              Supprimer
            </button>
          </div>
          <!-- Fin des commentaires -->
        </div>
      </div>
    </div>
    <div v-else>
      chargement...
    </div>
  </div>
</template>


<script>
import axios from "axios";
import newReponses from "../components/newReponses";
export default {
  name: "oneMessages",
  components: {
    newReponses,
  },
  data() {
    return {
      messages: null,
      reponses: [],
      me: 0,
      isAdmin: false,
    };
  },
  methods: {
    // Pour charger le message selectionnés
    async fetchMessages() {
      try {
        axios
        .get("/api/messages/" + this.$route.params.id)
        
        .then((res) => {
          this.messages = res.data;
        })
        .catch((error) => {
          console.log(error );
          if (error.status === 401) {
            this.$router.push("/login");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async refreshReponses() {
      await this.fetchReponses();
      this.$refs.reponses.scrollIntoView({
        behavior: "smooth",
      });
    },
    // Pour charger les réponses du message
    async fetchReponses() {
      this.loading = true;
      try {
        const { data } = await axios.get("/api/messages/" + this.$route.params.id + "/reponses")
        this.response = data;
      } catch (error) {
        if (error.status === 401) {
          this.$router.push("/login");
        }
      }
      this.loading = false;
    },
    // Pour delete la réponse séléctionné
    async deleteReponses(id) {
      console.log("delete reponses id: ", id);
      const isConfirm = await confirm(
        "Confirmez vous la suppression de votre réponse ?"
      );
      console.log({ isConfirm });
      if (!isConfirm) {
        return;
      }
      axios
        .delete("/api/messages/" + this.$route.params.id + "/reponses/" + id)
        .then(() => {
          alert("Votre réponse a bien été supprimé !");
          document.location.reload();
        })
        .catch((error) => {
          console.log({ error });
        });
    },
    // Pour delete le message séléctionné
    async deleteMessages(id) {
      console.log("delete messages id: ", id);
      const isConfirm = await confirm(
        "Confirmez vous la suppression du message ?"
      );
      console.log({ isConfirm });
      if (!isConfirm) {
        return;
      }
      axios.delete("/api/messages/" + this.$route.params.id)
        .then(() => {
          alert("Votre message a bien été supprimé !");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log({ error });
        });
    },
  },
  mounted() {
    this.fetchMessages();
    this.fetchReponses();
    this.me = Number(localStorage.getItem("id"));
    this.isAdmin = localStorage.getItem("isAdmin") === "true";
  },
};
</script>


<style scoped>
.le-message {
  margin: 30px 20px 30px 20px;
  padding: 1px 0px 30px 0px;
  background-color: #d2fafa;
  border-radius: 10px;
}
.card {
  margin: 10px 20px 20px 20px;
  padding: 1px 30px 30px 30px;
  background-color: white;
  border-radius: 10px;
}
button {
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1em;
  box-shadow: 5px 5px 15px -3px rgb(0 0 0 / 50%);
  background: rgb(255, 61, 61);
  margin-top: 10px;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
.commDe {
  font-style: italic;
}
img {
  max-width: 60%;
}
@media screen and (max-width: 1130px) {
  img {
    max-width: 90%;
  }
}
</style>