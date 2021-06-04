// variables
let snakeDirection = { x: 0, y: 0 };
const foodSound = new Audio('sounds/food-Sound.mp3');
const moveSound = new Audio('sounds/snake-move.mp3');
const backgroundSound = new Audio('sounds/snake-background-sound.mp3');
const gameOverSound = new Audio('sounds/game_over_tune.mp3');
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let snakeArr = [
    { x: 9, y: 10 }
]
let food = { x: 6, y: 7 };

//game level function 

function fun1()
{
    if(easy.checked == true)
    {
        speed = 7;
    }
    if(medium.checked == true)
    {
        speed = 14;
    }
    if(hard.checked == true)
    {
        speed = 25;
    }
}

// functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}
function isColide(snake) 
{   
    
    // colide with body
    for (let i = 1; i < snake.length; i++) 
    {
        if ((snake[i].x === snake[0].x) && (snake[i].y === snake[0].y)) 
        {   
            
            return true;
        }
    }


    // colide with wall
    if ((snake[0].x <= 0 || snake[0].x >= 25) || (snake[0].y <= 0 || snake[0].y >= 25))
    {   
        
        return true;
    }
    else
    {
        return false;
    }
}

function gameEngine() {
   
    //updating the snake array
    if (isColide(snakeArr)) 
    {   
        backgroundSound.pause();
        gameOverSound.play();
        
        snakeDirection = { x: 0, y: 0 };
        
        snakeArr = { x: 9, y: 10 };
        setTimeout(function() {
            alert("Game over...\n\n Your High Score is "+score);
            score = 0;  
          }, 1000);
        
        setTimeout(()=>{

            location.reload();
        },1000);
        
       
        
    }

    //if food is eaten by the snake
    if (snakeArr[0].x === food.x && snakeArr[0].y == food.y) 
    {   
        score += 1;
        if(score%2 == 0)
        {
            speed += 1 
        }
        scoreBoard.innerHTML = "&nbsp&nbsp Score : " + score;
        backgroundSound.pause();
        foodSound.play();
        backgroundSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + snakeDirection.x, y: snakeArr[0].y + snakeDirection.y })
        let a = 2;
        let b = 23;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //moving the snake
    
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += snakeDirection.x;
    snakeArr[0].y += snakeDirection.y;

    
    // display snake and food

    //displaying snake
    box.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake-body');
        }
        box.appendChild(snakeElement);
    })

    // displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);

}

//logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    snakeDirection = { x: 0, y: 1 }; //start game
    switch (e.key) {
        case 'ArrowUp':
            moveSound.play();
            snakeDirection.x = 0;
            snakeDirection.y = -1;
            break;
        case 'ArrowDown':
            moveSound.play();
            snakeDirection.x = 0;
            snakeDirection.y = 1;
            break;
        case 'ArrowLeft':
            moveSound.play();
            snakeDirection.x = -1;
            snakeDirection.y = 0;
            break;
        case 'ArrowRight':
            moveSound.play();
            snakeDirection.x = 1;
            snakeDirection.y = 0;
            break;
    }
})