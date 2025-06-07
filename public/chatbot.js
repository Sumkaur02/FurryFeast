document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const toggleBtn = document.querySelector('.chatbot-toggle');
    const closeBtn = document.querySelector('.chatbot-close');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const messagesContainer = document.querySelector('.chatbot-messages');
    const inputField = document.querySelector('.chatbot-input input');
    const sendBtn = document.querySelector('.chatbot-send');
    
    // Toggle chatbot visibility
    toggleBtn.addEventListener('click', function() {
      chatbotContainer.classList.toggle('open');
    });
    
    closeBtn.addEventListener('click', function() {
      chatbotContainer.classList.remove('open');
    });
    
    // Initial bot message
    const initialMessages = [
      "Hello there! I'm FurryFeast Assistant. How can I help you today?",
      "I can answer questions about our products, services, or help with your account."
    ];
    
    // Display initial messages with delay
    initialMessages.forEach((msg, i) => {
      setTimeout(() => {
        addBotMessage(msg);
      }, i * 1000);
    });
    
    // Quick questions
    const quickQuestions = [
      "What are your store hours?",
      "Do you offer pet grooming?",
      "Where are you located?",
      "How can I track my order?"
    ];
    
    // Add quick questions buttons
    const quickQuestionsContainer = document.createElement('div');
    quickQuestionsContainer.className = 'chatbot-quick-questions';
    
    quickQuestions.forEach(question => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-quick-btn';
      btn.textContent = question;
      btn.addEventListener('click', () => {
        addUserMessage(question);
        setTimeout(() => handleUserMessage(question), 500);
      });
      quickQuestionsContainer.appendChild(btn);
    });
    
    messagesContainer.appendChild(quickQuestionsContainer);
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    inputField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    function sendMessage() {
      const message = inputField.value.trim();
      if (message) {
        addUserMessage(message);
        inputField.value = '';
        setTimeout(() => handleUserMessage(message), 500);
      }
    }
    
    function addUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.className = 'chatbot-message user';
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
      scrollToBottom();
    }
    
    function addBotMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.className = 'chatbot-message bot';
      messageElement.textContent = message;
      messagesContainer.appendChild(messageElement);
      scrollToBottom();
    }
    
    function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function handleUserMessage(message) {
      // Remove quick questions after first user message
      const quickQuestions = document.querySelector('.chatbot-quick-questions');
      if (quickQuestions) {
        quickQuestions.remove();
      }
      
      // Convert to lowercase for easier matching
      const userMessage = message.toLowerCase();
      
      // Predefined responses
      let response;
      
      if (userMessage.includes('hello') || userMessage.includes('hi')) {
        response = "Hello! How can I assist you today?";
      } 
      else if (userMessage.includes('hour') || userMessage.includes('open') || userMessage.includes('close')) {
        response = "Our working hours are:\nMonday - Saturday: 9AM - 8PM\nSunday: 10AM - 6PM";
      }
      else if (userMessage.includes('location') || userMessage.includes('address') || userMessage.includes('where')) {
        response = "We're located at:\n123 Pet Street, New Delhi, India\nYou can find us on Google Maps!";
      }
      else if (userMessage.includes('contact') || userMessage.includes('phone') || userMessage.includes('email')) {
        response = "You can reach us at:\nPhone: +91 9997776665\nEmail: info@furryfeast.com";
      }
      else if (userMessage.includes('product') || userMessage.includes('store') || userMessage.includes('item')) {
        response = "We offer a variety of pet products including food, accessories, and grooming supplies. You can browse our full selection in the Store section.";
      }
      else if (userMessage.includes('service') || userMessage.includes('groom') || userMessage.includes('vet')) {
        response = "Our services include:\n- Emergency Care\n- Vaccination Services\n- Nutrition Counseling\n- Behavioral Consultation\n- Pet Boarding Services";
      }
      else if (userMessage.includes('account') || userMessage.includes('sign in') || userMessage.includes('login')) {
        response = "You can manage your account by signing in. If you don't have an account yet, you can create one in just a few steps!";
      }
      else if (userMessage.includes('order') || userMessage.includes('track') || userMessage.includes('delivery')) {
        response = "For order tracking and delivery questions, please contact our customer service at info@furryfeast.com with your order number.";
      }
      else if (userMessage.includes('thank')) {
        response = "You're welcome! Is there anything else I can help you with?";
      }
      else {
        response = "I'm sorry, I didn't understand that. Could you please rephrase your question? I can help with information about our products, services, store hours, and more!";
      }
      
      // Simulate typing delay
      setTimeout(() => {
        addBotMessage(response);
      }, 1000);
    }
  });