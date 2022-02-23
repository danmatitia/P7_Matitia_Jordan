<template>
  <div class="Accueil">
    <img alt="Vue logo" src="../assets/logo.png">
    <login msg="Welcome to Your company App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import login from '@/views/login.vue'

export default {
  name: 'Accueil',
  components: {
    login
  }
}
</script>
