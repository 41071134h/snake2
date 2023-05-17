var gameboard = document.getElementById("gameboard");
var scoreboard = document.getElementById("scoreboard");
var startButton = document.getElementById("startButton");
var snake;
var direction;
var food;
var score;
var intervalId;

startButton.addEventListener("click", startGame);

function startGame() {
  clearGameboard();
  startButton.disabled = true; // 遊戲開始後禁用按鈕
  snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
  direction = "right";
  food = { x: 10, y: 10 };
  score = 0;
  scoreboard.innerHTML = "得分：" + score;
  intervalId = setInterval(moveSnake, 100); // 開始移動貪吃蛇
  drawSnake();
  drawFood();
}

function clearGameboard() {
  while (gameboard.firstChild) {
    gameboard.removeChild(gameboard.firstChild);
  }
}



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
  var newHead = { x: snake[0].x, y: snake[0].y };
  if (direction === "right") {
    newHead.x++;
  } else if (direction === "left") {
    newHead.x--;
  } else if (direction === "up") {
    newHead.y--;
  } else if (direction === "down") {
    newHead.y++;
  }
  if (isCollision(newHead) || isOutOfBounds(newHead)) {
    gameOver();
    return;
  }
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
      return generateFood(); // 避免食物生成在貪吃蛇身體上
    }
  }
  food.x = x;
  food.y = y;
  var foodElement = document.getElementsByClassName("food")[0];
  foodElement.style.left = food.x * 20 + "px";
  foodElement.style.top = food.y * 20 + "px";
}

function isCollision(position) {
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x === position.x && snake[i].y === position.y) {
      return true; // 碰撞檢查
    }
  }
  return false;
}

function isOutOfBounds(position) {
  return (
    position.x < 0 ||
    position.x >= gameboard.clientWidth / 20 ||
    position.y < 0 ||
    position.y >= gameboard.clientHeight / 20
  );
}

function gameOver() {
  clearInterval(intervalId); // 停止遊戲循環
  startButton.disabled = false; // 允許重新開始遊戲
  alert("遊戲結束！得分：" + score);
}

document.addEventListener("keydown", function (event) {
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
