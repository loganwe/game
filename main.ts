let ended = false
let score = 0
let a_prev=true
let b_prev = 0
let enemy: game.LedSprite = null
let player: game.LedSprite = null
let game_started = false
let level = 1
let lives = 3
let admin=false
input.onButtonPressed(Button.A, function () {
    if (game_started) {
        if(a_prev){
           if (level == 1) {
              
               a_prev = false
                player.set(LedSpriteProperty.Y, 1)
                  basic.pause(1000)
                  player.set(LedSpriteProperty.Y, 2)
              a_prev=true
              
           } else if (level == 2) {
               a_prev = false
                player.set(LedSpriteProperty.Y, 1)
               basic.pause(600)
               player.set(LedSpriteProperty.Y, 2)
               a_prev=true
               
               
           }
        }
    } else {
        player = game.createSprite(1, 2)
        enemy = game.createSprite(4, 2)
        game_started = true
    }
})
/*input.onGesture(Gesture.FreeFall, function () {
    if (b_prev == 0) {
        b_prev = 1
        paused=true
    } else {
        paused=false;
        b_prev = 0
    }
})
*/input.onButtonPressed(Button.B, function () {
    if(!game_started){
        admin=true
        basic.showString("A")
        basic.showLeds(`
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            `)
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
                basic.pause(200)
                control.reset()
            }
          
        }
        if(admin&&score===20){
            player.delete()
            enemy.delete()
            basic.showIcon(IconNames.Yes)
            basic.showString("You win")
            basic.pause(200)
            control.reset()
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
