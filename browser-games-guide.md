# Браузерные игры - Полное руководство

## Что такое браузерные игры?

Браузерные игры - это игры, которые запускаются прямо в веб-браузере без необходимости установки. Они работают на технологиях HTML5, JavaScript, WebGL и CSS.

## Преимущества браузерных игр

### ✅ Плюсы:
- **Не требуют установки** - играть можно сразу
- **Кроссплатформенность** - работают на Windows, Mac, Linux, Android, iOS
- **Легко делиться** - просто отправить ссылку
- **Автоматические обновления** - пользователь всегда играет в последнюю версию
- **Низкий порог входа** - любой может открыть и поиграть
- **Простая разработка** - не нужны сложные инструменты
- **Бесплатные хостинги** - GitHub Pages, Netlify, Vercel

### ❌ Минусы:
- Ограниченная производительность (но HTML5 очень быстрый)
- Зависимость от браузера
- Ограниченный доступ к системным ресурсам
- Сложнее работать с большими 3D-играми

## Технологии для браузерных игр

### 1. HTML5 Canvas

Основа для 2D-графики в браузере.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Canvas игра</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #222;
        }
        canvas {
            border: 2px solid #fff;
            background: #000;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <script src="game.js"></script>
</body>
</html>
```

### 2. JavaScript (ES6+)

Современный JavaScript для игровой логики.

**Пример: Простая игра "Змейка"**

```javascript
// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Настройки
const GRID_SIZE = 20;
const TILE_SIZE = 20;

// Змейка
let snake = [
    {x: 10, y: 10},
    {x: 9, y: 10},
    {x: 8, y: 10}
];
let direction = {x: 1, y: 0};
let food = {x: 15, y: 15};
let score = 0;
let gameSpeed = 150;
let lastTime = 0;

// Управление
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

function update() {
    // Новая позиция головы
    const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    // Проверка столкновений со стенами
    if (head.x < 0 || head.x >= canvas.width / TILE_SIZE ||
        head.y < 0 || head.y >= canvas.height / TILE_SIZE) {
        resetGame();
        return;
    }

    // Проверка столкновения с собой
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Проверка поедания еды
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / TILE_SIZE)),
        y: Math.floor(Math.random() * (canvas.height / TILE_SIZE))
    };
}

function draw() {
    // Очистка экрана
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Рисуем сетку
    ctx.strokeStyle = '#111';
    for (let i = 0; i < canvas.width / TILE_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * TILE_SIZE, 0);
        ctx.lineTo(i * TILE_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i < canvas.height / TILE_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * TILE_SIZE);
        ctx.lineTo(canvas.width, i * TILE_SIZE);
        ctx.stroke();
    }

    // Рисуем змейку
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#0f0' : '#0a0';
        ctx.fillRect(
            segment.x * TILE_SIZE + 1,
            segment.y * TILE_SIZE + 1,
            TILE_SIZE - 2,
            TILE_SIZE - 2
        );
    });

    // Рисуем еду
    ctx.fillStyle = '#f00';
    ctx.fillRect(
        food.x * TILE_SIZE + 1,
        food.y * TILE_SIZE + 1,
        TILE_SIZE - 2,
        TILE_SIZE - 2
    );

    // Счет
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText(`Счет: ${score}`, 10, 25);
}

function resetGame() {
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    direction = {x: 1, y: 0};
    score = 0;
    spawnFood();
}

function gameLoop(currentTime) {
    requestAnimationFrame(gameLoop);

    const deltaTime = currentTime - lastTime;

    if (deltaTime > gameSpeed) {
        lastTime = currentTime;
        update();
        draw();
    }
}

// Запуск игры
gameLoop(0);
```

### 3. WebGL

Для 3D-графики и сложных эффектов.

```javascript
// Базовая настройка WebGL
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert('WebGL не поддерживается!');
}

// Очистка экрана
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
```

## Популярные библиотеки и фреймворки

### 1. Phaser (самая популярная)

**Установка:**
```html
<script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>
```

**Пример игры:**
```javascript
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let platforms;

function preload() {
    // Загрузка ассетов
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude', 'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    // Фон
    this.add.image(400, 300, 'sky');

    // Платформы
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Игрок
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Анимация
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Физика
    this.physics.add.collider(player, platforms);

    // Управление
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}
```

### 2. Three.js (для 3D-игр)

```javascript
import * as THREE from 'three';

// Сцена
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// Рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Куб
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Анимация
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
```

### 3. PixiJS (быстрая 2D-графика)

```javascript
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb
});

document.body.appendChild(app.view);

// Спрайт
const bunny = PIXI.Sprite.from('assets/bunny.png');
bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;
app.stage.addChild(bunny);

// Анимация
app.ticker.add((delta) => {
    bunny.rotation += 0.1 * delta;
});
```

### 4. Babylon.js (3D движок)

```javascript
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera(
        'camera',
        0, 0, 10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
    );

    const sphere = BABYLON.MeshBuilder.CreateSphere(
        'sphere',
        {diameter: 2},
        scene
    );

    return scene;
};

const scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
});
```

### 5. Kontra.js (минималистичная библиотека)

```javascript
import { init, GameLoop, Sprite } from 'kontra';

let { canvas } = init();

let sprite = Sprite({
    x: 100,
    y: 100,
    color: 'red',
    width: 20,
    height: 40,
    dx: 2
});

let loop = GameLoop({
    update: function() {
        sprite.update();

        if (sprite.x > canvas.width) {
            sprite.x = -sprite.width;
        }
    },
    render: function() {
        sprite.render();
    }
});

loop.start();
```

## Примеры популярных браузерных игр

### Известные игры:
- **Agar.io** - многопользовательская игра про клетки
- **Slither.io** - змейка онлайн
- **Krunker.io** - FPS-шутер
- **Skribbl.io** - игра в рисование
- **2048** - головоломка
- **Cookie Clicker** - кликер
- **Little Alchemy** - игра в создание элементов
- **Wordle** - словесная головоломка

### HTML5 игры в Steam:
Даже некоторые игры в Steam сделаны на HTML5/JavaScript (обернутые в Electron).

## Полная игра: Arkanoid/Breakout

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Arkanoid</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #222;
            font-family: Arial, sans-serif;
        }
        #gameContainer {
            text-align: center;
        }
        canvas {
            border: 2px solid #fff;
            background: #000;
        }
        #score {
            color: #fff;
            font-size: 24px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div id="gameContainer">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div id="score">Счет: 0 | Жизни: 3</div>
    </div>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');

        // Настройки
        const PADDLE_WIDTH = 100;
        const PADDLE_HEIGHT = 20;
        const BALL_RADIUS = 8;
        const BRICK_ROWS = 5;
        const BRICK_COLS = 10;
        const BRICK_WIDTH = 75;
        const BRICK_HEIGHT = 20;
        const BRICK_PADDING = 5;
        const BRICK_OFFSET_TOP = 50;
        const BRICK_OFFSET_LEFT = 35;

        // Игровые объекты
        let paddle = {
            x: canvas.width / 2 - PADDLE_WIDTH / 2,
            y: canvas.height - 40,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            dx: 0
        };

        let ball = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: BALL_RADIUS,
            dx: 4,
            dy: -4
        };

        let bricks = [];
        let score = 0;
        let lives = 3;
        let rightPressed = false;
        let leftPressed = false;

        // Цвета для кирпичей
        const brickColors = ['#e74c3c', '#e67e22', '#f39c12', '#2ecc71', '#3498db'];

        // Создание кирпичей
        for (let row = 0; row < BRICK_ROWS; row++) {
            bricks[row] = [];
            for (let col = 0; col < BRICK_COLS; col++) {
                bricks[row][col] = {
                    x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT,
                    y: row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
                    status: 1,
                    color: brickColors[row]
                };
            }
        }

        // Управление
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'd') rightPressed = true;
            if (e.key === 'ArrowLeft' || e.key === 'a') leftPressed = true;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'd') rightPressed = false;
            if (e.key === 'ArrowLeft' || e.key === 'a') leftPressed = false;
        });

        // Управление мышью
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            paddle.x = mouseX - paddle.width / 2;
            if (paddle.x < 0) paddle.x = 0;
            if (paddle.x + paddle.width > canvas.width) {
                paddle.x = canvas.width - paddle.width;
            }
        });

        function drawPaddle() {
            ctx.fillStyle = '#fff';
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }

        function drawBall() {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            for (let row = 0; row < BRICK_ROWS; row++) {
                for (let col = 0; col < BRICK_COLS; col++) {
                    const brick = bricks[row][col];
                    if (brick.status === 1) {
                        ctx.fillStyle = brick.color;
                        ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
                        ctx.strokeStyle = '#000';
                        ctx.strokeRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT);
                    }
                }
            }
        }

        function collisionDetection() {
            for (let row = 0; row < BRICK_ROWS; row++) {
                for (let col = 0; col < BRICK_COLS; col++) {
                    const brick = bricks[row][col];
                    if (brick.status === 1) {
                        if (ball.x + ball.radius > brick.x &&
                            ball.x - ball.radius < brick.x + BRICK_WIDTH &&
                            ball.y + ball.radius > brick.y &&
                            ball.y - ball.radius < brick.y + BRICK_HEIGHT) {
                            ball.dy = -ball.dy;
                            brick.status = 0;
                            score += 10;
                            updateScore();

                            // Проверка победы
                            if (score === BRICK_ROWS * BRICK_COLS * 10) {
                                alert('Поздравляем! Вы победили!');
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        }

        function updateScore() {
            scoreDisplay.textContent = `Счет: ${score} | Жизни: ${lives}`;
        }

        function update() {
            // Движение платформы
            if (rightPressed && paddle.x < canvas.width - paddle.width) {
                paddle.x += 7;
            }
            if (leftPressed && paddle.x > 0) {
                paddle.x -= 7;
            }

            // Движение мяча
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Отскок от стен
            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx = -ball.dx;
            }
            if (ball.y - ball.radius < 0) {
                ball.dy = -ball.dy;
            }

            // Отскок от платформы
            if (ball.y + ball.radius > paddle.y &&
                ball.x > paddle.x &&
                ball.x < paddle.x + paddle.width) {
                // Изменение угла отскока в зависимости от места удара
                const hitPos = (ball.x - paddle.x) / paddle.width;
                ball.dx = (hitPos - 0.5) * 8;
                ball.dy = -Math.abs(ball.dy);
            }

            // Потеря жизни
            if (ball.y + ball.radius > canvas.height) {
                lives--;
                updateScore();
                if (lives === 0) {
                    alert('Игра окончена! Ваш счет: ' + score);
                    document.location.reload();
                } else {
                    ball.x = canvas.width / 2;
                    ball.y = canvas.height / 2;
                    ball.dx = 4;
                    ball.dy = -4;
                }
            }

            collisionDetection();
        }

        function draw() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            drawBricks();
            drawPaddle();
            drawBall();
        }

        function gameLoop() {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    </script>
</body>
</html>
```

## Работа со звуком

```javascript
// Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Загрузка звука
async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
}

// Воспроизведение
function playSound(audioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
}

// Простой способ через HTML Audio
const jumpSound = new Audio('sounds/jump.mp3');
jumpSound.play();
```

## Сохранение данных

```javascript
// LocalStorage
function saveGame() {
    const gameState = {
        score: score,
        level: level,
        playerPosition: player.position
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// IndexedDB для больших данных
const request = indexedDB.open('GameDB', 1);

request.onsuccess = (event) => {
    const db = event.target.result;
    // Работа с базой данных
};
```

## Мобильная адаптация

```javascript
// Определение тач-событий
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    // Обработка касания
});

// Адаптивный размер canvas
function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    ctx.scale(ratio, ratio);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Виртуальный джойстик
class VirtualJoystick {
    constructor(canvas) {
        this.canvas = canvas;
        this.active = false;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;

        canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.startX = this.currentX = touch.clientX;
            this.startY = this.currentY = touch.clientY;
            this.active = true;
        });

        canvas.addEventListener('touchmove', (e) => {
            if (this.active) {
                const touch = e.touches[0];
                this.currentX = touch.clientX;
                this.currentY = touch.clientY;
            }
        });

        canvas.addEventListener('touchend', () => {
            this.active = false;
        });
    }

    getDirection() {
        if (!this.active) return {x: 0, y: 0};

        const dx = this.currentX - this.startX;
        const dy = this.currentY - this.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 10) return {x: 0, y: 0};

        return {
            x: dx / distance,
            y: dy / distance
        };
    }
}
```

## Публикация браузерной игры

### 1. GitHub Pages (бесплатно)
```bash
# Создать репозиторий на GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/game.git
git push -u origin main

# Включить GitHub Pages в настройках репозитория
# Игра будет доступна по адресу: username.github.io/game
```

### 2. Netlify (бесплатно)
- Перетащите папку с игрой на netlify.com
- Или подключите GitHub репозиторий
- Игра сразу доступна онлайн

### 3. Vercel (бесплатно)
```bash
npm install -g vercel
vercel
```

### 4. itch.io (для инди-игр)
- Загрузите ZIP с HTML файлами
- Отметьте "This file will be played in the browser"
- Игра доступна на вашей странице itch.io

### 5. Собственный хостинг
- Любой веб-хостинг поддерживает HTML5 игры
- Просто загрузите файлы через FTP

## Оптимизация производительности

```javascript
// 1. Используйте requestAnimationFrame
function gameLoop(timestamp) {
    update(timestamp);
    render();
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

// 2. Объектные пулы (избегайте создания новых объектов)
class ObjectPool {
    constructor(createFunc, resetFunc) {
        this.pool = [];
        this.create = createFunc;
        this.reset = resetFunc;
    }

    get() {
        return this.pool.pop() || this.create();
    }

    release(obj) {
        this.reset(obj);
        this.pool.push(obj);
    }
}

// 3. Отрисовка только видимых объектов
function isVisible(obj, camera) {
    return obj.x + obj.width > camera.x &&
           obj.x < camera.x + camera.width &&
           obj.y + obj.height > camera.y &&
           obj.y < camera.y + camera.height;
}

// 4. Используйте OffscreenCanvas для фоновой отрисовки
const offscreen = new OffscreenCanvas(800, 600);
const offscreenCtx = offscreen.getContext('2d');

// 5. Кэширование сложных отрисовок
const cachedImage = document.createElement('canvas');
const cacheCtx = cachedImage.getContext('2d');
// Отрисовать один раз
// Потом использовать: ctx.drawImage(cachedImage, x, y);
```

## Полезные инструменты

### Графика:
- **Piskel** - пиксельная графика онлайн
- **Aseprite** - платный редактор пиксельной графики
- **GIMP** - бесплатный графический редактор
- **Inkscape** - векторная графика

### Звук:
- **Bfxr** - генератор игровых звуков
- **Audacity** - редактирование аудио
- **Freesound.org** - бесплатные звуки

### Карты уровней:
- **Tiled** - редактор тайловых карт
- **LDtk** - современный редактор уровней

### Шрифты:
- **Google Fonts** - бесплатные шрифты
- **Font Squirrel** - игровые шрифты

## Монетизация

1. **Реклама** - AdSense, Unity Ads
2. **Покупки в игре** - через Stripe, PayPal
3. **Премиум версия** - itch.io, Steam (через Electron)
4. **Пожертвования** - Patreon, Ko-fi
5. **Спонсорство** - CrazyGames, Poki, Kongregate

## Заключение

Браузерные игры - отличный способ начать разработку игр:
- ✅ Не требуют сложных инструментов
- ✅ Легко тестировать и делиться
- ✅ Работают везде
- ✅ Можно быстро получить результат
- ✅ Бесплатный хостинг

**Начните прямо сейчас!** Скопируйте любой пример из этого документа, сохраните как HTML файл и откройте в браузере - игра заработает немедленно!

## Дополнительные ресурсы

- **MDN Web Docs** - документация по Canvas, WebGL
- **HTML5 Game Devs** - сообщество разработчиков
- **Phaser.io** - документация Phaser
- **Three.js Journey** - курс по Three.js
- **GitHub Game Off** - ежегодный джем по созданию браузерных игр
