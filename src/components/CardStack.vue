<template>
  <div class="cards cards-transition">
    <transition-group>
      <single-card
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :git="git"
        :playable="turn"
        :removeCard="removeCard"
        :onError="onError"
        :addToScore="addToScore"
      ></single-card>
    </transition-group>
  </div>
  <div class="score">Your score: {{ score }}</div>
</template>

<script lang="ts">
import SingleCard from './SingleCard.vue';
import { Card, getRandomCard } from './cards';
import { GitContext } from './git';
import { maxCards } from './config';

export default {
  components: { SingleCard },
  props: {
    git: GitContext,
    onError: Function,
    turn: Boolean,
  },
  data() {
    return {
      cards: [],
      score: 0,
    };
  },
  mounted() {
    this.initCards();
  },
  methods: {
    initCards() {
      while (this.cards.length !== maxCards) {
        const randomCard = getRandomCard();
        if (this.cards.filter((card) => card.command === randomCard.command).length >= 2) continue;
        this.cards.push(randomCard);
      }
    },
    removeCard(card: Card) {
      this.cards = this.cards.filter((card_) => card.id !== card_.id);
    },
    addToScore(score: number) {
      this.score += score;
    },
  },
};
</script>

<style scoped>
.cards {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
}

.cards .card:last-child() {
  margin-right: 0;
}

/* we will explain what these classes do next! */
.cards-transition .v-enter-active,
.cards-transition .v-leave-active {
  transition: opacity 100ms linear;
}

.cards-transition .v-enter-from {
  opacity: 100%;
}
.cards-transition .v-leave-to {
  opacity: 0;
}

.score {
  position: fixed;
  right: 100px;
  bottom: 200px;
}
</style>
