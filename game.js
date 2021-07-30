
let direction = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3');
const overSound = new Audio('music/gameover.mp3');
let gameboard = document.getElementById('gameBoard');
let prevPaintTime = 0;
let speed = 10;
let snake = [
    {x: 13,y: 15}
];
let food = { x: 6, y: 7 };
let score=0;
let highScore=0;

//game functions
function mainFunc(ctime) {
    window.requestAnimationFrame(mainFunc);
    if ((ctime - prevPaintTime) / 1000 < 1 / speed) {
        return;
        // console.log(ctime);
    }
    prevPaintTime = ctime;
    gameEngine();
}

//function for collision
function isCollide(snake){
    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            return true;
        }       
    }
    if((snake[0].x>=18 || snake[0].x<=0) || (snake[0].y>=18 || snake[0].y<=0) ){
        return true;
    }
}


function gameEngine() {
     if(isCollide(snake)){
         overSound.play();
         direction={x:0,y:0};
        //  swal("GameOver! press any key to continue");
        swal({
            title: "Game Over!",
            text: `Your score is ${score}. Press key to continue`,
            icon: "/images/snakeIcon.png",
            button: "Play again"
          });
         snake=[{x: 10,y: 12}];
         score=0;
         document.getElementById('score').innerText=`Score : ${score}`;
     }

    //updating snake and regenerating food
    if(snake[0].x == food.x && snake[0].y == food.y){
        foodSound.play();
        score+=1;
        document.getElementById('score').innerText=`Score : ${score}`;
        if(score>highScore){
            highScore+=1;
            document.getElementById('highScore').innerText=`HighScore : ${highScore}`
        }
        snake.unshift({x:snake[0].x+direction.x ,y:snake[0].y+direction.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
        
        

    }

    //moving the snake
    for (let i = snake.length-2; i>=0; i--) {
        snake[i+1]={...snake[i]}
        
    }
    snake[0].x+=direction.x;
    snake[0].y+=direction.y;

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
window.requestAnimationFrame(mainFunc);
window.addEventListener('keydown', move => {
    moveSound.play();
    direction={x:0,y:1};
    switch (move.key) {
        case "ArrowDown":
            direction.x=0;
            direction.y=1;
            break;

        case "ArrowUp":
            direction.x=0;
            direction.y=-1;
            break;

        case "ArrowLeft":
            direction.x=-1;
            direction.y=0;
            break;

        case "ArrowRight":
            direction.x=1;
            direction.y=0;
            break;



        default:
            break;
    }
})