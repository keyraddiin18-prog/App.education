// ==========================================
// KEYRADDIIN EDUCATION APP - CORE LOGIC
// ==========================================

const EXAM_INFORMATION_URL = "https://keyraddiin18-prog.github.io/KEYRADDIIN-registration.et/";
const EXAM_CENTER_URL = "https://keyraddiin18-prog.github.io/KEYRADDIIN-EXAM-CENTER-SECOND-BRANCH/";
const TELEGRAM_URL = "https://t.me/Keyraddiinmedia";
const YOUTUBE_URL = "https://youtube.com/@keyraddiin-j2b";
const WEBSITE_URL = "https://keyraddiin-media.onrender.com";

// ==========================================
// HAARAA: Linkii Haaraa (Premium, Results, Grade 9)
// ==========================================
const PREMIUM_URL = "https://keyraddiin18-prog.github.io/KEYRADDIIN-PREMIUM-REGISTRATION/";
const MY_RESULTS_URL = "https://keyraddiin18-prog.github.io/KEYRADDIIN-EXAM-CENTER-SECOND-BRANCH/result.html";
const BIO_9_URL = "https://keyraddiin18-prog.github.io/grade9-natural-science/";
const MATH_9_URL = "https://keyraddiin18-prog.github.io/grade-9-maths-center/";

const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyWRY_YvoEzdvNABg-I9N6jadW5JqleX9c_Jj688sEnYsTUhIUfgBCUu8Qm9VobD04fYQ/exec"; 

const grades = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const mainContent = document.getElementById("appMain");

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    bindNavigation();
    renderHome();
    registerServiceWorker();
});

// --- THEME LOGIC ---
function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const isDark = localStorage.getItem("keyraddiin_theme") === "dark";
    
    if (isDark) {
        document.body.classList.add("dark-mode");
        if(themeToggle) themeToggle.textContent = "☀️";
    }
    
    if(themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const darkNow = document.body.classList.contains("dark-mode");
            localStorage.setItem("keyraddiin_theme", darkNow ? "dark" : "light");
            themeToggle.textContent = darkNow ? "☀️" : "🌙";
        });
    }
}

// --- NAVIGATION ---
function bindNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");
            
            const page = item.getAttribute("data-page");
            switch(page) {
                case "home": renderHome(); break;
                case "exams": showExamsScreen(); break;
                case "ai": showAIScreen(); break;
                case "planner": showPlannerScreen(); break;
                case "settings": showSettingsScreen(); break;
                default: renderHome();
            }
            window.scrollTo(0, 0); // Scroll to top on page change
        });
    });
}

// --- HOME DASHBOARD ---
function renderHome() {
    mainContent.innerHTML = `
        <div class="welcome-banner">
            <h2>Welcome back! 👋</h2>
            <p>Your learning journey continues here. Select your grade or explore resources below.</p>
        </div>
        
        <div class="section">
            <div class="section-title"><h2>Your Grade</h2><span>7–12</span></div>
            <div class="grade-grid">
                ${grades.map(g => `
                    <button class="grade-card" onclick="showGradeExams('${g}')">
                        <strong>${g}</strong><span>View Info</span>
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="section">
            <div class="section-title"><h2>Quick Access</h2></div>
            <div class="feature-list">
                <!-- HAARAA: Premium Registration -->
                <button class="feature-card" onclick="showPremiumScreen()">
                    <span class="feature-icon">💎</span>
                    <div class="feature-text">
                        <strong>Premium Registration</strong>
                        <small>Unlock full access (50 Birr)</small>
                    </div>
                    <span>›</span>
                </button>

                <button class="feature-card" onclick="window.open('${EXAM_CENTER_URL}', '_blank')">
                    <span class="feature-icon">📝</span>
                    <div class="feature-text">
                        <strong>Exam Center</strong>
                        <small>Find and take available exams</small>
                    </div>
                    <span>›</span>
                </button>
                <button class="feature-card" onclick="showAnnouncementsScreen()">
                    <span class="feature-icon">📢</span>
                    <div class="feature-text">
                        <strong>Announcements</strong>
                        <small>Latest KEYRADDIIN updates</small>
                    </div>
                    <span>›</span>
                </button>
            </div>
        </div>
    `;
}

// --- EXAMS ---
function showExamsScreen() {
    mainContent.innerHTML = `
        <button class="back-button" onclick="document.querySelector('.nav-item[data-page=home]').click();">← Home</button>
        <div class="section-title"><h2>Exam Center</h2></div>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">Choose your grade to access available exams and registration details.</p>
        
        <div class="grade-grid">
            ${grades.map(g => `
                <button class="grade-card" onclick="showGradeExams('${g}')">
                    <strong>${g}</strong><span>View Exams</span>
                </button>
            `).join('')}
        </div>

        <!-- HAARAA: My Results -->
        <div class="section-title" style="margin-top: 24px;"><h2>My Results</h2></div>
        <a class="feature-card" href="${MY_RESULTS_URL}" target="_blank">
            <span class="feature-icon">🏆</span>
            <div class="feature-text">
                <strong>View Exam Results</strong>
                <small>Check your recent exam scores</small>
            </div>
            <span>›</span>
        </a>
    `;
}

function showGradeExams(grade) {
    // HAARAA: Kutaa 9 qofaaf Biology fi Maths qopheessuu
    let grade9Extras = "";
    if (grade === "Grade 9") {
        grade9Extras = `
            <a class="feature-card" href="${BIO_9_URL}" target="_blank">
                <span class="feature-icon">🧬</span>
                <div class="feature-text">
                    <strong>BIOLOGY</strong>
                    <small>Grade 9 Natural Science</small>
                </div>
                <span>›</span>
            </a>
            <a class="feature-card" href="${MATH_9_URL}" target="_blank">
                <span class="feature-icon">📐</span>
                <div class="feature-text">
                    <strong>MATHS</strong>
                    <small>Grade 9 Maths Center</small>
                </div>
                <span>›</span>
            </a>
        `;
    }

    mainContent.innerHTML = `
        <button class="back-button" onclick="showExamsScreen()">← Back</button>
        <div class="section-title"><h2>${grade}</h2></div>
        
        <div class="feature-list">
            <!-- Duraanii (Hundaaf) -->
            <a class="feature-card" href="${EXAM_CENTER_URL}" target="_blank">
                <span class="feature-icon">📝</span>
                <div class="feature-text">
                    <strong>EXAM CENTER</strong>
                    <small>Open available exams for ${grade}</small>
                </div>
                <span>›</span>
            </a>
            <a class="feature-card" href="${EXAM_INFORMATION_URL}" target="_blank">
                <span class="feature-icon">📋</span>
                <div class="feature-text">
                    <strong>EXAM INFORMATION</strong>
                    <small>Registration and exam info</small>
                </div>
                <span>›</span>
            </a>

            <!-- HAARAA: Kutaa 9 yoo ta'e qofa asitti mul'ata -->
            ${grade9Extras}
        </div>
    `;
}

// --- HAARAA: PREMIUM & SUPPORT SCREEN ---
function showPremiumScreen() {
    mainContent.innerHTML = `
        <button class="back-button" onclick="document.querySelector('.nav-item[data-page=home]').click();">← Home</button>
        <div class="section-title"><h2>Premium Registration</h2></div>
        
        <div class="welcome-banner" style="margin-bottom: 16px; padding: 20px; text-align: center;">
            <h2 style="font-size: 24px;">💎 Fee: 50 Birr</h2>
            <p style="font-size: 13px;">Unlock premium features and exclusive exams.</p>
        </div>

        <a class="feature-card" href="${PREMIUM_URL}" target="_blank" style="background: var(--primary-purple); color: white; border: none; margin-bottom: 24px; justify-content: center;">
            <div class="feature-text" style="text-align: center;">
                <strong style="color: white; font-size: 16px;">Go to Registration Page</strong>
            </div>
        </a>

        <div class="section-title"><h2>Payment Details</h2></div>
        <div class="feature-list">
            <!-- M-Pesa Card -->
            <div class="feature-card" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                <strong style="color: var(--success);">📱 M-Pesa</strong>
                <small><b>Phone:</b> +251799574155</small>
                <small><b>Account Name:</b> Abdalla Jibrail</small>
            </div>
            
            <!-- E-Birr Card -->
            <div class="feature-card" style="flex-direction: column; align-items: flex-start; gap: 4px;">
                <strong style="color: var(--primary-purple);">💳 E-Birr</strong>
                <small><b>Phone:</b> +251995555866</small>
                <small><b>Account Name:</b> keyraddiin Abdella Jibraill</small>
            </div>

            <!-- Support Card -->
            <div class="feature-card" style="flex-direction: column; align-items: flex-start; gap: 4px; border: 1px solid var(--error);">
                <strong style="color: var(--error);">Need Help? 😫</strong>
                <small>Contact us on Telegram for assistance:</small>
                <a href="https://t.me/KeyR025" target="_blank" style="color: var(--primary-purple); font-weight: bold; margin-top: 4px; text-decoration: none;">@KeyR025</a>
            </div>
        </div>
    `;
}

// --- ANNOUNCEMENTS ---
function showAnnouncementsScreen() {
    mainContent.innerHTML = `
        <button class="back-button" onclick="document.querySelector('.nav-item[data-page=home]').click();">← Home</button>
        <div class="section-title"><h2>Announcements</h2></div>
        
        <div class="feature-list">
            <a class="feature-card" href="${TELEGRAM_URL}" target="_blank">
                <span class="feature-icon">📢</span>
                <div class="feature-text"><strong>Telegram</strong><small>Follow KEYRADDIIN MEDIA</small></div>
                <span>›</span>
            </a>
            <a class="feature-card" href="${YOUTUBE_URL}" target="_blank">
                <span class="feature-icon">▶️</span>
                <div class="feature-text"><strong>YouTube</strong><small>Watch educational content</small></div>
                <span>›</span>
            </a>
            <a class="feature-card" href="${WEBSITE_URL}" target="_blank">
                <span class="feature-icon">🌐</span>
                <div class="feature-text"><strong>Website</strong><small>Visit official website</small></div>
                <span>›</span>
            </a>
        </div>
    `;
}

// --- AI TUTOR ---
function showAIScreen() {
    mainContent.innerHTML = `
        <div class="section-title"><h2>AI Study Assistant</h2></div>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 16px;">Ask me anything about your subjects!</p>
        
        <div class="chat-container" id="chatContainer">
            <div class="message bot-message">Akkam! Ani gargaaraa barnootaa keeti. Maal si gargaaruu danda'a?</div>
        </div>

        <div class="chat-input-area">
            <input type="text" id="aiInput" placeholder="Type your question...">
            <button id="aiSendBtn">➤</button>
        </div>
    `;

    const chatContainer = document.getElementById("chatContainer");
    const aiInput = document.getElementById("aiInput");
    const aiSendBtn = document.getElementById("aiSendBtn");

    aiSendBtn.onclick = async () => {
        const text = aiInput.value.trim();
        if(!text) return;

        chatContainer.innerHTML += `<div class="message user-message">${escapeHTML(text)}</div>`;
        aiInput.value = "";
        chatContainer.scrollTop = chatContainer.scrollHeight;

        if(!BACKEND_URL || BACKEND_URL.includes("...")) {
            chatContainer.innerHTML += `<div class="message bot-message" style="color: #DC2626;">System Notice: BACKEND_URL missing.</div>`;
            return;
        }

        const loadingId = "loading-" + Date.now();
        chatContainer.innerHTML += `<div class="message bot-message" id="${loadingId}">AI thinking... ⏳</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                body: JSON.stringify({ prompt: text })
            });
            const data = await response.json();

            document.getElementById(loadingId)?.remove();

            if (data.error) throw new Error(data.error);
            
            chatContainer.innerHTML += `<div class="message bot-message">${escapeHTML(data.reply)}</div>`;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (err) {
            document.getElementById(loadingId)?.remove();
            chatContainer.innerHTML += `<div class="message bot-message" style="color:#DC2626;">Dhiifama, rakkoon uumameera. Interneetii kee ykn backend kee mirkaneessi.</div>`;
        }
    };
    
    aiInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") aiSendBtn.click();
    });
}

// --- PLANNER ---
function showPlannerScreen() {
    mainContent.innerHTML = `
        <div class="section-title"><h2>My Study Planner</h2></div>
        
        <div class="chat-input-area" style="margin-bottom: 24px;">
            <input type="text" id="taskInput" placeholder="New study task...">
            <button onclick="addTask()" style="background: var(--primary-navy);">Add</button>
        </div>

        <div id="taskList" class="feature-list"></div>
    `;
    renderTasks();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if(!text) return;

    const tasks = JSON.parse(localStorage.getItem("keyraddiin_tasks") || "[]");
    tasks.push({ id: Date.now(), text: text, completed: false });
    localStorage.setItem("keyraddiin_tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
}

function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("keyraddiin_tasks") || "[]");
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem("keyraddiin_tasks", JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("keyraddiin_tasks") || "[]");
    tasks = tasks.filter(t => t.id !== id);
    localStorage.setItem("keyraddiin_tasks", JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("keyraddiin_tasks") || "[]");
    
    if(tasks.length === 0) {
        taskList.innerHTML = `<p style="text-align:center; color:var(--text-muted); font-size:14px;">No tasks yet. Add one above!</p>`;
        return;
    }

    taskList.innerHTML = tasks.map(t => `
        <div class="feature-card" style="opacity: ${t.completed ? '0.6' : '1'}">
            <button onclick="toggleTask(${t.id})" style="background:none; border:none; font-size:20px; cursor:pointer;">${t.completed ? '✅' : '⬜'}</button>
            <div class="feature-text" style="text-decoration: ${t.completed ? 'line-through' : 'none'}">
                <strong>${escapeHTML(t.text)}</strong>
            </div>
            <button onclick="deleteTask(${t.id})" style="background:none; border:none; font-size:18px; cursor:pointer;">🗑️</button>
        </div>
    `).join('');
}

// --- SETTINGS ---
function showSettingsScreen() {
    mainContent.innerHTML = `
        <div class="section-title"><h2>Settings</h2></div>
        
        <div class="feature-list">
            <div class="feature-card">
                <div class="feature-text">
                    <strong>App Version</strong>
                    <small>v3.1 Professional</small>
                </div>
            </div>
            <button class="feature-card" onclick="clearAppData()" style="border-color: #DC2626; color: #DC2626;">
                <div class="feature-text">
                    <strong>Clear Planner Data</strong>
                    <small>Remove all saved tasks</small>
                </div>
            </button>
        </div>
    `;
}

function clearAppData() {
    if(confirm("Are you sure you want to clear your planner tasks?")) {
        localStorage.removeItem("keyraddiin_tasks");
        alert("Tasks cleared successfully.");
    }
}

// --- UTILS ---
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

// --- SERVICE WORKER REGISTRATION ---
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js')
                .then(registration => console.log('SW registered:', registration.scope))
                .catch(err => console.log('SW registration failed:', err));
        });
    }
}