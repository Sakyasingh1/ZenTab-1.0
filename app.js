/**
 * ZenTab 1.0 - Core Application Logic
 * Implements real-time state management, persistence, and feature logic.
 */

const ZenTab = {
    state: {
        activeTabId: 'dashboard',
        tabs: [
            { id: 'dashboard', title: 'Dashboard', url: 'zentab://dashboard', icon: '🏠', type: 'internal' }
        ],
        notes: JSON.parse(localStorage.getItem('zt_notes')) || [
            { id: 1, title: 'Welcome Note', content: 'Welcome to ZenTab! Start your deep work session here.', date: new Date().toISOString() }
        ],
        blockedDomains: JSON.parse(localStorage.getItem('zt_blocked')) || ['*.facebook.com', '*.twitter.com'],
        goals: JSON.parse(localStorage.getItem('zt_goals')) || [
            { id: 1, text: 'Complete Research on AI Ethics', tag: 'study', completed: true },
            { id: 2, text: 'Draft Project Proposal', tag: 'work', completed: false },
            { id: 3, text: '30m Daily Meditation', tag: 'health', completed: false }
        ],
        timer: {
            timeLeft: 25 * 60,
            isRunning: false,
            sessionCount: 1,
            totalSessions: 4
        },
        analytics: {
            focusScore: 84,
            productiveTime: 75,
            neutralTime: 15,
            distractingTime: 10
        }
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderAll();
        this.startClock();
        this.startActivityTracker();
    },

    cacheDOM() {
        this.dom = {
            tabsContainer: document.getElementById('tabs-container'),
            addTabBtn: document.getElementById('add-tab-btn'),
            addressInput: document.getElementById('address-input'),
            contentArea: document.getElementById('content-area'),
            sidebarItems: document.querySelectorAll('.side-item'),
            notesPanel: document.getElementById('notes-panel'),
            toggleNotesBtn: document.getElementById('toggle-notes'),
            clockEl: document.getElementById('clock'),
            
            // Timer
            minutesEl: document.getElementById('timer-minutes'),
            secondsEl: document.getElementById('timer-seconds'),
            progressRing: document.getElementById('timer-progress'),
            startTimerBtn: document.getElementById('start-timer'),
            resetTimerBtn: document.getElementById('reset-timer'),

            // Views
            views: document.querySelectorAll('.view'),
            
            // Goal List
            goalList: document.querySelector('.goal-list'),

            // Blocker
            ruleList: document.querySelector('.rule-list'),
            addRuleInput: document.querySelector('.add-rule input'),
            addRuleBtn: document.querySelector('.add-rule .btn-primary'),

            // Notes
            notesList: document.querySelector('.notes-list'),
            noteEditor: document.querySelector('.note-editor textarea'),
            addNoteBtn: document.getElementById('add-note-btn')
        };
    },

    bindEvents() {
        // Tab Events
        this.dom.addTabBtn.onclick = () => this.addTab('New Tab', 'about:blank', '🌐');
        
        // Sidebar Navigation
        this.dom.sidebarItems.forEach(item => {
            item.onclick = () => {
                const view = item.getAttribute('data-view');
                if (view) this.switchView(view);
            };
        });

        // Notes Events
        this.dom.toggleNotesBtn.onclick = () => {
            this.dom.notesPanel.classList.toggle('open');
            this.dom.toggleNotesBtn.classList.toggle('active');
        };
        this.dom.addNoteBtn.onclick = () => this.addNote();
        this.dom.noteEditor.oninput = (e) => this.updateActiveNote(e.target.value);

        // Timer Events
        this.dom.startTimerBtn.onclick = () => this.toggleTimer();
        this.dom.resetTimerBtn.onclick = () => this.resetTimer();

        // Blocker Events
        this.dom.addRuleBtn.onclick = () => this.addBlockRule();
        this.dom.addRuleInput.onkeypress = (e) => { if(e.key === 'Enter') this.addBlockRule(); };

        // Address Bar
        this.dom.addressInput.onkeypress = (e) => {
            if (e.key === 'Enter') this.navigate(e.target.value);
        };

        // AI Events
        document.getElementById('ai-auth-btn').onclick = () => this.toggleAIAuth();
        document.getElementById('save-ai-config').onclick = () => this.saveAIConfig();
        document.getElementById('send-ai-msg').onclick = () => this.sendAIMessage();
        document.getElementById('ai-input').onkeypress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendAIMessage();
            }
        };

        // Calculator Events
        document.querySelectorAll('.calc-buttons button').forEach(btn => {
            btn.onclick = () => this.updateCalculator(btn.textContent);
        });

        // Converter Events
        const convInput = document.querySelector('.converter input');
        const convSelect = document.querySelector('.converter select');
        if(convInput) {
            convInput.oninput = () => this.updateConverter();
            convSelect.onchange = () => this.updateConverter();
        }
    },

    // --- Tab Management ---
    addTab(title, url, icon = '🌐') {
        const id = 'tab-' + Date.now();
        this.state.tabs.push({ id, title, url, icon, type: 'web' });
        this.renderTabs();
        this.switchTab(id);
    },

    navigate(url) {
        if (!url.startsWith('http') && !url.startsWith('zentab://')) {
            url = 'https://' + url;
        }

        // Mock Phishing Shield
        if (url.includes('phish') || url.includes('malware')) {
            alert('🚫 ZenTab Phishing Shield: This site has been blocked for your safety.');
            return;
        }

        const activeTab = this.state.tabs.find(t => t.id === this.state.activeTabId);
        if (activeTab) {
            activeTab.url = url;
            activeTab.title = url.replace('https://', '').split('/')[0];
            activeTab.type = url.startsWith('zentab://') ? 'internal' : 'web';
            this.switchTab(activeTab.id);
        }
    },

    // --- Vault Logic ---
    unlockVault() {
        const pass = document.querySelector('.vault-auth input').value;
        if (pass === 'admin') { // Mock master password
            document.getElementById('vault-auth').style.display = 'none';
            document.getElementById('vault-content').style.display = 'block';
            this.renderVault();
        } else {
            alert('Incorrect master password. Hint: admin');
        }
    },

    renderVault() {
        const vaultList = document.querySelector('.vault-list');
        const entries = [
            { service: 'GitHub', pass: '••••••••' },
            { service: 'Google', pass: '••••••••' },
            { service: 'Canvas', pass: '••••••••' }
        ];
        vaultList.innerHTML = entries.map(e => `
            <div class="vault-item">
                <span class="service">${e.service}</span>
                <span class="pass">${e.pass}</span>
                <button class="btn btn-secondary">Copy</button>
            </div>
        `).join('');
    },

    // --- Utility Logic ---
    updateCalculator(val) {
        const display = document.getElementById('calc-display');
        if (val === '=') {
            try {
                // Sanitize and evaluate (safe for prototype)
                const expr = display.value.replace('×', '*').replace('÷', '/');
                display.value = eval(expr);
            } catch {
                display.value = 'Error';
            }
        } else if (display.value === '0' || display.value === 'Error') {
            display.value = val;
        } else {
            display.value += val;
        }
    },

    updateConverter() {
        const val = document.querySelector('.converter input').value;
        const type = document.querySelector('.converter select').value;
        const resultEl = document.querySelector('.converter .result');
        let res;
        if (type === 'Kilograms to Pounds') res = (val * 2.20462).toFixed(2) + ' lbs';
        else res = ((val * 9/5) + 32).toFixed(2) + ' °F';
        resultEl.textContent = `Result: ${res}`;
    },

    // --- ZenAI Bridge Logic ---
    toggleAIAuth() {
        const panel = document.getElementById('ai-auth-panel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    },

    saveAIConfig() {
        const provider = document.getElementById('ai-provider').value;
        const key = document.getElementById('ai-api-key').value;
        if (key) {
            localStorage.setItem(`zt_ai_${provider}`, key);
            alert(`Configuration saved for ${provider}!`);
            this.toggleAIAuth();
        }
    },

    async sendAIMessage() {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        this.addChatMessage('user', text);
        input.value = '';

        // Simulate AI thinking
        const provider = document.getElementById('ai-provider').value;
        const messages = document.getElementById('ai-chat-messages');
        const typingId = 'typing-' + Date.now();
        messages.innerHTML += `
            <div class="message system" id="${typingId}">
                <span class="avatar">✨</span>
                <div class="msg-content">ZenAI is thinking (${provider})...</div>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;

        await new Promise(r => setTimeout(r, 1500));
        document.getElementById(typingId).remove();

        // Add system response
        let response = `I've analyzed your request using ${provider.toUpperCase()}. `;
        if (text.toLowerCase().includes('summarize')) {
            response += "Based on your current session data, here is a summary of your recent focus activity: You've completed 6 Pomodoros and avoided 12 trackers. Your focus score is exceptional at 84.";
        } else {
            response += "As your ZenTab companion, I recommend staying on task for another 15 minutes before taking your next scheduled break. Your goal 'Draft Project Proposal' is currently 40% complete.";
        }
        this.addChatMessage('system', response);
    },

    addChatMessage(role, text) {
        const container = document.getElementById('ai-chat-messages');
        const msgEl = document.createElement('div');
        msgEl.className = `message ${role}`;
        msgEl.innerHTML = `
            <span class="avatar">${role === 'user' ? '👤' : '✨'}</span>
            <div class="msg-content">${text}</div>
        `;
        container.appendChild(msgEl);
        container.scrollTop = container.scrollHeight;
    },

    switchTab(id) {
        this.state.activeTabId = id;
        const tab = this.state.tabs.find(t => t.id === id);
        if (tab) {
            this.dom.addressInput.value = tab.url;
            if (tab.type === 'internal') {
                this.switchView(tab.id);
            } else {
                this.renderWebView(tab.url);
            }
        }
        this.renderTabs();
    },

    closeTab(id, e) {
        e.stopPropagation();
        if (this.state.tabs.length === 1) return;
        const index = this.state.tabs.findIndex(t => t.id === id);
        this.state.tabs.splice(index, 1);
        if (this.state.activeTabId === id) {
            this.switchTab(this.state.tabs[this.state.tabs.length - 1].id);
        } else {
            this.renderTabs();
        }
    },

    // --- View Management ---
    switchView(viewId) {
        this.dom.views.forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(`${viewId}-view`);
        if (targetView) targetView.classList.add('active');

        this.dom.sidebarItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-view') === viewId);
        });

        this.dom.addressInput.value = `zentab://${viewId}`;
    },

    renderWebView(url) {
        this.dom.views.forEach(v => v.classList.remove('active'));
        // Create mock web content
        let webView = document.getElementById('web-view');
        if (!webView) {
            webView = document.createElement('section');
            webView.id = 'web-view';
            webView.className = 'view active';
            this.dom.contentArea.appendChild(webView);
        } else {
            webView.classList.add('active');
        }
        
        webView.innerHTML = `
            <div class="web-content-frame">
                <div class="web-loader">
                    <div class="spinner"></div>
                    <p>Loading ${url}...</p>
                </div>
                <div class="web-mock-page">
                    <h1>${url}</h1>
                    <p>This is a simulated web view. In the Electron app, this would be a secure Chromium WebContentsView.</p>
                    <div class="security-card">
                        <h3>Security Report</h3>
                        <ul>
                            <li>SSL: Valid (2048-bit)</li>
                            <li>Trackers: 0 detected</li>
                            <li>Phishing: Safe</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },

    // --- Feature Logic ---
    addNote() {
        const note = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            date: new Date().toISOString()
        };
        this.state.notes.unshift(note);
        this.saveNotes();
        this.renderNotes();
        this.editNote(note.id);
    },

    editNote(id) {
        const note = this.state.notes.find(n => n.id === id);
        if (note) {
            this.state.activeNoteId = id;
            this.dom.noteEditor.value = note.content;
            this.renderNotes();
        }
    },

    updateActiveNote(content) {
        const note = this.state.notes.find(n => n.id === this.state.activeNoteId);
        if (note) {
            note.content = content;
            note.title = content.split('\n')[0].substring(0, 20) || 'New Note';
            this.saveNotes();
            this.renderNotes(true); // Don't re-render editor
        }
    },

    saveNotes() {
        localStorage.setItem('zt_notes', JSON.stringify(this.state.notes));
    },

    addBlockRule() {
        const val = this.dom.addRuleInput.value.trim();
        if (val) {
            this.state.blockedDomains.push(val);
            this.dom.addRuleInput.value = '';
            localStorage.setItem('zt_blocked', JSON.stringify(this.state.blockedDomains));
            this.renderBlocker();
        }
    },

    removeBlockRule(index) {
        this.state.blockedDomains.splice(index, 1);
        localStorage.setItem('zt_blocked', JSON.stringify(this.state.blockedDomains));
        this.renderBlocker();
    },

    toggleTimer() {
        if (this.state.timer.isRunning) {
            clearInterval(this.timerInterval);
            this.dom.startTimerBtn.textContent = 'Start Session';
        } else {
            this.dom.startTimerBtn.textContent = 'Pause Session';
            this.timerInterval = setInterval(() => {
                if (this.state.timer.timeLeft > 0) {
                    this.state.timer.timeLeft--;
                    this.renderTimer();
                } else {
                    this.onTimerComplete();
                }
            }, 1000);
        }
        this.state.timer.isRunning = !this.state.timer.isRunning;
    },

    onTimerComplete() {
        clearInterval(this.timerInterval);
        alert('Focus session complete! Take a short break.');
        this.state.timer.sessionCount++;
        this.resetTimer();
    },

    resetTimer() {
        clearInterval(this.timerInterval);
        this.state.timer.timeLeft = 25 * 60;
        this.state.timer.isRunning = false;
        this.dom.startTimerBtn.textContent = 'Start Session';
        this.renderTimer();
    },

    // --- Rendering ---
    renderAll() {
        this.renderTabs();
        this.renderNotes();
        this.renderBlocker();
        this.renderGoals();
        this.renderTimer();
    },

    renderTabs() {
        this.dom.tabsContainer.innerHTML = '';
        this.state.tabs.forEach(tab => {
            const tabEl = document.createElement('div');
            tabEl.className = `tab ${tab.id === this.state.activeTabId ? 'active' : ''}`;
            tabEl.innerHTML = `
                <span class="tab-icon">${tab.icon}</span>
                <span class="tab-title">${tab.title}</span>
                <span class="tab-close" onclick="ZenTab.closeTab('${tab.id}', event)">×</span>
            `;
            tabEl.onclick = () => this.switchTab(tab.id);
            this.dom.tabsContainer.appendChild(tabEl);
        });
    },

    renderNotes(skipEditor = false) {
        this.dom.notesList.innerHTML = '';
        this.state.notes.forEach(note => {
            const noteEl = document.createElement('div');
            noteEl.className = `note-item ${note.id === this.state.activeNoteId ? 'active' : ''}`;
            noteEl.innerHTML = `
                <div class="note-title">${note.title}</div>
                <div class="note-preview">${note.content.substring(0, 30)}...</div>
                <div class="note-date">${new Date(note.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            `;
            noteEl.onclick = () => this.editNote(note.id);
            this.dom.notesList.appendChild(noteEl);
        });
    },

    renderBlocker() {
        this.dom.ruleList.innerHTML = '';
        this.state.blockedDomains.forEach((domain, i) => {
            const li = document.createElement('li');
            li.className = 'rule-item';
            li.innerHTML = `<span>${domain}</span> <button class="remove" onclick="ZenTab.removeBlockRule(${i})">×</button>`;
            this.dom.ruleList.appendChild(li);
        });
    },

    renderGoals() {
        this.dom.goalList.innerHTML = '';
        this.state.goals.forEach(goal => {
            const li = document.createElement('li');
            li.className = 'goal-item';
            li.innerHTML = `
                <input type="checkbox" id="goal-${goal.id}" ${goal.completed ? 'checked' : ''}>
                <label for="goal-${goal.id}">${goal.text}</label>
                <span class="tag ${goal.tag}">${goal.tag}</span>
            `;
            li.querySelector('input').onchange = (e) => {
                goal.completed = e.target.checked;
                localStorage.setItem('zt_goals', JSON.stringify(this.state.goals));
            };
            this.dom.goalList.appendChild(li);
        });
    },

    renderTimer() {
        const mins = Math.floor(this.state.timer.timeLeft / 60);
        const secs = this.state.timer.timeLeft % 60;
        this.dom.minutesEl.textContent = mins.toString().padStart(2, '0');
        this.dom.secondsEl.textContent = secs.toString().padStart(2, '0');
        
        const total = 25 * 60;
        const offset = 880 - (this.state.timer.timeLeft / total) * 880;
        this.dom.progressRing.style.strokeDashoffset = offset;
    },

    startClock() {
        const update = () => {
            const now = new Date();
            this.dom.clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };
        setInterval(update, 1000);
        update();
    },

    startActivityTracker() {
        // Mock activity tracker
        setInterval(() => {
            this.state.analytics.focusScore = Math.min(100, this.state.analytics.focusScore + (this.state.timer.isRunning ? 0.1 : -0.05));
            document.querySelector('.stat-value').textContent = Math.round(this.state.analytics.focusScore);
        }, 5000);
    }
};

ZenTab.init();
