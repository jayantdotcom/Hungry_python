//game constent & variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSoud = new Audio('music/music.mp3');
musicSoud.volume =0.5;
let speed = 8;
let score = 0;
let hiscoreval;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
let food = {x: 6, y: 7};

//  Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

///colide function 
function isCollide(snake){
    // if you bump into yourself 
    for(let i = 1; i < snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){
    //part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSoud.pause();
        inputDir = {x: 0, y: 0};
        alert("Game over press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicSoud.play();
        score = 0;

    }

    //if you have eaten the food, increment the score and regenarate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML = 'Hiscore: ' + hiscoreval;
        }
        document.querySelector('#score').innerText = "score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())};
    }

    //Moving The snake /////////////////////////////// hard to under stand for me ...........
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i + 1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //part 2: Display the snake and Food
    //display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


//// for high score 

let highScore = localStorage.getItem('highscore');
if(highScore === null){
    hiscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval = JSON.parse(highScore);
    hiscorebox.innerHTML = 'Hiscore: ' + hiscoreval;
}


//main logic start from here 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
     inputDir = {x: 0, y: 0} //start the game
     moveSound.play();
     switch (e.key) {
        case 'ArrowUp':
            console.log('ArrawUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log('ArrawDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log('ArrawLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log('ArrawRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    
     }
})

