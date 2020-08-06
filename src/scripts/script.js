const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

function random(min,max) {
    return Math.floor(Math.random() * (max-min) + min)
}

class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x
        this.y = y
        this.velX = velX
        this.velY = velY
        this.exists = exists
    }
}

class Ball extends Shape {
    constructor(x, y, velX, velY, color, size, exists) {
        super(x, y, velX, velY, exists)
        this.color = color
        this.size = size
    }
    //static count = 20
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
    }
    update() {
        if ( ((this.x + this.size) >= width) || ((this.x - this.size) <= 0)) {
            this.velX = -(this.velX)
        }
        if ( ((this.y + this.size) >= height) || ((this.y - this.size) <= 0)) {
            this.velY = -(this.velY)
        }

        this.x += this.velX
        this.y += this.velY
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if ( !(this === balls[j]) ) {
                let dx = this.x - balls[j].x
                let dy = this.y - balls[j].y
                let distance = Math.sqrt(dx*dx + dy*dy)

                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')'
                }
            }
        }
    }
}

Ball.count = 20

class EvilCircle extends Shape {
    constructor(x, y, exists) {
        super(x,y,20,20, exists)
        this.color = 'White'
        this.size = 10
    }
    draw() {
        ctx.beginPath()
        ctx.lineWidth = 3
        ctx.strokeStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.stroke()
    }
    checkBounds() {
        if ( (this.x + this.size) >= width ) {
            this.x = width - this.velX
        } else if ( (this.x - this.size) <= 0) {
            this.x = 0 + this.velX
        }

        if ( (this.y + this.size) >= height ) {
            this.y = height
        } else if ( (this.y - this.size) <= 0 ) {
            this.y = 0
        }
    }
    setControls() {
        window.onkeydown = e => {
            if (e.keyCode === 65) {
                this.x -= this.velX
            } else if (e.keyCode === 68) {
                this.x += this.velX
            } else if (e.keyCode == 87) {
                this.y -= this.velY
            } else if (e.keyCode === 83) {
                this.y += this.velY
            }
        }
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            let dx = this.x - balls[j].x
            let dy = this.y - balls[j].y
            let distance = Math.sqrt(dx*dx + dy*dy)

            if ( (distance < this.size + balls[j].size) && (balls[j].exists === true) ) {
                balls[j].exists = false
                Ball.count--
                paragraph[0].textContent = `${textParagraph} ${Ball.count}`
            }
        }
    }
}

let balls = [];

let evilCicle = new EvilCircle(
    random(0,width), 
    random(0, height),
    true
)

let paragraph = document.getElementsByTagName('p')
let textParagraph = paragraph[0].textContent

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.fillRect(0,0,width, height)
    
    

    while (balls.length < Ball.count) {
        let ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7,7),
            random(-7,7),
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')', 
            random(10,20),
            true
        )
        balls.push(ball)
    }

    for( let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw()
            balls[i].update()
            balls[i].collisionDetect()
        }
       
        evilCicle.draw()
        evilCicle.checkBounds()
        evilCicle.setControls()
        evilCicle.collisionDetect()
    }

    requestAnimationFrame(loop)
}

paragraph[0].textContent = paragraph[0].textContent + Ball.count
loop()