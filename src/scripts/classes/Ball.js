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
            if ( !(this === balls[j]) && balls[j].exists ) {
                let dx = this.x - balls[j].x
                let dy = this.y - balls[j].y
                let distance = Math.sqrt(dx*dx + dy*dy)

                if (distance < this.size + balls[j].size) {
                    this.velX = -this.velX
                    this.velY = -this.velY
                }
            }
        }
    }
    mouseCollision() {
        for (let i = 0; i < balls.length; i++) {
            let distX = this.x - mouseX
            let distY = this.y - mouseY
            let distance = Math.sqrt(distX*distX + distY*distY)

            if (distance < this.size) {
                console.log(`DistX ${distX} DistY ${distY}`)
                console.log(`MouseX ${mouseX} MouseY ${mouseY}`)
                mouseX = undefined
                mouseY = undefined
                this.exists = false
                showCount()
            }
        }
    }
}

Ball.count = 10
Ball.countBalls = function() {
    let count = balls.reduce((acc, ball) => {
        if (ball.exists) return acc += 1
        else return acc += 0
    }, 0)
    return count
}