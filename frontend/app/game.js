/* global p5, Koji, Object, Platform */

// This function runs when the Game Screen is ON
function gamePlay() {
  // Update all floating text objects
  for (let i = 0; i < floatingTexts.length; i++) {
      floatingTexts[i].update()
      floatingTexts[i].render()
  }

  // InGame UI
  ground.show(); groundLeft.show(); groundRight.show(); groundTop.show();
  platform.show()
  playableObject.show()

  // Score draw
  let scoreX = width - objSize / 2
  let scoreY = objSize / 3
  textSize(objSize * 2)
  fill(Koji.config.colors.scoreColor)
  textAlign(RIGHT, TOP)
  text(score, scoreX, scoreY)

  // Lives draw
  let lifeSize = objSize
  for (let i = 0; i < lives; i++) {
      image(imgLife, lifeSize / 2 + lifeSize * i, lifeSize / 2, lifeSize, lifeSize)
  }

  // Make the mouse constraint only work for movable bodies
  World.remove(world, mConstraint) // No mouse movement by default
  toBeMovedBody = mConstraint.body ? mConstraint.body : null
  if (toBeMovedBody && toBeMovedBody.movable) {
    // If the body is movable, let mouse do it's work!
    mConstraint.pointA = mouse.position
    mConstraint.bodyB = toBeMovedBody
    mConstraint.pointB = { x: mouse.position.x - toBeMovedBody.position.x, y: mouse.position.y - toBeMovedBody.position.y }
    mConstraint.angleB = toBeMovedBody.angle
    World.add(world, mConstraint)
  }

  // Lose life if ball touched the ground or if objects went out of the frame
  if (
    playableObject.didTouch(ground, 'rectangle') ||
    playableObject.wentOutOfFrame() || 
    platform.wentOutOfFrame()
  ) {
    // reconstruct the playableObject
    playableObject.destruct()
    playableObject = new GameObject (
      { x: width / 2, y: 170 }, 
      { radius: objSize * 2, width: objSize * 3, height: objSize * 3 }, // radius works for circle shape, width and height work for rectangular shape
      { shape: Koji.config.strings.objectShape, image: imgObject, color: { r: 0, g: 255, b: 255, a: 1 }, rotate: true, movable: false } // either `rectangle` or `circle` shape allowed. Else see some error.
    )
    playableObject.show()

    // reconstruct the platform
    platform.destruct()
    platform = new Platform({ x: width / 2 , y: 200 }, { width: objSize * 8, height: objSize * 0.8 }, { shape: 'rectangle', image: imgPlatform, color: { r: 0, g: 0, b: 0, a: 1 }, rotate: true, movable: true })
    platform.show()

    loseLife()
  }

  // decrease the score when ball is touching the platform
  if (playableObject.didTouch(platform, 'rectangle')) {
    if (score > 0) score -= parseInt(Koji.config.strings.scoreDecreaseSpeed)
  } else {
  // increase the score when ball is in the air
    score += parseInt(Koji.config.strings.scoreIncreaseSpeed)
  }

  cleanup()
}
