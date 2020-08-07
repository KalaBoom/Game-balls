const btnStart = document.getElementById('btnStart')
const btnRestart = document.getElementById('btnRestart')

function startGame() {
    Ball.count = 1
    Ball.miss = 0
    balls = []
    canvas.classList.remove('no-display')
    fullBalls()
    loop()
    showInfo()
}

btnStart.addEventListener('mousedown', e => {
    const start = document.getElementById('start')
    start.classList.add('no-display')
    startGame()
})

btnRestart.addEventListener('mousedown', e => {
    const end = document.getElementById('end')
    end.classList.add('no-display')
    startGame()
})