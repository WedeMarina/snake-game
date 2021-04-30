// Get elements from the DOM and declare variables:
const grid = document.querySelector(".grid")
const startButton = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const message = document.getElementById("message")
const up = document.querySelector(".up")
const left = document.querySelector(".left")
const right = document.querySelector(".right")
const down = document.querySelector(".down")
const width = 20
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let fruitIndex = 0
let score = 0
let intervalTime = 1000
let appleSpeed = 0.9
let pearSpeed = 0.8
let timerId = 0


// Functions:
function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width * width; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))


function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[fruitIndex].classList.remove('apple')
    squares[fruitIndex].classList.remove('pear')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateFruit()
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
    message.style.display = "none"
}


function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        message.style.display = "block"
        return clearInterval(timerId)  
    }
    

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate new apple
        generateFruit()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * appleSpeed
        timerId = setInterval(move, intervalTime)
    } else if (squares[currentSnake[0]].classList.contains('pear')) {
        //remove the class of pear
        squares[currentSnake[0]].classList.remove('pear')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        //grow our snake array
        currentSnake.push(tail)
        //generate new apple or pear
        generateFruit()
        //add one to the score
        score +=2
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * pearSpeed
        timerId = setInterval(move, intervalTime)
    }     
}


function generateFruit() {
    do {
        fruitIndex = Math.floor(Math.random() * squares.length)
    } while (squares[fruitIndex].classList.contains('snake'))
    if (fruitIndex % 2 === 0) {
        squares[fruitIndex].classList.add('apple')
    } else {
        squares[fruitIndex].classList.add('pear')
    }   
} 
generateFruit()


// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        e.preventDefault()
        direction = 1
    } else if (e.keyCode === 38) {
        e.preventDefault()
        direction = -width
    } else if (e.keyCode === 37) {
        e.preventDefault()
        direction = -1
    } else if (e.keyCode === 40) {
        e.preventDefault()
        direction = +width
    }
}

// Make buttons and keyevents work
document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)

up.addEventListener("click", function() {
    direction = -width
})

left.addEventListener("click", function() {
    direction = -1
})

right.addEventListener("click", function() {
    direction = 1
})

down.addEventListener("click", function() {
    direction = +width
})