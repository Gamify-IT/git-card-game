<template>
  <button class="btn btn-danger close-button" @click="closeMicroservice()"><em class="bi bi-x"></em></button>
  <enemy-button :git="git" :initCards="initCards" :onEnemyTurn="onEnemyTurn" ref="enemyButton"></enemy-button>
  <git-view-vue :git="git"></git-view-vue>
  <card-stack :git="git" :onError="onError" :turn="turn" ref="cardStack"></card-stack>
</template>

<script>
import CardStack from './components/CardStack.vue';
import { GitContext } from './components/git';
import GitViewVue from './components/GitView.vue';
import EnemyButton from './components/EnemyButton.vue';

export default {
  name: 'App',
  components: {
    CardStack,
    GitViewVue,
    EnemyButton,
  },
  data() {
    return {
      git: new GitContext(),
      turn: true,
    };
  },
  methods: {
    initCards() {
      this.turn = true;
      this.$refs.cardStack.initCards();
    },
    onError() {
      this.$refs.enemyButton.click();
    },
    onEnemyTurn() {
      this.turn = false;
    },
    closeMicroservice() {
      console.log('closing microservice');
      window.parent.postMessage('CLOSE ME');
    },
  },
};
</script>

<style>
body {
  height: 100vh;
  background: url('https://media.istockphoto.com/photos/empty-wooden-table-for-product-placement-picture-id1045770226?k=20&m=1045770226&s=612x612&w=0&h=0C06D0adDxq5yaKrdS2Vj_1FVHibckPnylDvNI5DSpA=');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.score {
  font-size: 2rem;
  z-index: 100;
  font-weight: bold;
  color: white;
}

.close-button {
  position: fixed;
  top: 24px;
  right: 24px;
}
</style>
