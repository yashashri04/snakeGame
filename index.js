console.log("hello")
let direction = { x: 0, y: 0 };
const runSound = new Audio('music/music.mp3');
const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3');
const overSound = new Audio('music/gameover.mp3');
let gameboard = document.getElementById('gameBoard');
let prevPaintTime = 0;
let speed = 2;
let snake = [
    {
        x: 10,
        y: 12
    }
];
let food = { x: 15, y: 20 };
let score=0;


//game functions
function mainFunc(ctime) {
    if ((ctime - prevPaintTime) / 1000 < 1 / speed) {
        window.requestAnimationFrame(mainFunc);
        console.log(ctime);
    }
    prevPaintTime = ctime;
    gameEngine();
}

function gameEngine() {
    //  if(isCollide(snake)){
    //      direction={x:0,y:0};
    //      alert("GameOver! press any key to continue");
    //      snake={x: 10,y: 12};
    //      score=0;
    //  }

    //updating snake and regenerating food
    if(snake[0].x == food.x && snake[0].y == food.y){
        snake.unshift({x:snake[0].x+direction.x ,y:snake[0].y+direction.y});
        let a=2;
        let b=30;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};

    }

    //moving the snake
    // for (let i = snake.length()-2; i>=0; i--) {
    //     snake[i+1]={...snake[i]}
        
    // }
    // snake[0].x+=direction.x;
    // snake[0].y+=direction.y;

    //display snake 
    gameboard.innerHTML = "";
    snake.forEach((e, index) => {
        element = document.createElement('div');
        element.style.gridRowStart = e.y;
        element.style.gridColumnStart = e.x;
        if (index === 0) {
            element.classList.add('snakeHead');
        }
        else {
            element.classList.add('snakeBody');
        }
        gameboard.appendChild(element);
    })


    //display food
    snakeFood = document.createElement('div');
    snakeFood.style.gridRowStart = food.y;
    snakeFood.style.gridColumnStart = food.x;
    snakeFood.classList.add('food');
    gameboard.appendChild(snakeFood);
}



//game logic
window.requestAnimationFrame(mainFunc)
window.addEventListener('keydown', move => {
    direction={x:0,y:1};
    switch (move.key) {
        case "ArrowDown":
            direction={x:0,y=1};
            break;

        case "ArrowUp":
            direction={x:0,y=-1};
            break;

        case "ArrowLeft":
            direction={x:-1,y=0};
            break;

        case "ArrowRight":
            direction={x:1,y=0};
            break;



        default:
            break;
    }
})