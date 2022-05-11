<template>
  <div class="git">
    <div class="git-cards">
      <transition-group>
        <div v-for="(card, i) in git.commandHistory" :key="card.id">
          <single-card v-if="i > git.commandHistory.length - 4" :card="card" :git="git"></single-card>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { GitContext } from './git';
import SingleCard from './SingleCard.vue';
export default {
  components: { SingleCard },
  props: {
    git: GitContext,
  },
};
</script>

<style scoped>
.git {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% - 100px));
}

.git .git-cards {
  display: flex;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: transform 100ms linear, opacity 100ms linear;
}

.v-enter-from {
  transform: translate(0, 20px);
  opacity: 0;
}
.v-leave-to {
  transform: translate(0, 0);
  opacity: 100%;
}
</style>
