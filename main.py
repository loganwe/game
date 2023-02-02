ended = False
score = 0
a_prev = True
b_prev = 0
enemy: game.LedSprite = None
player: game.LedSprite = None
game_started = False
level = 1
lives = 3

def on_button_pressed_a():
    global a_prev, player, enemy, game_started
    if game_started:
        if a_prev:
            if level == 1:
                a_prev = False
                player.set(LedSpriteProperty.Y, 1)
                basic.pause(1000)
                player.set(LedSpriteProperty.Y, 2)
                a_prev = True
            elif level == 2:
                a_prev = False
                player.set(LedSpriteProperty.Y, 1)
                basic.pause(600)
                player.set(LedSpriteProperty.Y, 2)
                a_prev = True
    else:
        player = game.create_sprite(1, 2)
        enemy = game.create_sprite(4, 2)
        game_started = True
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_gesture_free_fall():
    global b_prev
    if b_prev == 0:
        b_prev = 1
        game.pause()
    else:
        game.resume()
        b_prev = 0
input.on_gesture(Gesture.FREE_FALL, on_gesture_free_fall)

def on_button_pressed_b():
    global b_prev
    if b_prev == 0:
        b_prev = 1
        game.pause()
    else:
        game.resume()
        b_prev = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_forever():
    global score, lives, ended, level
    if game_started:
        if level == 1:
            enemy.change(LedSpriteProperty.X, -1)
            basic.pause(400)
        elif level == 2:
            enemy.change(LedSpriteProperty.X, -1)
            basic.pause(250)
        if enemy.get(LedSpriteProperty.X) == 0:
            score += 1
            enemy.set(LedSpriteProperty.X, 4)
        if player.is_touching(enemy):
            lives += -1
            if lives == 0:
                player.delete()
                enemy.delete()
                basic.show_icon(IconNames.NO)
                basic.show_string("Score:" + str(score))
                ended = True
                basic.pause(2000)
                control.reset()
        if score == 50:
            player.delete()
            enemy.delete()
            basic.show_icon(IconNames.YES)
            basic.show_string("You win")
            basic.pause(200)
            control.reset()
        if score == 25:
            level = 2
    else:
        basic.show_leds("""
            . # . . .
                        . # # . .
                        . # # # .
                        . # # . .
                        . # . . .
        """)
basic.forever(on_forever)
