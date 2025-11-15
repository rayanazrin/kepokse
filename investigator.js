// SECTION SWITCHING
function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";

    if (id === 'news') loadNews();
    if (id === 'reports') loadCategoryLists();
}

// ===============================
//   CATEGORY-BASED USER REPORTS
// ===============================

const reportCategories = {
    hack: [
        { name: "Alice", report: "Password stolen, cannot access account." },
        { name: "Daniel", report: "Unauthorized login detected in email." }
    ],
    malware: [
        { name: "Bob", report: "Device infected with ransomware." },
        { name: "Emily", report: "Popup malware spreading in browser." }
    ],
    cyberbully: [
        { name: "Charlie", report: "Harassed on social media with threats." },
        { name: "Farah", report: "Online bullying from classmates." }
    ]
};

// TOGGLE DROPDOWN
function toggleCategory(id) {
    const list = document.getElementById(id);
    list.style.display = (list.style.display === "block") ? "none" : "block";
}

// LOAD USERS INTO DROPDOWNS
function loadCategoryLists() {
    loadList('hack', 'hack-list');
    loadList('malware', 'malware-list');
    loadList('cyberbully', 'cyberbully-list');
}

function loadList(category, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';

    reportCategories[category].forEach((user, index) => {
        const btn = document.createElement('button');
        btn.classList.add('user-btn');
        btn.innerText = user.name;
        btn.addEventListener('click', () => showReportDetails(category, index));
        container.appendChild(btn);
    });
}

// SHOW DETAILS + CHATBOX
function showReportDetails(category, index) {
    const selected = reportCategories[category][index];

    const details = document.getElementById('report-details');
    details.innerHTML = `
        <h3>${selected.name}</h3>
        <p>${selected.report}</p>

        <div id="chatbox"></div>

        <div id="message-area">
            <input type="text" id="investigatorMessage" placeholder="Type your message...">
            <button onclick="sendInvestigatorMessage()">Send</button>
        </div>
    `;
}

// SEND MESSAGE TO CHATBOX
function sendInvestigatorMessage() {
    const input = document.getElementById('investigatorMessage');
    const text = input.value.trim();
    if (text === "") return;

    const chatbox = document.getElementById('chatbox');

    const msg = document.createElement('div');
    msg.classList.add('message', 'investigator-msg');
    msg.innerText = text;

    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
    input.value = "";
}

// ==========================
//    NEWS API + DASHBOARD
// ==========================

async function loadNews() {
    const newsFeed = document.getElementById('news-feed');
    newsFeed.innerHTML = "Loading news...";

    try {
        const response = await fetch('https://newsapi.org/v2/everything?q=cybersecurity&apiKey=YOUR_API_KEY');
        const data = await response.json();

        newsFeed.innerHTML = '';
        data.articles.forEach(article => {
            const li = document.createElement('li');
            li.innerText = article.title;
            li.addEventListener('click', () => window.open(article.url, '_blank'));
            newsFeed.appendChild(li);
        });
    } catch (err) {
        newsFeed.innerHTML = "Failed to load news.";
        console.error(err);
    }

    document.getElementById('dashboard-frame').src = "path-to-knime-dashboard.html";
}

// INIT
loadNews();



