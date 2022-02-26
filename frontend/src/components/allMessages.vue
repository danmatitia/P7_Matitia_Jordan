<template>
  <div v-if="!loading" id="allMessages">
    <h3 class="title">Liste des messages</h3>
    <card-Messages
      :key="Messages.id"
      v-for="Messages of messages"
      :title="Messages.title"
      :content="Messages.content"
      :user="Messages.User"
      :image="Messages.image"
      :id="Messages.id"
    />
  </div>
  <div v-else id="chargement">
    chargement
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>


<script>
import axios from "axios";
import cardMessages from "./cardMessages";

export default {
  name: "allMessages",
  components: { cardMessages },
  data() {
    return {
      messages: [],
      loading: false,
    };
  },
  methods: {
    async fetchMessages() {
      this.loading = true;
      try {
        const { data } = await axios.get("/api/messages");
        this.messages = data;
      } catch (error) {
        if (error.status === 401) {
          this.$router.push("/login");
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchMessages();
  },
};
</script>


<style scoped>
h3 {
  margin-left: 20px;
  margin-right: 20px;
  background-color: #d2fafa;
  padding-bottom: 10px;
  padding-top: 10px;
  border-radius: 10px;
}
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
</style>