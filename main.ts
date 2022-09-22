let ended = false
let score = 0
let a_prev=0
let b_prev = 0
let enemy: game.LedSprite = null
let player: game.LedSprite = null
let game_started = false
let level = 1
let lives = 3
input.onButtonPressed(Button.A, function () {
    if (game_started) {
       
           if (level == 1) {
                  player.set(LedSpriteProperty.Y, 1)
                  a_prev = 1
                  basic.pause(1000)
                  player.set(LedSpriteProperty.Y, 2)
              
           } else if (level == 2) {
               
                player.set(LedSpriteProperty.Y, 1)
                a_prev=1
               basic.pause(600)
               player.set(LedSpriteProperty.Y, 2)
               a_prev=0
               
           }
       
    } else {
        player = game.createSprite(1, 2)
        enemy = game.createSprite(4, 2)
        game_started = true
    }
})
input.onGesture(Gesture.FreeFall, function () {
    if (b_prev == 0) {
        b_prev = 1
        game.pause()
    } else {
        game.resume()
        b_prev = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (b_prev == 0) {
        b_prev = 1
        game.pause()
    } else {
        game.resume()
        b_prev = 0
    }
})
basic.forever(function () {
    if (game_started) {
        if (level == 1) {
            enemy.change(LedSpriteProperty.X, -1)
            basic.pause(400)
        } else if (level == 2) {
            enemy.change(LedSpriteProperty.X, -1)
            basic.pause(250)
        }
        if (enemy.get(LedSpriteProperty.X) == 0) {
            score += 1
            enemy.set(LedSpriteProperty.X, 4)
        }
        if (player.isTouching(enemy)) {
            lives += -1
            if (lives == 0) {
                player.delete()
                enemy.delete()
                basic.showIcon(IconNames.No)
                basic.showString("Score:" + score)
                ended = true
                basic.pause(2000)
                control.reset()
            }
          
        }
        if (score == 50) {
            player.delete()
            enemy.delete()
            basic.showIcon(IconNames.Yes)
            basic.showString("You win")
            basic.pause(200)
            control.reset()
        }
        if (score == 25) {
            level = 2
        }
    } else {
        basic.showLeds(`
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            `)
    }
})
