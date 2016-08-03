var game = {
  sequence: [],
  checkIndex: 0,
  currentScore: document.getElementById('current-score-box'),
  highScore: document.getElementById('high-score-box'),
  colors: ['green', 'red', 'blue', 'yellow'],
  sounds: {
  },

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

  delayedEnableStartButton: function(delay) {
    setTimeout(function() {
      game.enableStartButton();
    }, delay)
  },

  // THIS FUNCTION CALLED ON START CLICK
  pushValueAndPlaySequence: function() {
    this.playerCorrect = true;
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

    if (playerChoice !== this.sequence[this.checkIndex]) {
      this.playerCorrect = false;
      this.checkIndex = 0;
      this.sequence = [];
      this.delayedEnableStartButton(5000);
    } else {
      this.checkIndex += 1;
      if (this.checkIndex >= this.sequence.length) {
        this.currentScore.innerHTML = this.checkIndex;
        this.checkHighScore();
        this.checkIndex = 0;
        var that = this;
        setTimeout(function() {
          that.pushValueAndPlaySequence();
        }, 1500);
      } else {
        this.delayedEnableGameButtons(750);
      }
    } this.lightUpAndSound(playerChoice, this.playerCorrect);
  },

  lightUpAndSound: function(buttonChoice, playerCorrect) {
    console.log('lightUpAndSound:', buttonChoice, playerCorrect);
    document.getElementById(this.colors[buttonChoice]).setAttribute('style', 'opacity: 1');

    if (playerCorrect) {
      switch (buttonChoice) {
        case 0:
          this.sounds.green.play();
          break;
        case 1:
          this.sounds.red.play();
          break;
        case 2:
          this.sounds.blue.play();
          break;
        case 3:
          this.sounds.yellow.play();
      }
    } else {
      this.sounds.lose.play();
    }
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

  scoreReset: function() {
    this.currentScore.innerHTML = 0;
  },

  checkHighScore: function() {
    if (this.currentScore.innerHTML >= this.highScore.innerHTML) {
      this.highScore.innerHTML = this.currentScore.innerHTML;
    }
  },

  generateAudio: function() {
    for (var m = 0; m < this.colors.length; m++){
      var audio = document.createElement('audio');
      audio.setAttribute('src', 'audio/' + this.colors[m] + '.mp3');

      switch (this.colors[m]) {
        case 'green':
          this.sounds.green = audio;
          break;
        case 'blue':
          this.sounds.blue = audio;
          break;
        case 'red':
          this.sounds.red = audio;
          break;
        case 'yellow':
          this.sounds.yellow = audio;
      }
    }
    var audio = document.createElement('audio');
    audio.setAttribute('src', 'audio/lose.mp3');
    this.sounds.lose = audio;
  }

}

$(function() {
  game.generateAudio();
});
