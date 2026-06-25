// Элементы интерфейса
const authBox = document.getElementById('auth-box');
const chatBox = document.getElementById('chat-box');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username-input');
const welcomeTitle = document.getElementById('welcome-title');
const resetBtn = document.getElementById('reset-session');
const userInput = document.getElementById('userInput');
const messagesContainer = document.getElementById('messages');

// Функция проверки сохраненного сеанса (через куки)
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Проверяем авторизацию при старте
const savedUser = getCookie('username');
if (savedUser) {
    showChat(savedUser);
}

// Клик по кнопке «Войти»
loginBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    if (name) {
        document.cookie = `username=${encodeURIComponent(name)}; max-age=86400; path=/`; // сохраняем на 1 день
        showChat(name);
    } else {
        alert('Пожалуйста, введите никнейм!');
    }
});

// Переключение экранов
function showChat(name) {
    authBox.classList.add('hidden');
    chatBox.classList.remove('hidden');
    welcomeTitle.textContent = `${name}, что дальше?`;
}

// Сброс авторизации (Кнопка-минус)
resetBtn.addEventListener('click', () => {
    document.cookie = "username=; max-age=-1; path=/"; // Удаляем куки
    userInput.value = '';
    messagesContainer.innerHTML = '';
    chatBox.classList.add('hidden');
    authBox.classList.remove('hidden');
    usernameInput.value = '';
});

// Отправка сообщений по кнопке Enter
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && userInput.value.trim() !== '') {
        const text = userInput.value.trim();
        appendMessage(text, 'user');
        userInput.value = '';

        // Симуляция ответа ИИ через 1 секунду
        setTimeout(() => {
            appendMessage('Я обрабатываю твой запрос через MicroTensor...', 'ai');
        }, 1000);
    }
});

// Добавление бабла сообщения в чат
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender);
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Скролл вниз
}
