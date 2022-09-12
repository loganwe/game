let player: game.LedSprite = null
let enemy: game.LedSprite = null
let game_started = false
let b_prev = 0
let score = 0
let ended = false
input.onButtonPressed(Button.A, function () {

    if (game_started) {
        player.set(LedSpriteProperty.Y, 1)
        basic.pause(1000)
        player.set(LedSpriteProperty.Y, 2)
    } else {
        player = game.createSprite(1, 2)
        enemy = game.createSprite(4, 2)
        game_started = true
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
        enemy.change(LedSpriteProperty.X, -1)
        score += 1
        basic.pause(400)
        if (enemy.get(LedSpriteProperty.X) == 0) {
            enemy.set(LedSpriteProperty.X, 4)
        }
        if (player.isTouching(enemy)) {
            player.delete()
            enemy.delete()
            basic.showString("You lose score:" + score)
            ended = true
            basic.pause(2000)
            control.reset()
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
