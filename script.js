const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatLog = document.querySelector('.chat-log');
const fraudOverlay = document.getElementById('fraud-overlay');

const vowels = "аеёиоуыэюя";
const consonants = "бвгджзйклмнпрстфхцчшщ";

const randomFacts = [
    "В языке древних греков не существовало слова, которое обозначало религию",
    "Изначально, отвертка была изобретена для выковыривания гвоздей, шуруп был изобретен на 100 лет позже",
    "Ежедневно 60 человек становятся миллионерами",
    "Лимон содержит больше сахара, чем клубника",
    "У медуз нет мозгов и кровеносных сосудов",
    "За год на Землю падает до 500 кг марсианского метеорита",
    "На Юпитере регулярно идут алмазные дожди",
    "У жирафа и человека одинаковое количество шейных позвонков",
    "За год на Землю падает до 500 кг марсианского метеорита",
    "На Юпитере регулярно идут алмазные дожди",
    "У жирафа и человека одинаковое количество шейных позвонков"
];

const randomCharacters = [
    "Апельсин", "Дрова", "Ютуб", "Муха", "Бумага", "Кофе", "Ноутбук",
    "Телефон", "Календарь", "Ключи", "Карандаш", "Часы", "Солнце",
    "Луна", "Звезда", "Книга", "Газета", "Мяч", "Цветок", "Дерево",
    "Зонтик", "Очки", "Шариковая ручка", "Чемодан", "Замок", "Бабочка",
    "Вода", "Снег", "Лёд", "Туман", "Компьютер", "Монитор", "Мышь",
    "Клавиатура", "Микрофон", "Наушники", "Планшет", "Камера", "Телевизор",
    "Пульт", "Лампа", "Свет", "Кровать", "Подушка", "Одеяло", "Ковёр",
    "Половик", "Зеркало", "Картина", "Стиральная машина", "Холодильник",
    "Чайник", "Сковорода", "Тарелка", "Вилка", "Ложка", "Нож", "Бокал",
    "Чашка", "Заварочный чайник", "Фонарик", "Ваза", "Книжная полка",
    "Банка", "Флешка", "Диск", "Гитара", "Пианино", "Саксофон", "Барабан",
    "Скрипка", "Труба", "Скейтборд", "Велосипед", "Ролики", "Сноуборд",
    "Лыжи", "Маска", "Палатка", "Рюкзак", "Карта", "Компас", "Лупа",
    "Термос", "Палочки для еды", "Консервный нож", "Плита", "Духовка",
    "Микроволновая печь", "Блендер", "Миксер", "Кофемолка", "Весы",
    "Гиря", "Тренажёр", "Гантеля", "Кубик Рубика", "Филипп Киркоров",
    "Алла Пугачёва", "Сергей Лазарев", "Земфира", "Баста", "Полина Гагарина",
    "Дима Билан", "Валерия", "Игорь Крутой", "Юрий Лоза", "Виктор Цой",
    "Ани Лорак", "Владимир Пресняков", "Наташа Королёва", "Градусы",
    "Вера Брежнева", "Тимати", "Егор Крид", "Нюша", "Александр Розенбаум"
];

let randomNumber = Math.floor(Math.random() * 11);

function is_vowel(char) {
    return vowels.includes(char);
}

function is_consonant(char) {
    return consonants.includes(char);
}

function generate_word() {
    const length = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
    let word = [];

    if (Math.random() < 0.5) {
        word.push(vowels[Math.floor(Math.random() * vowels.length)]);
    } else {
        word.push(consonants[Math.floor(Math.random() * consonants.length)]);
    }

    for (let i = 1; i < length; i++) {
        if (is_vowel(word[word.length - 1])) {
            word.push(consonants[Math.floor(Math.random() * consonants.length)]);
        } else {
            word.push(vowels[Math.floor(Math.random() * vowels.length)]);
        }
    }

    return word.join('');
}

function handle_go_command() {
    const directions = ["налево", "направо", "прямо"];
    const steps = ["1 шаг", "2 шага", "3 шага", "4 шага"];
    for (let _ in range(5)) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const step = steps[Math.floor(Math.random() * steps.length)];
        typeBotMessage(`KostGPT: поверните ${direction}, ${step}, `);
    }
}

function isMessageEmpty(message) {
    return message.trim() === "";
}

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

sendButton.addEventListener('click', () => {
    sendMessage();
});

function sendMessage() {
    const userMessage = userInput.value;
    if (!isMessageEmpty(userMessage)) {
        addUserMessage(userMessage);
        userInput.value = '';
        const botResponse = generateBotResponse(userMessage);
        setTimeout(() => {
            if (botResponse) { // Проверяем, есть ли ответ от бота
                typeBotMessage(botResponse);
            }
        }, 300);
    }
}

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'message-user');
    messageElement.innerHTML = `<p>${message}</p><img src="images/User.jpg" alt="User" class="message-avatar">`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function typeBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'message-bot');
    messageElement.innerHTML = `<img src="images/KostGPT.jpg" alt="KostGPT" class="message-avatar"><p></p>`;
    const messageText = messageElement.querySelector('p');
    chatLog.appendChild(messageElement);

    let i = 0;
    const speed = 30;

    const typingInterval = setInterval(() => {
        if (i < message.length) {
            messageText.textContent += message.charAt(i);
            i++;
            chatLog.scrollTop = chatLog.scrollHeight;
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}

function showFraudOverlay() {
    fraudOverlay.style.display = 'flex';
}

function generateBotResponse(message) {
    let response = "";

    if (message.includes("ривет") || message.includes("дравствуйте")) {
        response += "Привет ";
    }

    if (message.includes("ак дела") || message.includes("твои дела")) {
        response += "Всё ок, а у тебя? ";
    }

    if (message.includes("орошо") || message.includes("Ок") || message.includes("орм")) {
        response += "Молодец ";
    }

    if (message.includes("себе") || message.includes("ы кто") || message.includes("то ты")) {
        response += 'Я полу-модель созданная Константином орловым, который прославился благодаря своему персонажу "Т-Ф". Также Кирилл под ником Kirix, помог организовать сайт со мной. Насчёт полу-модели, я просто обраватываю найденные ключевые слова в ответе и выдаю ответ, в отличи настоящих нейросетей которые проводят много сложных математических операций. ';
    }

    if (message.includes("врем")) {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        response += "Сейчас ровно " + formattedTime + " ";
    }

    if (message.includes("очно") || message.includes("верен")) {
        response += "Точно-точно ";
    }

    if (message.includes("упер") || message.includes("ау") || message.includes("ласс")) {
        response += "Ага) ";
    }

    if (message.includes("пасибо")) {
        response += "Пожалуйста ";
    }

    if (message.includes("звини") || message.includes("рости") || message.includes("орян") || message.includes("ори")) {
        response += "Я прощаю тебя ";
    }

    if (message.includes("любое число")) {
        randomNumber = Math.floor(Math.random() * 11);
        response += "Я могу генерировать числа от 0 до 10. Сейчас выпало число " + randomNumber + ". Напиши 'Число', чтобы перегенерировать ";
    }

    if (message.includes("Число")) {
        response += "Новое число: " + randomNumber + ". ";
    }

    if (message.includes("нтересный факт")) {
        response += "И.Ф: " + randomFacts[Math.floor(Math.random() * randomFacts.length)] + ". ";
    }

    if (message.includes("Кто")) {
        response += "Это всё: " + randomCharacters[Math.floor(Math.random() * randomCharacters.length)] + ". ";
    }

    if (message.includes("азвание")) {
        response += "Вот ваше название: " + generate_word() + ". ";
    }

    if (message.includes("ока") || message.includes("о свидания")) {
        response += "Пока, удачного дня :3";
    }

    if (message.includes("добратся")) {
        handle_go_command();
        // Возвращаем null, чтобы не было двойного ответа
        return null;
    }

    // Логика выключения
    if (message.includes("ыход") || message.includes("ТФ")) {
        typeBotMessage("KostGPT: Диалог завершён");
        // Возвращаем null, чтобы не было стандартного ответа "Ничего не понял"
        return null;
    }

    if (message.includes("омяк") || message.includes("азино") || message.includes("asino") || message.includes("1xBet")) {
        typeBotMessage("Аварийное выключение от мошенничества");
        showFraudOverlay();
        // Возвращаем null, чтобы не было стандартного ответа "Ничего не понял"
        return null;
    }

    if (response === "") {
        response = "Ничего не понял";
    }

    return response;
}