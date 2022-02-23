<template>
  <div>
    <div id="banniere">
      <div id="ban">
        <div class="tittleban">
          <h1>
            Une entreprise spécialisée dans la grande distribution
          </h1>
        </div>
      </div>
      <h1>FEED</h1>
    </div>
    <div id="container">
      <div class="allMessages">
        <allMessages />
      </div>
      <div class="newMessages">
        <newMessages />
      </div>
    </div>
  </div>
</template>


<script>
import allMessages from "../components/allMessages";
import newMessages from "../components/newMessages";
export default {
  name: "feed",
  components: {
    allMessages,
    newMessages,
  },
  data() {
    return {
      token: "",
      allMessages: [],
    };
  },
};
</script>


<style scoped>
#banniere {
  display: flex;
  flex-direction: column;
}
#ban {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/ban.jpg");
  height: 300px;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0px -10px 0px -10px;
}
.tittleban {
  color: white;
  padding: 1em;
  background: rgba(0, 0, 0, 0.7);
}
#container {
  display: flex;
  justify-content: space-around;
}
.allMessages {
  flex: 2;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
.newMessages {
  flex: 1;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: 1130px) {
  #container {
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .allMessages {
    width: 100%;
  }
  .newMessages {
    width: 100%;
  }
}
</style>