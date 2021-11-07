// глобальные переменные
let timer;
let score = 0;

hideHint = () => {
    document.querySelector('.hint').hidden = true;
}

// сброс игры (очки, время, отображение очков) и запуск игры
start = (time, items) => {
    hideHint();
    score = 0;
    clearInterval(timer);
    document.querySelector('.stats__score-counter__score').innerText = score;
    generate(time, items);
}

// генерация игры
generate = (init_time, items) => {
    // базовые переменные
    axe_set = [];
    time = init_time;

    // ответ
    var correct_idx = 0;
    correct_idx = Math.floor(Math.random() * items);

    // отобразить время
    document.querySelector('.stats__time-counter__countdown').innerText = time;

    // отобразить счетчик времени
    timer = setInterval(
        () => {
            if(time) {
                // пока идет время отображать это
                time -= 1;
                document.querySelector('.game-info__game-name').innerText = 'Видео игра: УГАДАЙ .....';
                document.querySelector('.game-info__game-name').style.color = 'white';
                document.querySelector('.stats__time-counter__countdown').innerText = time;
            } else {
                // когда время вышло то это
                document.querySelector('.game-info__game-name').style.color = 'red';
                document.querySelector('.game-info__game-name').innerText = 'Время вышло!';

                // перерандом ответа
                correct_idx = Math.floor(Math.random() * items);

                // // сброс и перерендер
                // clearInterval(timer);
                // generate(init_time, items);
                // time = init_time + 1;
                
                // дебаг читов
                console.log(
                    `%cНужный тебе топор под номером ${correct_idx + 1} :)`,
                    'color: white; font-family:monospace; font-size: 14px'
                    );
            
                time = init_time + 1;
            }
        }, 
        1000
    );
    
    // генератор топоров
    for(let i=0; i<items; i++) {
        document.querySelector('.game-field').innerHTML = '';
        axe = document.createElement('img');
        axe.setAttribute('src', 'images/axe.png');
        axe.setAttribute('value', i);
        axe.classList.add('game-field__axe');
        axe_set.push(axe);

        // повесить на топор действие
        axe.addEventListener('click', () => {
            if(i === correct_idx){
                // если топор совпадает с ответом то отображать это и увеличить счет
                score++;
                document.querySelector('.game-info__game-name').style.color = 'green';
                document.querySelector('.stats__score-counter__score').innerText = score;
                document.querySelector('.game-info__game-name').innerText = 'Правильно!';
            } else {
                // если топор не совпадает с ответом то отображать это
                document.querySelector('.game-info__game-name').style.color = 'red';
                document.querySelector('.game-info__game-name').innerText = 'Неправильно!';
            }

            // сброс и перерендер
            clearInterval(timer);
            generate(init_time, items);
            time = init_time + 1;
        });
    }
    console.log(
        `%cНужный тебе топор под номером ${correct_idx + 1} :)`,
        'color: white; font-family:monospace; font-size: 14px'
        );
    axe_set.forEach(el => document.querySelector('.game-field').appendChild(el));
}

// инициализация игры
window.onload = () => {
    console.log(
        '%cура ты нашёл читы на игру угадай топор!!!',
        'color: red; font-family:monospace; font-size: 20px; text-shadow: 1px 1px 0 rgb(255,127,0), 2px 2px 0 rgb(255,255,0), 3px 3px 0 rgb(0,255,0), 4px 4px 0 rgb(0,128,255), 4px 4px 0 rgb(0,0,255), 5px 5px 0 rgb(128,0,255)'
        );
    
}
