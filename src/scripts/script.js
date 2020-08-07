const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

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
})

let balls = []



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
            random(20,30),
            true
        )
        balls.push(ball)
    }

    for( let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw()
            balls[i].update()
            balls[i].collisionDetect()
            balls[i].mouseCollision()
        }
    }
    
    requestAnimationFrame(loop)
}

let paragraph = document.getElementsByTagName('p')
let textParagraph = paragraph[0].textContent

function showCount() {
    paragraph[0].textContent = textParagraph + Ball.countBalls()
}


loop()
showCount()