class Ball extends Shape {
    constructor(x, y, velX, velY, color, size, exists) {
        super(x, y, velX, velY, exists)
        this.color = color
        this.size = size
    }
    draw() {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        ctx.fill()
    }
    update() {

        if ( (this.x + this.size) >= width) {
            this.velX = -(this.velX)
            this.x = width - this.size*1.2
        }

        else if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX)
            this.x = this.size*1.2
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY)
            this.y = height - this.size*1.2
        }
        else if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY)
            this.y = this.size*1.2
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
                    balls[j].velX = -balls[j].velX
                    balls[j].velY = -balls[j].velY
                    return true
                }
            }
        }
    }
}

// Ball.count = 0
// Ball.miss = 0

Ball.countBalls = function() {
    let count = balls.reduce((acc, ball) => {
        if (ball.exists) return acc += 1
        else return acc += 0
    }, 0)
    return count
}

Ball.mouseCollision = function() {
    let miss = true
  
    for (let i = 0; i < balls.length; i++) {
        let distX = balls[i].x - mouseX
        let distY = balls[i].y - mouseY
        let distance = Math.sqrt(distX*distX + distY*distY)

        if (distance < balls[i].size) {
            mouseX = undefined
            mouseY = undefined
            balls[i].exists = false
            miss = false
        }
    }

    if (miss) ++Ball.miss
}