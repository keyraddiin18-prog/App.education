// --- 8. VIEW: AI ASSISTANT ---
function showAIScreen() {
    mainContent.innerHTML = `
        <section class="subjects-screen">
            <div class="subjects-header">
                <div class="subjects-grade-icon" style="background: rgba(0, 188, 212, 0.1);">🤖</div>
                <div><span>AI POWERED</span><h2>Study Assistant</h2></div>
            </div>
            
            <div class="chat-container" id="chatContainer">
                <div class="message bot-message">Akkam! Ani gargaaraa barnootaa keeti. Maal si gargaaruu danda'a?</div>
            </div>

            <div class="chat-input-area">
                <input type="text" id="aiInput" placeholder="Type your question here...">
                <button id="aiSendBtn">➤</button>
            </div>
        </section>
    `;

    const chatContainer = document.getElementById("chatContainer");
    const aiInput = document.getElementById("aiInput");
    const aiSendBtn = document.getElementById("aiSendBtn");

    // ==========================================
    // SECURITY & BACKEND URL
    // Linkii Apps Script (/exec) irraa copy goote asitti kaa'i:
    // ==========================================
    const BACKEND_URL = "https://script.google.com/macros/s/AKfycbwWRY_YvoEzdvNABg.../exec"; // <-- LINKII KEE ASITTI KAA'I

    aiSendBtn.onclick = async () => {
        const text = aiInput.value.trim();
        if(!text) return;

        // 1. Show User Message
        chatContainer.innerHTML += `<div class="message user-message">${escapeHTML(text)}</div>`;
        aiInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;

        if(!BACKEND_URL || BACKEND_URL.includes("...")) {
            chatContainer.innerHTML += `<div class="message bot-message" style="color: #e74c3c;">
                <b>System Notice:</b> BACKEND_URL hin galchin. Maaloo linkii Apps Script keessatti galchi.
            </div>`;
            chatContainer.scrollTop = chatContainer.scrollHeight;
            return;
        }

        // 2. Show Loading Indicator
        const loadingId = "loading-" + Date.now();
        chatContainer.innerHTML += `<div class="message bot-message" id="${loadingId}">AI yaadaa jira... ⏳</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 3. Fetch Logic (Backend waliin walqunnamuu)
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                // Apps Script 'Content-Type' ni barbaadu, garuu header kana akkuma jirutti dhiisuu ni dandeenya
                body: JSON.stringify({ prompt: text }) // 'message' gara 'prompt' jedhutti jijjiirameera (Apps Script kee waliin akka walsimuuf)
            });

            const data = await response.json();

            // Loading message haquu
            const loadingElement = document.getElementById(loadingId);
            if (loadingElement) loadingElement.remove();

            if (data.error) {
                throw new Error(data.error);
            }

            // Deebii mul'isuu
            chatContainer.innerHTML += `<div class="message bot-message">${escapeHTML(data.reply)}</div>`;
            chatContainer.scrollTop = chatContainer.scrollHeight;

        } catch (err) {
            console.error("Error:", err);
            const loadingElement = document.getElementById(loadingId);
            if (loadingElement) loadingElement.remove();
            
            chatContainer.innerHTML += `<div class="message bot-message" style="color:#e74c3c;">
                Dhiifama, rakkoon uumameera. Interneetii kee ykn backend kee mirkaneessi.
            </div>`;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
    
    // Enter cuunfaan erguu (Bonus feature)
    aiInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            aiSendBtn.click();
        }
    });
}