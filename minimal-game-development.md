# Что нужно для создания минимальной игры

## Минимальные требования

Для создания простой игры вам понадобится всего 2 вещи:
1. **Текстовый редактор** (даже Блокнот подойдет)
2. **Язык программирования** с возможностью запуска

## Популярные языки программирования для игр

### 1. Python (самый простой для начинающих)

**Минимальная игра "Угадай число":**
```python
import random

number = random.randint(1, 100)
attempts = 0

print("Угадай число от 1 до 100!")

while True:
    guess = int(input("Введи число: "))
    attempts += 1

    if guess < number:
        print("Больше!")
    elif guess > number:
        print("Меньше!")
    else:
        print(f"Правильно! Попыток: {attempts}")
        break
```

**Что нужно:**
- Python (скачать с python.org)
- Любой текстовый редактор
- Для игр с графикой: библиотека Pygame

**Простая графическая игра с Pygame:**
```python
import pygame
import sys

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.display.set_caption("Моя первая игра")

# Позиция игрока
x, y = 400, 300
speed = 5

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Управление стрелками
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        x -= speed
    if keys[pygame.K_RIGHT]:
        x += speed
    if keys[pygame.K_UP]:
        y -= speed
    if keys[pygame.K_DOWN]:
        y += speed

    # Отрисовка
    screen.fill((0, 0, 0))  # Черный фон
    pygame.draw.circle(screen, (255, 0, 0), (x, y), 20)  # Красный круг
    pygame.display.flip()
    pygame.time.Clock().tick(60)

pygame.quit()
```

### 2. JavaScript (работает в браузере)

**Минимальная игра в HTML:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Кликер</title>
</head>
<body>
    <h1>Счет: <span id="score">0</span></h1>
    <button onclick="click()">Нажми меня!</button>

    <script>
        let score = 0;
        function click() {
            score++;
            document.getElementById('score').textContent = score;
        }
    </script>
</body>
</html>
```

**Canvas игра (движущийся квадрат):**
```html
<!DOCTYPE html>
<html>
<body>
    <canvas id="game" width="800" height="600"></canvas>
    <script>
        const canvas = document.getElementById('game');
        const ctx = canvas.getContext('2d');

        let x = 400, y = 300;
        let speed = 3;
        let dx = speed, dy = speed;

        function gameLoop() {
            // Очистка экрана
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 800, 600);

            // Движение
            x += dx;
            y += dy;

            // Отскок от стен
            if (x < 0 || x > 800) dx = -dx;
            if (y < 0 || y > 600) dy = -dy;

            // Рисуем квадрат
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, 50, 50);

            requestAnimationFrame(gameLoop);
        }

        gameLoop();
    </script>
</body>
</html>
```

**Что нужно:**
- Любой браузер (Chrome, Firefox)
- Текстовый редактор
- Для сложных игр: библиотеки Phaser, Three.js

### 3. C# с Unity (для 2D/3D игр)

**Что нужно:**
- Unity Hub (бесплатно для личного использования)
- Visual Studio (устанавливается с Unity)

**Минимальный скрипт движения:**
```csharp
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    public float speed = 5f;

    void Update()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");

        transform.Translate(new Vector3(h, v, 0) * speed * Time.deltaTime);
    }
}
```

### 4. C++ (для сложных игр)

**С библиотекой SFML:**
```cpp
#include <SFML/Graphics.hpp>

int main()
{
    sf::RenderWindow window(sf::VideoMode(800, 600), "Моя игра");
    sf::CircleShape player(50);
    player.setFillColor(sf::Color::Red);
    player.setPosition(400, 300);

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        // Управление
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left))
            player.move(-5, 0);
        if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
            player.move(5, 0);

        window.clear();
        window.draw(player);
        window.display();
    }

    return 0;
}
```

**Что нужно:**
- Компилятор C++ (MinGW, Visual Studio)
- Библиотека SFML или SDL

### 5. GDScript (в Godot Engine)

**Что нужно:**
- Godot Engine (бесплатный движок)

**Минимальный скрипт:**
```gdscript
extends Sprite

var speed = 200

func _process(delta):
    if Input.is_action_pressed("ui_right"):
        position.x += speed * delta
    if Input.is_action_pressed("ui_left"):
        position.x -= speed * delta
```

## Рекомендации для начинающих

### Самый простой путь:

1. **Python + Pygame** - лучший выбор для обучения
   - Простой синтаксис
   - Быстрый результат
   - Много туториалов

2. **JavaScript в браузере** - не нужно ничего устанавливать
   - Работает сразу в браузере
   - Легко поделиться игрой (просто отправить HTML файл)

3. **Scratch** - визуальное программирование (для детей)
   - Вообще не нужен код
   - Drag-and-drop интерфейс
   - Отличный старт для понимания логики

### Для серьезных проектов:

1. **Unity (C#)** - для 2D/3D игр
   - Много готовых ресурсов
   - Кроссплатформенность
   - Большое сообщество

2. **Unreal Engine (C++)** - для AAA-игр
   - Высококачественная графика
   - Blueprint (визуальное программирование)

3. **Godot** - бесплатная альтернатива Unity
   - Полностью бесплатный
   - Легковесный
   - Свой язык GDScript (похож на Python)

## Минимальный набор инструментов

### Абсолютный минимум:
```
1. Текстовый редактор (Notepad++, VS Code, Sublime Text)
2. Язык программирования (Python/JavaScript)
3. Терминал/Командная строка
```

### Расширенный набор:
```
1. IDE (Visual Studio Code, PyCharm, Visual Studio)
2. Система контроля версий (Git)
3. Графический редактор (GIMP, Krita, Aseprite для пикселей)
4. Звуковой редактор (Audacity)
5. Движок (по желанию: Unity, Godot, Unreal)
```

## Пошаговый план создания первой игры

### Шаг 1: Начните с текстовой игры
```python
# Самая простая игра на Python
print("Ты в темной комнате.")
choice = input("Куда пойдешь? (лево/право): ")

if choice == "лево":
    print("Ты нашел сокровище!")
elif choice == "право":
    print("Ты упал в яму. Игра окончена.")
else:
    print("Непонятная команда.")
```

### Шаг 2: Добавьте цикл (игровой процесс)
### Шаг 3: Добавьте графику
### Шаг 4: Добавьте звук
### Шаг 5: Добавьте меню и уровни

## Полезные ресурсы

- **Pygame туториалы**: pygame.org
- **JavaScript игры**: developer.mozilla.org/en-US/docs/Games
- **Unity Learn**: learn.unity.com
- **Godot документация**: docs.godotengine.org
- **Scratch**: scratch.mit.edu

## Заключение

**Для самой минимальной игры вам нужно:**
- 10 минут времени
- Python или браузер
- 10-20 строк кода

Начните с простого, постепенно усложняйте. Каждая большая игра начиналась с "Hello World"!
