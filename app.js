let grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 10]
let currentPosition = userStart
let boardWidth = 560
const boardheight = 300
const ballStart = [270, 40]
let ballCurrentPosition = ballStart
let timerId
const ballDiameter = 20
let xdirection = -2
let ydirection = 2
let score = 0

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
        this.topLeft = [xAxis, yAxis + blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw my blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
        console.log(blocks[i].bottomLeft)
    }
}
addBlocks()

// creating user

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)



// draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}
// draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + "px"
    ball.style.bottom = ballCurrentPosition[1] + "px"
}



// move user 
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// add ball 
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

// move the ball

function moveBall() {
    ballCurrentPosition[0] += xdirection
    ballCurrentPosition[1] += ydirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)


// check foe collisions

function checkForCollisions() {


    // check for block collision 
    for (let i = 0; i < blocks.length; i++) {
        if ((ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])) {

            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++
            scoreDisplay.innerHTML = score
        }

    }
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardheight - ballDiameter) || ballCurrentPosition[0] <= 0) {
        changeDirection()
    }
    //  check for game over
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = "You lose"
        document.removeEventListener('keydown', moveUser)


    }
}



function changeDirection() {
    if (xdirection === 2 && ydirection === 2) {
        ydirection = -2
        return
    }
    if (xdirection === 2 && ydirection === -2) {
        xdirection = -2
        return
    }
    if (xdirection === -2 && ydirection === -2) {
        ydirection = 2
        return
    }
    if (xdirection === -2 && ydirection === 2) {
        xdirection = 2
        return
    }
}
