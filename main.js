let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 558;
canvas.height = 568;
document.body.appendChild(canvas);
// document.getElementById("one_container").appendChild(canvas);

let backgroundImg, spaceshipImage, bulletImage, enemyImage, gameoverImage;
let gameOver = false;
let score = 0;

// 우주선좌표
let spaceshipX = canvas.width / 2 - 50;
let spaceshipY = canvas.height - 80;

function Bullet() {
    this.x = 0;
    this.y = 0;
    this.alive = true;
    this.init = function(){
        this.x = spaceshipX + 28;
        this.y = spaceshipY;
        bulletList.push(this);
    }
    this.update = function(){
        this.y -= 7;

        for(let i=0; i<bulletList.length; i++){
            if( bulletList[i].y >= canvas.height - 24) {
                bulletList.splice(i, 1);
            }
        }
    }
    this.checkHit = function() {
        for(let i=0; i<enemyList.length; i++){
            if( this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+64) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    }
}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum;
}

let enemyList = [];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x=generateRandomValue(0, canvas.width-64);
        enemyList.push(this);
    }
    this.update = function(){
        this.y += 1;

        if( this.y >= canvas.height - 64) {
            gameOver = true;
        }
    }
}

function loadImage() {
    backgroundImg = new Image();
    backgroundImg.src = "images/background.png";
    
    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.png";
}

let keysDown = {}
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){
        keysDown[event.keyCode] = true;
    });
    document.addEventListener("keyup", function(event){
        delete keysDown[event.keyCode];
        if(event.keyCode == 32) {
            createBullet();
        }
    });
}

let bulletList = [];
function createBullet() {
    let b = new Bullet();
    b.init();
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
}

function update() {
    if( 39 in keysDown) {
        spaceshipX += 10;
    }
    if( 37 in keysDown) {
        spaceshipX -= 10;
    }

    if( spaceshipX <= 0) {
        spaceshipX = 0;
    }

    if( spaceshipX >= canvas.width - 80) {
        spaceshipX = canvas.width - 80
    }
    if( spaceshipY >= canvas.width) {
        spaceshipY = canvas.width
    }

    for(let i=0; i<bulletList.length; i++) {
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }

    for(let i=0; i<enemyList.length; i++) {
        enemyList[i].update();
    }

}

function render() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score : ${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for(let i=0; i<bulletList.length; i++) {
        if( bulletList[i].alive ) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for(let i=0; i<enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main(){
    if( gameOver == false ) {
        update();
        render();
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameoverImage, 220, 220, 100, 100);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();