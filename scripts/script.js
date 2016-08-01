var game = {
  playerCorrect: true,
  sequence: [],
  checkIndex: 0,
  currentScore: document.getElementById('current-score-box'),
  highScore: document.getElementById('#high-score-box'),
  colors: ['green', 'red', 'blue', 'yellow'],


  // THIS FUNCTION CALLED ON START CLICK
  pushValueAndPlaySequence: function() {
    this.disableStartButton();
    this.sequence.push(Math.floor(Math.random() * 4));
    for (var i = 0; i < this.sequence.length; i++) {
      this.lightUpAndSound(this.sequence[i], this.playerCorrect);
    }
    this.enableGameButtons();
  },

  // THIS FUNCTION CALLED ON GAME BUTTON CLICK
  checkPlayerChoice: function(playerChoice) {
    this.disableGameButtons();
    if (playerChoice !== this.sequence[this.checkIndex]) {
      this.playerCorrect = false;
      this.lightUpAndSound(playerChoice, this.playerCorrect);
      //check high score
      this.checkIndex = 0;
      this.sequence = [];
      this.enableStartButton();
      return;
    } else {
      this.lightUpAndSound(playerChoice, this.playerCorrect);
      this.checkIndex += 1;
      if (this.checkIndex >= this.sequence.length) {
        this.checkIndex = 0;
        this.pushValueAndPlaySequence();
        return;
      }
      this.enableGameButtons();
    }
  },

  lightUpAndSound: function(buttonChoice, playerCorrect) {
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
  }

}
