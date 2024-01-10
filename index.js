import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

document.addEventListener('DOMContentLoaded', () => {
    
    
    // DOM elements
    const userInput = document.getElementById("userInput");
    const sendMessageBtn = document.getElementById("sendMessageBtn");
    const chatContainer = document.getElementById("chatMessages");
    const chatTitle = document.getElementById("chatTitle");
    const logoName = document.querySelector(".contact-name");
    const removeAllChatsBtn = document.getElementById("removeAllChatsBtn");
    
    chatContainer.innerHTML=`<h3 class="welcome">Welcome To AI Chatboat Write something...<h3/>`

    // Google Generative AI API key
    const apiKey = "AIzaSyDT-rQyMF64wQXmB2yDtTlv5TG3Zbe3aKI";
    const genAI = new GoogleGenerativeAI(apiKey);

    // Initial conversation setup
    let conversationId = 1; // Initial conversation ID

    // Event listeners
    sendMessageBtn.addEventListener("click", sendMessage);
    removeAllChatsBtn.addEventListener("click", removeAllChats);


    userInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Function to handle user's messages
    function sendMessage() {
        chatContainer.innerHTML=""
        const userMessage = userInput.value.trim();
        if (userMessage !== "") {
            // Display user's message
            displayMessage("user", userMessage);

            try {
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });

                // Add typing indicator
                displayTypingIndicator();

                // Generate AI response
                model.generateContent(userMessage)
                    .then(result => result.response.text())
                    .then(reply => {
                        // Remove typing indicator
                        removeTypingIndicator();

                        // Show AI response
                        displayMessage("assistant", reply);
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            } catch (error) {
                console.error("Error:", error);
            }

            userInput.value = "";
        }
        else{
            alert('please enter the message...')
        }
    }

    // Function to display a message in the chat
    function displayMessage(role, content) {
        
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", role);
        messageElement.innerHTML = `<span class="user-name">${role === 'user' ? 'User' : 'Assistant'}</span>: ${content} <span class="timestamp">${formatTimestamp()}</span>`;
        chatContainer.appendChild(messageElement);

        // Scroll to the latest message
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Update logo name when a new chat is selected
        logoName.classList.remove("hide");
    }

    // Function to display a typing indicator
    function displayTypingIndicator() {

        const typingIndicator = document.createElement("div");
        typingIndicator.classList.add("typing-indicator");
        typingIndicator.innerText = "Assistant is typing...";
        chatContainer.appendChild(typingIndicator);
    }

    // Function to remove the typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector(".typing-indicator");
        if (typingIndicator) {
            chatContainer.removeChild(typingIndicator);
        }
    }
    

    // Function to format the timestamp
    function formatTimestamp() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Function to remove all chats
    function removeAllChats() {
        // Clear chat messages
        chatContainer.innerHTML = "";

        // Reset conversation ID
        conversationId = 1;

        // Display a message indicating that all chats have been removed
        displayMessage("assistant", 'All Chats Removed. Start typing to chat.');
    }

  // Function to toggle night mode
  // DOM elements
  const nightModeBtn = document.querySelector("#nightModeIcon");
  const dayModeBtn = document.querySelector("#dayModeIcon");

  // Night Mode button event listener
  nightModeBtn.addEventListener("click", toggleNightMode);
  dayModeBtn.addEventListener("click", toggleNightMode);

  // Function to toggle night mode
  function toggleNightMode() {
      const nightModeIcon = document.getElementById('nightModeIcon');
      const dayModeIcon = document.getElementById('dayModeIcon');

      if (document.body.className !== "night-mode") {
          document.body.classList.toggle("night-mode");
          document.querySelector(".chat-messages").classList.add('night-mode');
          document.querySelector(".chat-header").classList.add('night-modee');
          document.querySelector(".welcome").classList.add('night-modeee');

          // Toggle visibility of night and day mode icons
          nightModeIcon.classList.add('hide');
          dayModeIcon.classList.remove('hide');
      } else {
          document.body.classList.remove("night-mode");
          document.querySelector(".chat-messages").classList.remove('night-mode');
          document.querySelector(".chat-header").classList.remove('night-modee');
          document.querySelector(".welcome").classList.remove('night-modeee');

          // Toggle visibility of night and day mode icons
          nightModeIcon.classList.remove('hide');
          dayModeIcon.classList.add('hide');
      }
  }
});
