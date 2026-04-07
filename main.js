/**
 * STAGETRACK V2 - Core Logic Engine
 */
const state = {
    leftSidebar: ["CLOCK: 00:00:00", "TEMP: 180.0°C", "VOLTAGE: 12.4V"],
    rightSidebar: ["LATENCY: 14ms", "FPS: 0", "STATUS: ACTIVE"],
    fps: 0,
    temp: 180.0,
    isBooting: true
};

const logs = [
    "> FETCHING DATA PACKETS...",
    "> ENCRYPTING CHANNEL...",
    "> BYPASSING FIREWALL...",
    "> SYNCING CORES...",
    "> STABILIZING FLUX...",
    "> MEMORY LEAK DETECTED: RESOLVED",
    "> OPTIMIZING GPU PIPELINE..."
];

function addLog() {
    const logContainer = document.getElementById('terminal-log');
    if (!logContainer) return;
    
    const entry = document.createElement('div');
    entry.innerText = logs[Math.floor(Math.random() * logs.length)];
    logContainer.appendChild(entry);
    
    // Keep only last 10 logs
    if (logContainer.childNodes.length > 10) {
        logContainer.removeChild(logContainer.firstChild);
    }
    // Auto-scroll to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
}

async function updateSidebar(side, data) {
    const container = document.querySelector(`.sidebar-${side}`);
    if (!container) return;

    if (!state.isBooting) {
        container.querySelectorAll('.pill').forEach(p => p.classList.add('glitch-flash'));
        await new Promise(r => setTimeout(r, 120));
    }

    container.innerHTML = '';
    data.forEach(text => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        if (text.includes("FPS") || text.includes("CLOCK") || text.includes("TEMP")) pill.classList.add('pill-live');
        pill.innerText = text;
        container.appendChild(pill);
    });
}

async function runBootSequence() {
    const pcNode = document.querySelector('.pc-node');
    pcNode.classList.add('screen-booting'); 

    await updateSidebar('left', ["INITIALIZING...", "LOADING SENSORS...", "LINK START"]);
    await updateSidebar('right', ["NETWORK: UP", "GPU: READY", "MOAT: SECURE"]);
    
    setTimeout(() => {
        state.isBooting = false;
        pcNode.classList.remove('screen-booting');
        setInterval(addLog, 2000); // Start logging every 2 seconds
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
        state.temp += (Math.random() - 0.5) * 4;
        state.leftSidebar[1] = `TEMP: ${state.temp.toFixed(1)}°C`;
        
        document.body.style.background = state.temp > 185 ? "#4a0000" : "var(--moat-color)";
        state.rightSidebar[2] = state.temp > 185 ? "STATUS: WARNING" : "STATUS: ACTIVE";
        
        updateSidebar('left', state.leftSidebar);
        updateSidebar('right', state.rightSidebar);
        frames = 0;
        lastTimestamp = now;
    }
    requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', runBootSequence);
