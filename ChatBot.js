const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const chatSuggestions = document.getElementById('chat-suggestions');

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('user-message', message);
        userInput.value = '';
        clearSuggestions();
        setTimeout(() => {
            const response = getBotResponse(message);
            appendMessage('bot-message', response.text);
            if (response.suggestions) {
                showSuggestions(response.suggestions);
            }
        }, 500);
    }
}

function appendMessage(className, message) {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message', className);
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response = '';
    let suggestions = [];

    if (lowerMessage.includes('symptoms')) {
        response = 'Cancer symptoms vary depending on the type. Common symptoms include fatigue, lumps, weight changes, skin changes, persistent cough, etc. Do you want to know more about specific types of cancer symptoms?';
        suggestions = ['Breast cancer symptoms', 'Lung cancer symptoms'];
    } else if (lowerMessage.includes('treatment')) {
        response = 'Cancer treatments include surgery, chemotherapy, radiation therapy, immunotherapy, targeted drug therapy, and more. Would you like information on a specific treatment?';
        suggestions = ['Tell me about chemotherapy', 'What is immunotherapy?'];
    } else if (lowerMessage.includes('prevention')) {
        response = 'Preventive measures include avoiding tobacco, eating a healthy diet, maintaining a healthy weight, staying active, protecting yourself from the sun, getting vaccinated, and avoiding risky behaviors.';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = 'Hello! How can I assist you today?';
        suggestions = ['Tell me about cancer symptoms', 'How is cancer treated?'];
    } else if (lowerMessage.includes('breast cancer symptoms')) {
        response = 'Breast cancer symptoms may include a lump in the breast, change in breast shape, dimpling of the skin, fluid coming from the nipple, or a red scaly patch of skin.';
    } else if (lowerMessage.includes('lung cancer symptoms')) {
        response = 'Lung cancer symptoms may include coughing (including coughing up blood), weight loss, shortness of breath, and chest pains.';
    } else if (lowerMessage.includes('chemotherapy')) {
        response = 'Chemotherapy is a type of cancer treatment that uses drugs to kill cancer cells. It works by stopping or slowing the growth of cancer cells.';
    } else if (lowerMessage.includes('immunotherapy')) {
        response = 'Immunotherapy is a type of cancer treatment that helps your immune system fight cancer. It uses substances made by the body or in a laboratory to improve or restore immune system function.';
    } else {
        response = 'I can help with information on cancer symptoms, treatments, prevention, and more. Please ask me anything related to these topics!';
        suggestions = ['What are cancer symptoms?', 'How can I prevent cancer?', 'Tell me about cancer treatments'];
    }

    return { text: response, suggestions };
}

function showSuggestions(suggestions) {
    chatSuggestions.innerHTML = '';
    suggestions.forEach(suggestion => {
        const button = document.createElement('button');
        button.className = 'suggestion-button';
        button.textContent = suggestion;
        button.onclick = () => {
            userInput.value = suggestion;
            sendMessage();
        };
        chatSuggestions.appendChild(button);
    });
}

function clearSuggestions() {
    chatSuggestions.innerHTML = '';
}
