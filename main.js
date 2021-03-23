let game = {
    score: 0,
    life: 100,
    scoreBonus: 10,
    lifeBonus: 10,
    lifeDamage: 5,
    firstCard: null,
    secondCard: null,
    calculating: false,
    level: 1,
    cardCounter: 0,
    cardColors: [
        'red',
        'magenta',
        'maroon',
        'olive',
        'green',
        'purple',
        'teal',
        'navy'
    ],
    addCards() {
        $(".game-area").html("");
        for (let i = 0; i <= 1; i++) {
            this.cardColors.forEach(color => {
                let random = Math.floor(Math.random() * 16);
                $(`<div class="card" data-color="${color}" style="order: ${random}"><div class="front ${color}">!</div><div class="back">?</div></div>`)
                    .appendTo(".game-area");
            });
        }

        this.updateGameStats();

        setTimeout(() => {
            $('.card').addClass('flip');
        }, 1000);
        setTimeout(() => {
            $('.card').removeClass('flip');
        }, 3000);
    },
    calculate() {
        this.calculating = true;
        setTimeout(() => {
            if (this.firstCard.attr('data-color') == this.secondCard.attr('data-color')) {
                this.score += this.scoreBonus;
                this.cardCounter++;
            } else {
                this.life -= this.lifeBonus;
                this.firstCard.removeClass('flip');
                this.secondCard.removeClass('flip');
            }
            this.resetCards();
            this.updateGameStats();
            if (this.cardCounter == this.cardColors.length) {
                this.nextLevel();
            }
            if (this.life == 0) {
                this.gameOver();
            }
        }, 500);
    },
    cardClicked(elem) {
        console.log(this.calculating)
        if (elem.hasClass('flip') || this.calculating) {
            return;
        }

        elem.addClass('flip');
        if (!this.firstCard) {
            this.firstCard = elem;
        } else {
            this.secondCard = elem;
            this.calculate();
        }
    },
    nextLevel() {
        alert(`Congratz! You have finished level ${this.level}, get ready for next level!`);
        this.level++;
        this.life += this.lifeBonus;
        this.cardCounter = 0;
        this.addCards();
    },
    gameOver() {
        alert(`GAME OVER! Your score is ${this.score}.`);
        this.resetGame();
    },
    resetCards() {
        this.firstCard = null;
        this.secondCard = null;
        this.calculating = false;
    },
    updateGameStats() {
        $('#score').html(this.score);
        $('#life').html(this.life);
        $('#life').css('color', this.life > 70 ? 'white' : 'yellow');
        $('#level').html(this.level);
    },
    resetGame() {
        this.level = 1;
        this.cardCounter = 0;
        this.score = 0;
        this.life = 100;
        this.resetCards();
        this.addCards();
    }
}

$(document).on('click', '.play', () => {
    $('.start-screen').slideUp();
    $('.game-screen').slideDown();
    game.addCards();
});

$(document).on('click', '.card', function () {
    game.cardClicked($(this));
});

$(document).on('click', '.game-reset', function () {
    game.resetGame();
});