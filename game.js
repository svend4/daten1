// Получаем элементы
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const livesElement = document.getElementById('lives');
const gameOverDiv = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const finalHighScoreElement = document.getElementById('finalHighScore');
const restartBtn = document.getElementById('restartBtn');

// Игровые переменные
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let lives = 3;
let gameRunning = true;
let paused = false;
let animationId;

// Обновляем начальный рекорд
highScoreElement.textContent = highScore;

// Игрок
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 80,
    width: 50,
    height: 50,
    speed: 7,
    dx: 0
};

// Массивы для игровых объектов
let bullets = [];
let asteroids = [];
let particles = [];

// Клавиши
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
    KeyP: false
};

// Класс пули
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 15;
        this.speed = 8;
        this.color = '#00ff00';
    }

    update() {
        this.y -= this.speed;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Свечение
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }

    isOffScreen() {
        return this.y < 0;
    }
}

// Класс астероида
class Asteroid {
    constructor() {
        this.x = Math.random() * (canvas.width - 40);
        this.y = -40;
        this.width = 40;
        this.height = 40;
        this.speed = Math.random() * 2 + 2;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
        this.y += this.speed;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);

        // Рисуем астероид как многоугольник
        ctx.beginPath();
        const points = 8;
        for (let i = 0; i < points; i++) {
            const angle = (Math.PI * 2 * i) / points;
            const radius = this.width / 2 + Math.random() * 5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.fillStyle = '#8B4513';
        ctx.fill();
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
    }

    isOffScreen() {
        return this.y > canvas.height;
    }
}

// Класс частицы для взрыва
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.life = 30;
        this.color = `hsl(${Math.random() * 60 + 15}, 100%, 50%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;
        this.size *= 0.95;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isDead() {
        return this.life <= 0;
    }
}

// Создание взрыва
function createExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y));
    }
}

// Рисование игрока
function drawPlayer() {
    ctx.save();
    ctx.translate(player.x + player.width / 2, player.y + player.height / 2);

    // Корпус корабля
    ctx.beginPath();
    ctx.moveTo(0, -player.height / 2);
    ctx.lineTo(player.width / 2, player.height / 2);
    ctx.lineTo(0, player.height / 3);
    ctx.lineTo(-player.width / 2, player.height / 2);
    ctx.closePath();

    ctx.fillStyle = '#4169E1';
    ctx.fill();
    ctx.strokeStyle = '#1E90FF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Кабина
    ctx.beginPath();
    ctx.arc(0, 0, player.width / 5, 0, Math.PI * 2);
    ctx.fillStyle = '#00FFFF';
    ctx.fill();

    // Двигатели
    if (Math.random() > 0.5) {
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(-player.width / 4, player.height / 3, player.width / 8, player.height / 6);
        ctx.fillRect(player.width / 8, player.height / 3, player.width / 8, player.height / 6);
    }

    ctx.restore();
}

// Обновление игрока
function updatePlayer() {
    player.x += player.dx;

    // Границы экрана
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Стрельба
function shoot() {
    bullets.push(new Bullet(player.x + player.width / 2 - 2, player.y));
}

// Создание астероида
function spawnAsteroid() {
    if (Math.random() < 0.02 + score * 0.00001) {
        asteroids.push(new Asteroid());
    }
}

// Проверка столкновений
function checkCollisions() {
    // Столкновения пуль с астероидами
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
            if (bullets[i] && asteroids[j] &&
                bullets[i].x < asteroids[j].x + asteroids[j].width &&
                bullets[i].x + bullets[i].width > asteroids[j].x &&
                bullets[i].y < asteroids[j].y + asteroids[j].height &&
                bullets[i].y + bullets[i].height > asteroids[j].y) {

                createExplosion(asteroids[j].x + asteroids[j].width / 2,
                              asteroids[j].y + asteroids[j].height / 2);

                bullets.splice(i, 1);
                asteroids.splice(j, 1);
                score += 10;
                scoreElement.textContent = score;
                break;
            }
        }
    }

    // Столкновения игрока с астероидами
    for (let i = asteroids.length - 1; i >= 0; i--) {
        if (asteroids[i].x < player.x + player.width &&
            asteroids[i].x + asteroids[i].width > player.x &&
            asteroids[i].y < player.y + player.height &&
            asteroids[i].y + asteroids[i].height > player.y) {

            createExplosion(asteroids[i].x + asteroids[i].width / 2,
                          asteroids[i].y + asteroids[i].height / 2);

            asteroids.splice(i, 1);
            lives--;
            livesElement.textContent = lives;

            if (lives <= 0) {
                endGame();
            }
        }
    }
}

// Рисование фона со звёздами
let stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.5
    });
}

function drawBackground() {
    // Градиентный фон
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#000428');
    gradient.addColorStop(1, '#004e92');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Звёзды
    stars.forEach(star => {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
}

// Главный игровой цикл
function gameLoop() {
    if (!gameRunning || paused) {
        if (!gameRunning) return;
        animationId = requestAnimationFrame(gameLoop);
        return;
    }

    // Очистка и фон
    drawBackground();

    // Обновление игрока
    updatePlayer();
    drawPlayer();

    // Обновление пуль
    bullets.forEach((bullet, index) => {
        bullet.update();
        bullet.draw();

        if (bullet.isOffScreen()) {
            bullets.splice(index, 1);
        }
    });

    // Создание и обновление астероидов
    spawnAsteroid();
    asteroids.forEach((asteroid, index) => {
        asteroid.update();
        asteroid.draw();

        if (asteroid.isOffScreen()) {
            asteroids.splice(index, 1);
            score += 5;
            scoreElement.textContent = score;
        }
    });

    // Обновление частиц
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.isDead()) {
            particles.splice(index, 1);
        }
    });

    // Проверка столкновений
    checkCollisions();

    // Продолжение цикла
    animationId = requestAnimationFrame(gameLoop);
}

// Обработка клавиш
document.addEventListener('keydown', (e) => {
    if (e.code in keys) {
        e.preventDefault();

        if (e.code === 'KeyP' && !keys.KeyP) {
            paused = !paused;
            keys.KeyP = true;
            return;
        }

        keys[e.code] = true;

        if (e.code === 'ArrowLeft') {
            player.dx = -player.speed;
        } else if (e.code === 'ArrowRight') {
            player.dx = player.speed;
        } else if (e.code === 'Space' && !paused) {
            shoot();
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code in keys) {
        e.preventDefault();
        keys[e.code] = false;

        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            player.dx = 0;
        }
    }
});

// Завершение игры
function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    finalScoreElement.textContent = score;
    finalHighScoreElement.textContent = highScore;
    gameOverDiv.classList.remove('hidden');
}

// Перезапуск игры
restartBtn.addEventListener('click', () => {
    score = 0;
    lives = 3;
    bullets = [];
    asteroids = [];
    particles = [];
    player.x = canvas.width / 2 - 25;
    player.dx = 0;

    scoreElement.textContent = score;
    highScoreElement.textContent = highScore;
    livesElement.textContent = lives;

    gameOverDiv.classList.add('hidden');
    gameRunning = true;
    paused = false;

    gameLoop();
});

// Запуск игры
gameLoop();
