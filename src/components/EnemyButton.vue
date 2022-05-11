<template>
  <div class="enemy-button">
    <button :disabled="enemysTurn" @click="click()" class="btn btn-primary btn-lg">{{ btnText }}</button>
    <span class="score m-4">Enemy score: {{ score }}</span>
  </div>
</template>

<script lang="ts">
import { GitContext } from './git';
import { Card, getRandomCard } from './cards';

export default {
  props: {
    git: GitContext,
    initCards: Function,
    onEnemyTurn: Function,
  },
  data() {
    return { cards: [], enemysTurn: false, btnText: 'Finish your turn', score: 0 };
  },
  methods: {
    beforeClick() {
      this.onEnemyTurn();
      this.enemysTurn = true;
      this.btnText = 'Enemy is playing...';
    },
    afterClick() {
      this.enemysTurn = false;
      this.btnText = 'Finish your turn';
      this.initCards();
    },
    async click() {
      this.beforeClick();

      while (this.cards.length !== 5) {
        const randomCard = getRandomCard();
        if (this.cards.filter((card) => card.command === randomCard.command).length >= 2) continue;
        this.cards.push(randomCard);
      }

      while (this.cards.length !== 0) {
        let cardUsed = false;
        for (const card of this.cards) {
          const score = card.score(this.git);
          if (score !== -1) {
            if (score === 0 && Math.random() < 0.9) continue;
            await this.useCard(card);
            this.score += score;
            this.cardUsed = true;
            break;
          }
        }
        if (cardUsed === false) {
          break;
        }
      }

      this.afterClick();
    },
    async useCard(card: Card) {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 2000);
      });
      this.git.commandHistory.push(card);
      this.cards = this.cards.filter((card_) => card.id !== card_.id);
    },
  },
};
</script>

<style scoped>
.enemy-button {
  position: fixed;

  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 50%;

  transform: translate(-50%, 100px);
}

.enemy-button {
}

.score {
  color: black;
}
</style>
