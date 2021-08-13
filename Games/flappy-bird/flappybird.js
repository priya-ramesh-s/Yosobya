document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const startBtn = document.querySelector("#startBtn")

    startBtn.addEventListener("click", newGame);

    function newGame() {
    startBtn.style.display = "none"
    let birdLeft = 500
    let birdBottom = 200
    let gravity = 2
    let isGameOver = false
    let gap = 430

    

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }

    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }


    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }

    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 1000
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap  +'px'
        
        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)

            }

            if (
                obstacleLeft > 480 && obstacleLeft < 540 && birdLeft === 500 && 
                (birdBottom < obstacleBottom + 152|| birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0) {
                gameOver()
                clearInterval(timerId)
                gameDisplay.removeChild(topObstacle)
                gameDisplay.removeChild(obstacle)
                
            }
        }

        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
    }

    generateObstacle()


    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)

        startBtn.style.display = "inline-block"

    }
}})