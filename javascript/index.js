/*
0|1|2
- - -
3|4|5
- - -
6|7|8
*/

class Player {

    constructor() {
        this.squares = []
    }

    add(x) {
        this.squares.push(x)
        this.squares.sort()
    }

    check() {
        let l = this.squares.length, i, j, k, a, b, c
        if (l < 3) {
            return false
        } else {
            for (i=0; i<l-2; i++) {
                for (j=i+1; j<l-1; j++) {
                    for (k=j+1; k<l; k++) {
                        a = this.squares[i]
                        b = this.squares[j]
                        c = this.squares[k]
                        if (~~(a/3) == ~~(b/3) && ~~(a/3) == ~~(c/3) || a%3 == b%3 && a%3 == c%3 || a == 0 && b == 4 && c == 8 || a == 2 && b == 4 && c == 6) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    }

    clear() {
        this.squares = []
    }

}

class Game {

    constructor() {
        this.human = new Player() // player_id = 0, img = cross.jpg
        this.computer = new Player() // player_id = 1, img = circle.jpg
        this.spaces = [...Array(9).keys()]
        this.finished = false
        this.roll()
    }

    play(player_id, x = 0) {
        if (this.finished) {
            return 0
        }
        if (player_id == 0) {
            if (checkIn(this.spaces, x)) {
                updateMessage("&nbsp")
                this.human.add(x)
                this.spaces = this.spaces.filter(i => i != x)
                document.getElementById("image" + x.toString()).src = "images/cross.png"
                if (this.human.check()) {
                    updateMessage("Win")
                    this.finished = true
                } else if (this.spaces.length != 0) {
                    this.play(1)
                } else {
                    updateMessage("Draw")
                    this.finished = true
                }
            } else {
                updateMessage("Occupied")
            }
        } else {
            let x = this.spaces[Math.floor(Math.random() * this.spaces.length)]
            this.computer.add(x)
            this.spaces = this.spaces.filter(i => i != x)
            document.getElementById("image" + x.toString()).src = "images/circle.png"
            if (this.computer.check()) {
                updateMessage("Lose")
                this.finished = true
            } else if (this.spaces.length == 0) {
                updateMessage("Draw")
                this.finished = true
            }
        }
    }

    restart() {
        for (let i=0; i<9; i++) {
            document.getElementById("image" + i.toString()).src = "images/blank.png"
        }
        updateMessage("&nbsp")
        this.human.clear()
        this.computer.clear()
        this.spaces = [...Array(9).keys()]
        this.finished = false
        this.roll()
    }

    roll() {
        let x = Math.random()
        if (x < 0.5) {
            this.play(1)
        }
    }

}

function start() {
    game.restart()
}

function play(x) {
    game.play(0, x)
}

function updateMessage(m) {
    document.getElementById("message").innerHTML = m
}

function checkIn(l, x) {
    for (let i=0; i<l.length; i++) {
        if (l[i] == x) {
            return true
        }
    }
    return false
}

let game = new Game()
