const game = {
  score: 0,
  life: 100,
  scoreBonus: 10,
  lifeBonus: 10,
  lifeDamage: 5,
  firstCard: null,
  secondCard: null,
  level: 1,
  cardCounter: 0,
  cards: null,
  stats: null,
  reset: null,
  calculating: false,
  updateGameStats () {
    this.stats.innerHTML = `Score: ${this.score} | Life: ${this.life} | Level: ${this.level}`
  },
  startGame (gameAreaId, cardsClass, gameStatsId, resetGameId) {
    if (!gameAreaId || !cardsClass || !gameStatsId || !resetGameId) {
      alert("Game area id, card class, game stats id or reset game id was not found");
      return false;
    }

    // add event 
    document.getElementById(gameAreaId).addEventListener("click", (event) => {
      this.cardClicked(event.target);
    });
    document.getElementById(resetGameId).addEventListener("click", () => {
      this.resetGame();
    });

    this.cards = document.querySelectorAll(`.${cardsClass}`);
    this.stats = document.getElementById(gameStatsId);
    this.reset = document.getElementById(resetGameId);

    this.addCards();
  },
  addCards () {
    this.resetCards();

    this.cards.forEach(element => {
      let random = Math.floor(Math.random() * 16);
      element.setAttribute("style", `order: ${random}`);
    });

    this.updateGameStats();

    setTimeout(() => {
      this.cards.forEach(element => element.classList.add("flip"));
    }, 1000);

    setTimeout(() => {
      this.cards.forEach(element => element.classList.remove("flip"));
    }, 3000);
  },
  cardClicked (elem) {
    if (this.calculating && this.secondCard !== null) {
      console.log("waiting for animation to stop");
      return false;
    }

    if (!elem.classList.contains("back")) {
      console.log("user didn't click on back image");
      return false;
    }
    if (elem.parentElement.classList.contains('flip')) {
      console.log("user clicked on flip image");
      return false;
    }

    this.calculating = true;

    elem.parentElement.classList.add('flip');
    if (!this.firstCard) {
      this.firstCard = elem.parentElement;
    } else {
      this.secondCard = elem.parentElement;
      setTimeout(() => {
        this.calculate();
      }, 1000);
    }
  },
  calculate () {
    if (this.firstCard.getAttribute('data-code') == this.secondCard.getAttribute('data-code')) {
      // round won
      this.score += this.scoreBonus;
      this.cardCounter += 2;
    } else {
      // wrong selection, reset current choise
      this.life -= this.lifeBonus;
      this.firstCard.classList.remove('flip');
      this.secondCard.classList.remove('flip');
    }
    this.resetCards();
    this.updateGameStats();
    if (this.cardCounter == this.cards.length) {
      this.nextLevel();
    }
    if (this.life == 0) {
      this.gameOver();
    }
  },
  nextLevel () {
    alert(`Congratz! You have finished level ${this.level}, get ready for next level!`);
    this.level++;
    this.life += this.lifeBonus;
    this.cardCounter = 0;
    this.addCards();
  },
  gameOver () {
    alert(`GAME OVER! Your score is ${this.score}.`);
    this.resetGame();
  },
  resetCards () {
    this.firstCard = null;
    this.secondCard = null;
    this.calculating = false;
  },
  resetGame () {
    this.level = 1;
    this.cardCounter = 0;
    this.score = 0;
    this.life = 100;
    this.cards.forEach(element => element.classList.remove("flip"));
    this.addCards();
  }
}

game.startGame("game-area", "card", "game-stats", "game-reset");