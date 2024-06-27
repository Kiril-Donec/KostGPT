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
    // Выводим сообщение в чат с помощью typeBotMessage
    typeBotMessage(`KostGPT: поверните ${direction}, ${step}, `); 
  }
}

// Функция для генерации случайных нот
function generate_notes() {
  const notes = ["до", "до#", "ре", "ре#", "ми", "фа", "фа#", "соль", "соль#", "ля", "ля#", "си"];
  const numberOfNotes = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
  const generatedNotes = Array.from({ length: numberOfNotes }, () => random.choice(notes));
  return generatedNotes.join(', ');
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

    // Получаем элемент сообщения пользователя
    const userMessageElement = chatLog.lastElementChild;

    // Флаг для предотвращения повторных вызовов
    let botResponded = false; 

    // Ждем завершения анимации сообщения пользователя
    userMessageElement.addEventListener('animationend', () => {
      // Проверяем флаг, чтобы ответить только один раз
      if (!botResponded) {  
        const botResponse = generateBotResponse(userMessage);
        if (botResponse) {
          typeBotMessage(botResponse);
        }
        botResponded = true; // Устанавливаем флаг после ответа
      }
    });
  }
}

// Функция для добавления анимации к элементу
function animateElement(element, animationName, duration = '1s') {
  element.style.animation = `${animationName} ${duration} ease-out forwards`; 
}

function addUserMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'message-user');
  messageElement.innerHTML = `<p></p><img src="images/User.jpg" alt="User" class="message-avatar">`;
  const messageText = messageElement.querySelector('p');
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;

  // Вычисляем время для появления текста (80% от длительности анимации)
  const animationDuration = parseFloat(getComputedStyle(messageElement).animationDuration) * 1000;
  const textAppearDelay = animationDuration * 0.8;

  setTimeout(() => {
    messageText.textContent = message; 
    messageText.style.animation = 'textFadeIn 0.3s ease-out'; 
  }, textAppearDelay);

  animateElement(messageElement, 'messageAppear');
}

function typeBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'message-bot');
  messageElement.innerHTML = `<img src="images/KostGPT.jpg" alt="KostGPT" class="message-avatar"><p></p>`;
  const messageText = messageElement.querySelector('p');
  chatLog.appendChild(messageElement);
  chatLog.scrollTop = chatLog.scrollHeight;

  // Флаг, чтобы анимация текста запускалась только один раз
  let textAnimationStarted = false;

  messageElement.addEventListener('animationend', () => {
    if (!textAnimationStarted) {
      let i = 0;
      const speed = 30;

      const typingInterval = setInterval(() => {
        if (i < message.length) {
          // Случайный выбор анимации
          if (Math.random() < 0.5) {
            // Мгновенное появление
            messageText.textContent += message.charAt(i);
          } else {
            // Плавное появление
            const letterSpan = document.createElement('span');
            letterSpan.textContent = message.charAt(i);
            letterSpan.style.opacity = 0;
            messageText.appendChild(letterSpan);
            // Анимируем opacity
            setTimeout(() => {
              letterSpan.style.transition = 'opacity 0.3s ease-out';
              letterSpan.style.opacity = 1;
            }, 10); // Небольшая задержка для плавности
          }

          i++;
          chatLog.scrollTop = chatLog.scrollHeight;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);

      textAnimationStarted = true; // Устанавливаем флаг после запуска анимации
    }
  });

  animateElement(messageElement, 'messageAppearBot'); 
}

function showFraudOverlay() {
  setTimeout(() => {
    fraudOverlay.style.display = 'flex';
    document.getElementById('fraud-overlay-bg').style.display = 'block';

    // Добавляем класс к body 
    document.body.classList.add('overlay-active'); 
  }, 2000); 
}

// Функция для скрытия оверлея 
function hideFraudOverlay() { 
  fraudOverlay.style.display = 'none';
  document.getElementById('fraud-overlay-bg').style.display = 'none';

  // Удаляем класс с body
  document.body.classList.remove('overlay-active');
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
    response += 'Я полу-модель созданная Константином орловым, который прославился благодаря своему персонажу "Т-Ф". Также Кирилл под ником Kirix, помог организовать сайт со мной. Насчёт полу-модели, я просто обраватываю найденные ключевые слова в ответе и выдаю ответ, в отличи настоящих нейросетей которые используют сложные математические формулы';
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
    return null;
  }

  // Проверка на мошеннические слова (частичное совпадение)
  const fraudKeywords = ["омяк", "азино", "asino", "1xbet"];
  for (const keyword of fraudKeywords) {
    if (message.includes(keyword)) {
      typeBotMessage("Аварийное выключение от мошенничества");
      showFraudOverlay();
      return null;
    }
  }

  // Генерация нот
  if (message.includes("музыку") || message.includes("ноты") || message.includes("мелодию")) {
    response += "Я написал мелодию типа: " + generate_notes() + ". ";
  }

  // Обработка файлов
  if (message.includes("[Файл]") || message.includes("[Фото]") || message.includes("[Видео]") || message.includes("[Аудио]")) {
    response += "Я не поддерживаю данный тип файла. Сначала преобразуйте его в .kgpt";
  }

  // Пасхалка
  if (message === "Вы:") { // Строгое сравнение
    response += "KostGPT: ";
    console.log("Вы нашли пасхалку"); // Вывод в консоль
  }

  if (response === "") {
    response = "Ничего не понял";
  }

  return response;
}

// Функция для запуска анимации
function startAnimation() {
  const loadingScreen = document.getElementById('loading-screen');
  const logo = loadingScreen.querySelector('h1');
  const chatContainer = document.querySelector('.chat-container');

  // Показываем загрузочный экран
  loadingScreen.style.opacity = '1'; // Делаем экран загрузки видимым
  loadingScreen.style.pointerEvents = 'auto'; // Включаем взаимодействие с пользователем

  // Удаляем загрузочный экран после завершения анимации логотипа
  logo.addEventListener('animationend', () => {
    // Анимация исчезновения логотипа
    logo.style.animation = 'logoDisappear 0.3s ease-out forwards';

    // Показываем интерфейс
    setTimeout(() => {
      chatContainer.classList.add('show');
    }, 400); // Задержка в 0.2 секунды (200 мс) для плавного перехода

    // Удаляем загрузочный экран после завершения анимации исчезновения логотипа
    setTimeout(() => {
      loadingScreen.remove();
    }, 500); // Меняем задержку на 0.7 секунды (700 мс) для плавного исчезновения
  });

  // Анимация исчезновения логотипа
  const logoDisappearKeyframes = `
    @keyframes logoDisappear {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `;
  const logoDisappearStyle = document.createElement('style');
  logoDisappearStyle.appendChild(document.createTextNode(logoDisappearKeyframes));
  document.head.appendChild(logoDisappearStyle);
}

// Запускаем анимацию после загрузки страницы
window.addEventListener('load', startAnimation);
