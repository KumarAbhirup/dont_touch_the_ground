/* global p5, Koji */

// This function runs when the Game Screen is OFF, i.e. game is over or not yet started
function gameBeginningOver() {
  // Draw title
  let titleText = Koji.config.strings.title
  let titleSize = floor(objSize * 2)
  textSize(titleSize)

  // Resize title until it fits the screen
  while (textWidth(titleText) > width * 0.9) {
      titleSize *= 0.9
      textSize(titleSize)
  }

  fill(Koji.config.colors.titleColor)
  textAlign(CENTER, TOP)
  text(Koji.config.strings.title, width / 2, objSize * 3)

  // Draw instructions
  let instructionsText = []
  instructionsText[0] = Koji.config.strings.instructions1
  instructionsText[1] = Koji.config.strings.instructions2
  instructionsText[2] = Koji.config.strings.instructions3

  let instructionsSize = []

  for (let i = 0; i < instructionsText.length; i++) {
      instructionsSize[i] = floor(objSize * 0.75)
      textSize(instructionsSize[i])

      // Resize text until it fits the screen
      while (textWidth(instructionsText[i]) > width * 0.9) {
          instructionsSize[i] *= 0.9;
          textSize(instructionsSize[i])
      }
  }

  textSize(instructionsSize[0])
  fill(Koji.config.colors.instructionsColor)
  textAlign(CENTER, TOP)
  text(instructionsText[0], width / 2, objSize * 6)

  textSize(instructionsSize[1])
  fill(Koji.config.colors.instructionsColor)
  textAlign(CENTER, TOP)
  text(instructionsText[1], width / 2, objSize * 8)

  textSize(instructionsSize[2])
  fill(Koji.config.colors.instructionsColor)
  textAlign(CENTER, TOP)
  text(instructionsText[2], width / 2, objSize * 10)

  playButton.update()
  playButton.btn.draw()

  // Draw score text after the game
  if (!gameBeginning) {
      textSize(objSize * 0.9)
      fill(Koji.config.colors.scoreColor)
      textAlign(CENTER, TOP)
      text(Koji.config.strings.scoreText + " " + score, width / 2, playButton.pos.y + objSize * 4)
  }

  // Notify the player if they got a new high score, otherwise show the previous high score
  if (highscoreGained) {
      textSize(objSize * 1)
      fill(Koji.config.colors.highscoreColor)
      textAlign(CENTER, BOTTOM)
      text(Koji.config.strings.highscoreGainedText, width / 2, height - objSize)
  } else {
      textSize(objSize * 1)
      fill(Koji.config.colors.highscoreColor)
      textAlign(CENTER, BOTTOM)
      text(Koji.config.strings.highscoreText + "\n" + highScore, width / 2, height - objSize)
  }
}
