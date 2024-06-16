const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatLog = document.querySelector('.chat-log');

const current_time = new Date();
const formatted_time = current_time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
});

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
    "Апельсин",
    "Дрова",
    "Ютуб",
    "Муха",
    "Бумага",
    "Кофе",
    "Ноутбук",
    "Телефон",
    "Календарь",
    "Ключи",
    "Карандаш",
    "Часы",
    "Солнце",
    "Луна",
    "Звезда",
    "Книга",
    "Газета",
    "Мяч",
    "Цветок",
    "Дерево",
    "Зонтик",
    "Очки",
    "Шариковая ручка",
    "Чемодан",
    "Замок",
    "Бабочка",
    "Вода",
    "Снег",
    "Лёд",
    "Туман",
    "Компьютер",
    "Монитор",
    "Мышь",
    "Клавиатура",
    "Микрофон",
    "Наушники",
    "Планшет",
    "Камера",
    "Телевизор",
    "Пульт",
    "Лампа",
    "Свет",
    "Кровать",
    "Подушка",
    "Одеяло",
    "Ковёр",
    "Половик",
    "Зеркало",
    "Картина",
    "Стиральная машина",
    "Холодильник",
    "Чайник",
    "Сковорода",
    "Тарелка",
    "Вилка",
    "Ложка",
    "Нож",
    "Бокал",
    "Чашка",
    "Заварочный чайник",
    "Фонарик",
    "Ваза",
    "Книжная полка",
    "Банка",
    "Флешка",
    "Диск",
    "Гитара",
    "Пианино",
    "Саксофон",
    "Барабан",
    "Скрипка",
    "Труба",
    "Скейтборд",
    "Велосипед",
    "Ролики",
    "Сноуборд",
    "Лыжи",
    "Маска",
    "Палатка",
    "Рюкзак",
    "Карта",
    "Компас",
    "Лупа",
    "Термос",
    "Палочки для еды",
    "Консервный нож",
    "Плита",
    "Духовка",
    "Микроволновая печь",
    "Блендер",
    "Миксер",
    "Кофемолка",
    "Весы",
    "Гиря",
    "Тренажёр",
    "Гантеля",
    "Кубик Рубика",
    "Филипп Киркоров",
    "Алла Пугачёва",
    "Сергей Лазарев",
    "Земфира",
    "Баста",
    "Полина Гагарина",
    "Дима Билан",
    "Валерия",
    "Игорь Крутой",
    "Юрий Лоза",
    "Виктор Цой",
    "Ани Лорак",
    "Владимир Пресняков",
    "Наташа Королёва",
    "Градусы",
    "Вера Брежнева",
    "Тимати",
    "Егор Крид",
    "Нюша",
    "Александр Розенбаум"
];

let randomNumber = Math.floor(Math.random() * 11);

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
            typeBotMessage(botResponse);
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

function generateBotResponse(message) {
    let response = "";
    message = message.toLowerCase(); // Преобразуем сообщение в нижний регистр

    if (message.includes("привет") || message.includes("здравствуйте")) {
        response += "Привет ";
    }

    if (message.includes("как дела") || message.includes("твои дела")) {
        response += "Всё ок, а у тебя? ";
    }

    if (message.includes("хорошо") || message.includes("ок") || message.includes("норм")) {
        response += "Молодец";
    }

    if (message.includes("время")) {
        response += "Сейчас ровно " + formatted_time + " ";
    }

    if (message.includes("точно")) {
        response += "Точно-точно";
    }

    if (message.includes("спасибо")) {
        response += "Пожалуйста ";
    }

    if (message.includes("извини") || message.includes("прости") || message.includes("прорян") || message.includes("сори")) {
        response += "Я прощаю тебя ";
    }

    if (message.includes("любое число")) {
        randomNumber = Math.floor(Math.random() * 11); 
        response += "Я могу генерировать числа от 0 до 10. Сейчас выпало число " + randomNumber + ". Напиши 'Число', чтобы перегенерировать ";
    }

    if (message.includes("число")) {
        response += "Новое число: " + randomNumber + ". ";
    }

    if (message.includes("интересный факт")) {
        response += "И.Ф: " + randomFacts[Math.floor(Math.random() * randomFacts.length)] + ". ";
    }

    if (message.includes("кто")) {
        response += "Это всё: " + randomCharacters[Math.floor(Math.random() * randomCharacters.length)] + ". ";
    }

    if (message.includes("пока") || message.includes("до свидания")) {
        response += "Пока, удачного дня :3";
    }

    if (response === "") {
        response = "Ничего не понял";
    }

    return response;
}