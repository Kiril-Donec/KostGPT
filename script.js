const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatLog = document.querySelector('.chat-log');

// Получаем время в формате 13:54 с учетом часового пояса пользователя
const formatted_time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Отключаем 12-часовой формат
});

const vowels = "аеёиоуыэюя";
const consonants = "бвгджзйклмнпрстфхцчшщ";

function is_vowel(char) {
    return vowels.includes(char);
}

function is_consonant(char) {
    return consonants.includes(char);
}

function generate_word() {
    const length = Math.floor(Math.random() * (7 - 3 + 1)) + 3; // Random length from 3 to 7
    let word = [];

    // Start with a vowel or consonant randomly
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
    for (let i = 0; i < 5; i++) {
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
        response += "Молодец ";
    }

    if (message.includes("себе") || message.includes("ты кто") || message.includes("кто ты")) {
        response += 'Я полу-модель созданная Константином Орловым, который прославился благодаря своему персонажу "Т-Ф". Также Кирилл под ником Kirix, помог организовать сайт со мной. Насчёт полу-модели, я просто обрабатываю найденные ключевые слова в ответе и выдаю ответ, в отличие от настоящих нейросетей, которые проводят много сложных математических операций. ';
    }
    
    if (message.includes("время")) {
        response += "Сейчас ровно " + formatted_time + " ";
    }

    if (message.includes("точно") || message.includes("верен")) {
        response += "Точно-точно ";
    }

    if (message.includes("упер") || message.includes("ага") || message.includes("класс")) {
        response += "Ага) ";
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

    if (message.includes("название")) {
        response += "Вот ваше название: " + generate_word() + ". ";
    }
    
    if (message.includes("пока") || message.includes("до свидания")) {
        response += "Пока, удачного дня :3";
    }

    if (message.includes("доброться")) {
        handle_go_command();
        return response; // Возвращаем пустой ответ, чтобы не дублировать стандартное сообщение 
    }

    if (response === "") {
        response = "Ничего не понял";
    }

    return response;
}