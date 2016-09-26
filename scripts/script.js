var game = {
  sequence: [],
  checkIndex: 0,
  colors: ['green', 'red', 'blue', 'yellow'],
  sounds: {
  },

  delayedPlay: function(num, delay) {
    setTimeout(function() {
      game.lightUpAndSound(game.sequence[num], game.playerCorrect);
    }, delay);
  },

  delayedpushValueAndPlaySequence: function(delay) {
    setTimeout(function() {
      game.pushValueAndPlaySequence();
    }, delay)
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
    this.disableGameButtons();
    this.sequence.push(Math.floor(Math.random() * 4));
    for (var i = 0; i < this.sequence.length; i++) {
        this.delayedPlay(i, i * 1000);
    }
    this.delayedEnableGameButtons(this.sequence.length * 1000);
    this.delayedEnableStartButton(this.sequence.length * 1000);
  },

  // THIS FUNCTION CALLED ON GAME BUTTON CLICK
  checkPlayerChoice: function(playerChoice) {
    this.disableGameButtons();

    if (playerChoice !== this.sequence[this.checkIndex]) {
      this.playerCorrect = false;
      this.checkIndex = 0;
      this.disableStartButton();
      this.toggleStartReset();
      this.delayedEnableStartButton(5000);
    } else {
      this.checkIndex += 1;
      if (this.checkIndex >= this.sequence.length) {
        this.disableStartButton();
        $("#current-score-box").html(this.checkIndex);
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
    $("#" + this.colors[buttonChoice]).attr('style', 'opacity: 1');

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
      $("#" + game.colors[j]).removeAttr("style");
    }
  },

  disableGameButtons: function() {
    for (var k = 0; k < this.colors.length; k++) {
      $('#' + this.colors[k]).prop('disabled', true);
    }
  },

  enableGameButtons: function() {
    for (var l = 0; l < this.colors.length; l++) {
      $('#' + this.colors[l]).prop('disabled', false);
    }
  },

  disableStartButton: function() {
    $('#start-button').prop('disabled', true);
    $('#start-button').attr('style', 'opacity: .3');
  },

  enableStartButton: function() {
    $('#start-button').prop('disabled', false);
    $('#start-button').removeAttr('style');
  },

  toggleStartReset: function() {
    console.log('switch called!');
    $("#start-button").removeAttr('onclick');
    // var button = document.getElementById('start-button');
    // button.removeAttribute('onclick');

    switch($("#start-button").html()) {
      case 'Start':
        $("#start-button").html("Reset");
        $("#start-button").attr('onclick', 'game.gameReset(), game.delayedpushValueAndPlaySequence(500)');
        break;
      case 'Reset':
        $("#start-button").html("Start");
        $("#start-button").attr('onclick', 'game.toggleStartReset(), game.gameReset(), game.pushValueAndPlaySequence()');
    }

  },

  gameReset: function() {
    this.sequence = [];
    $("#current-score-box").html(0);
    this.checkIndex = 0;
  },

  checkHighScore: function() {
    if ($("#current-score-box").html() >= $("#high-score-box").html()) {
      $("#high-score-box").html($("#current-score-box").html());
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

window.onload = game.generateAudio();
