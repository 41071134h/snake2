var gameboard = document.getElementById("gameboard");
var scoreboard = document.getElementById("scoreboard");
var snake = [{x: 5, y: 5}, {x: 4, y: 5}];
var direction = "right";
var food = {x: 10, y: 10};
var score = 0;

function drawSnake() {
  var snakeElements = document.getElementsByClassName("snake");
  while (snakeElements.length > 0) {
    snakeElements[0].parentNode.removeChild(snakeElements[0]);
  }
  for (var i = 0; i < snake.length; i++) {
    var snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.left = snake[i].x * 20 + "px";
    snakeElement.style.top = snake[i].y * 20 + "px";
    gameboard.appendChild(snakeElement);
  }
}

function drawFood() {
  var foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = food.x * 20 + "px";
  foodElement.style.top = food.y * 20 + "px";
  gameboard.appendChild(foodElement);
}

  
function moveSnake() {
    var newHead = {x: snake[0].x, y: snake[0].y};
    if (direction === "right") {
      newHead.x++;
    } else if (direction === "left") {
      newHead.x--;
    } else if (direction === "up") {
      newHead.y--;
    } else if (direction === "down") {
      newHead.y++;
    }
    /*if (newHead.x < 0 || newHead.x >= boardWidth || newHead.y < 0 || newHead.y >= boardHeight) {
        gameOver();
        return;
      }*/
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
      score++;
      scoreboard.innerHTML = "得分：" + score;
      generateFood();
    } else {
      snake.pop();
    }
    drawSnake();
  }


function generateFood() {
  var x = Math.floor(Math.random() * 20);
  var y = Math.floor(Math.random() * 20);
  for (var i = 0; i < snake.length; i++) {
    if (snake[i].x === x && snake[i].y === y) {
      generateFood();
      return;
    }
  }
  food.x = x;
  food.y = y;
  var foodElement = document.getElementsByClassName("food")[0];
  foodElement.style.left = food.x * 20 + "px";
  foodElement.style.top = food.y * 20 + "px";
}

function setRandomBackground() {
    var hue = Math.floor(Math.random() * 360);
    var saturation = Math.floor(Math.random() * 25) + 75;
    var lightness = Math.floor(Math.random() * 25) + 50;
    var backgroundColor = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
    gameboard.style.background = backgroundColor;
  }
  
  setRandomBackground();
  

document.addEventListener("keydown", function(event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
});

setInterval(moveSnake, 100);

drawSnake();
drawFood();
