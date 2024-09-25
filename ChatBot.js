function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message !== '') {
        appendMessage('user-message', message);
        userInput.value = '';
        setTimeout(() => {
            appendMessage('bot-message', getBotResponse(message));
        }, 1000);
    }
}

function appendMessage(className, message) {
    const chatBox = document.getElementById('chat-box');
    const newMessage = document.createElement('div');
    newMessage.classList.add('message', className);
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    const responses = {
        "hello": "Hi! How can I assist you with cancer information?",
        "cancer": "Cancer is a disease where some of the body's cells grow uncontrollably.",
        "symptoms": "Common symptoms of cancer include unexplained weight loss, fatigue, and abnormal lumps.",
        "treatment": "Cancer treatments include surgery, chemotherapy, radiation, and more.",
    };

    message = message.toLowerCase();
    return responses[message] || "I'm sorry, I don't have an answer for that. Can you ask something else?";
}
