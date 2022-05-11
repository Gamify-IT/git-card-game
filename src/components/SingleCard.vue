<template>
  <div @click="click()" :class="'card ' + (playable ? 'playable-card' : '')" :style="'background-color: ' + card.color">
    <h1>{{ card.command }}</h1>
    <span>{{ card.description }}</span>
  </div>
</template>

<script lang="ts">
import { GitContext } from './git';
export default {
  props: {
    card: Object,
    git: GitContext,
    removeCard: Function,
    playable: Boolean,
    onError: Function,
    addToScore: Function,
  },
  methods: {
    click() {
      if (this.playable === false) return;
      const score = this.card.score(this.git);
      if (score === -1) {
        this.onError();
        return;
      }

      console.log('git before: ', this.git);
      this.addToScore(score);
      this.git.commandHistory.push(this.card);
      this.removeCard(this.card);
      console.log('git after: ', this.git);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 270px;
  height: 180px;
  border-radius: 14px;

  background: gray;
  color: white;
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;

  margin: 20px;
  margin-right: -100px;
  padding: 20px;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  transition: transform linear 100ms;
}

.card h1 {
  font-weight: bold;
  font-size: 1.2rem;
}

.card.playable-card {
  cursor: pointer;
}

.card.playable-card:hover {
  transform: translate(0, -25%) scale(120%);
  z-index: 10;
}
</style>
