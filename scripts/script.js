var game = {
  playerCorrect: true,
  sequence: [],
  checkIndex: 0,
  currentScore: document.getElementById('current-score-box'),
  highScore: document.getElementById('#high-score-box'),
  colors: ['green', 'red', 'blue', 'yellow'],

  delayedPlay: function(num, delay) {
    setTimeout(function() {
      game.lightUpAndSound(game.sequence[num], game.playerCorrect);
    }, delay);
  },

  delayedEnableGameButtons: function(delay) {
    setTimeout(function() {
      game.enableGameButtons();
    }, delay)
  },

  // THIS FUNCTION CALLED ON START CLICK
  pushValueAndPlaySequence: function() {
    this.disableStartButton();
    this.disableGameButtons();
    this.sequence.push(Math.floor(Math.random() * 4));
    for (var i = 0; i < this.sequence.length; i++) {
        this.delayedPlay(i, i * 1000);
    }
    this.delayedEnableGameButtons(this.sequence.length * 1000);
  },

  // THIS FUNCTION CALLED ON GAME BUTTON CLICK
  checkPlayerChoice: function(playerChoice) {
    this.disableGameButtons();
    this.lightUpAndSound(playerChoice, this.playerCorrect);

    if (playerChoice !== this.sequence[this.checkIndex]) {
      this.playerCorrect = false;
      //check high score
      this.checkIndex = 0;
      this.sequence = [];
      this.enableStartButton();
    } else {
      this.checkIndex += 1;
      if (this.checkIndex >= this.sequence.length) {
        this.checkIndex = 0;
        var that = this;
        setTimeout(function() {
          that.pushValueAndPlaySequence();
        }, 1000);
      } else {
        this.delayedEnableGameButtons(500);
      }
    }
  },

  lightUpAndSound: function(buttonChoice, playerCorrect) {
    console.log('lightUpAndSound:', buttonChoice, playerCorrect);
    document.getElementById(this.colors[buttonChoice]).setAttribute('style', 'opacity: 1');
    setTimeout(game.resetButtonColors, 750);
  },

  resetButtonColors: function() {
    for(var j = 0; j < game.colors.length; j++) {
      document.getElementById(game.colors[j])
              .removeAttribute('style');
    }
  },

  disableGameButtons: function() {
    for (var k = 0; k < this.colors.length; k++) {
      document.getElementById(this.colors[k]).setAttribute('disabled', 'disabled');
    }
  },

  enableGameButtons: function() {
    for (var l = 0; l < this.colors.length; l++) {
      document.getElementById(this.colors[l]).removeAttribute('disabled');
    }
  },

  disableStartButton: function() {
    document.getElementById('start-button').setAttribute('disabled', 'disabled');
  },

  enableStartButton: function() {
    document.getElementById('start-button').removeAttribute('disabled');
  },

}
