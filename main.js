/**
 * STAGETRACK V2 - Interactive Mode Logic
 */
const state = {
    leftSidebar: ["CLOCK: 00:00:00", "TEMP: 180.0°C", "VOLTAGE: 12.4V"],
    rightSidebar: ["LATENCY: 14ms", "FPS: 0", "MODE: NEUTRAL"],
    fps: 0,
    temp: 180.0,
    isBooting: true,
    currentMode: 'NEUTRAL' // NEUTRAL, OVERCLOCK, STEALTH
};

const modeSettings = {
    NEUTRAL: { color: "#0b2fa3", log: "> SYSTEM NORMAL" },
    OVERCLOCK: { color: "#4a0000", log: "> CORE VOLTAGE INCREASED" },
    STEALTH: { color: "#1a1a1a", log: "> THERMAL MASK ACTIVE" }
};

function addLog(customText) {
    const logContainer = document.getElementById('terminal-log');
    if (!logContainer) return;
    const entry = document.createElement('div');
    entry.innerText = customText || "> DATA PACKET RECEIVED";
    logContainer.appendChild(entry);
    if (logContainer.childNodes.length > 10) logContainer.removeChild(logContainer.firstChild);
    logContainer.scrollTop = logContainer.scrollHeight;
}

function switchMode() {
    const modes = ['NEUTRAL', 'OVERCLOCK', 'STEALTH'];
    let idx = modes.indexOf(state.currentMode);
    state.currentMode = modes[(idx + 1) % modes.length];
    
    state.rightSidebar[2] = `MODE: ${state.currentMode}`;
    document.body.style.background = modeSettings[state.currentMode].color;
    addLog(modeSettings[state.currentMode].log);
    
    updateSidebar('right', state.rightSidebar);
}

async function updateSidebar(side, data) {
    const container = document.querySelector(`.sidebar-${side}`);
    if (!container) return;

    container.innerHTML = '';
    data.forEach(text => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        if (text.includes("FPS") || text.includes("CLOCK") || text.includes("MODE")) pill.classList.add('pill-live');
        pill.innerText = text;
        
        // Make pills clickable to switch modes
        pill.style.cursor = "pointer";
        pill.onclick = switchMode;
        
        container.appendChild(pill);
    });
}

async function runBootSequence() {
    const pcNode = document.querySelector('.pc-node');
    pcNode.classList.add('screen-booting'); 
    await updateSidebar('left', ["INITIALIZING...", "SENSORS...", "ONLINE"]);
    await updateSidebar('right', ["NET: OK", "GPU: OK", "MODE: NEUTRAL"]);
    
    setTimeout(() => {
        state.isBooting = false;
        pcNode.classList.remove('screen-booting');
        setInterval(() => addLog(), 3000);
        requestAnimationFrame(tick);
    }, 2000);
}

let lastTimestamp = performance.now();
let frames = 0;

function tick(now) {
    frames++;
    if (now - lastTimestamp >= 1000) {
        state.fps = frames;
        state.rightSidebar[1] = `FPS: ${state.fps}`;
        state.leftSidebar[0] = `CLOCK: ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`;
        
        // Only jitter temp in Neutral mode; Overclock makes it rise
        if(state.currentMode === 'OVERCLOCK') state.temp += 1.5;
        else if(state.currentMode === 'STEALTH') state.temp -= 1.0;
        else state.temp += (Math.random() - 0.5) * 2;

        state.leftSidebar[1] = `TEMP: ${state.temp.toFixed(1)}°C`;
        
        updateSidebar('left', state.leftSidebar);
        updateSidebar('right', state.rightSidebar);
        frames = 0;
        lastTimestamp = now;
    }
    requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', runBootSequence);
