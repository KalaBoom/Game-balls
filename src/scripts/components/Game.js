const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let game = true

let width, height, mouseX, mouseY

function random(min,max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function init() {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
}

init()

window.addEventListener('resize', init)
canvas.addEventListener('mousedown', e => {
    mouseX = e.clientX
    mouseY = e.clientY
    Ball.mouseCollision()
    showInfo()
})

let balls = []

function fullBalls() {
    while (balls.length < Ball.count) {
        let ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7,7),
            random(-7,7),
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')', 
            random(20,30),
            true
        )
        if (!ball.collisionDetect()) balls.push(ball)
    }
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)'
    ctx.fillRect(0,0,width, height)
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw()
            balls[i].update()
            balls[i].collisionDetect()
        }
    }
    
    if (Ball.countBalls() === 0) {
        cancelAnimationFrame(loop)
        showEnd()
    } else {
        requestAnimationFrame(loop)
    }
}

function showInfo() {
    const infoCount = document.getElementById('count')
    const infoMiss  = document.getElementById('miss')

    infoCount.textContent = Ball.countBalls()
    infoMiss.textContent = Ball.miss
}

function showEnd() {
    const end = document.getElementById('end')
    const infoMiss = document.getElementById('countMiss')

    end.classList.remove('no-display')
    canvas.classList.add('no-display')
    infoMiss.textContent = Ball.miss
}