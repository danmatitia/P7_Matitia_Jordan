<template>
  <div>
    <form method="post" @submit.prevent="buttonNewReponses">
      <div>
        <label for="reponses"></label>
        <hr />
        <input
          type="reponses"
          id="reponses"
          placeholder="Ici votre reponses"
          v-model="reponses"
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
    <div class="error" v-if="error">
      {{ error }}
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "newReponses",
  props: {
    id: { type: Number },
  },
  data() {
    return {
      reponses: "",
      error: "",
    };
  },
  methods: {
    async buttonNewReponses() {
      this.error = "";
      try {
        await axios.post("/api/messages/" + this.id + "/reponses/", {
          reponses: this.reponses,
        });
        this.reponses = "";
        this.error = "Votre réponse a bien été envoyé !";
        this.$emit("refresh");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


<style scoped>
input {
  margin-bottom: 15px;
  margin-top: 15px;
  width: 500px;
  max-width: 94%;
  border-style: solid;
  border-color: #31bcc6;
  background-color: white;
}
button {
  width: 120px;
  cursor: pointer;
  border: unset;
  font-size: 1.2em;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.5);
  background: #31bcc6;
  transition: 0.3s;
  color: white;
  font-weight: bold;
}
button:hover {
  border-radius: 10px 0 10px 0;
}
hr {
  border: 2px solid #d6dfe2;
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>