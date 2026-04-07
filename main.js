/**
 * STAGETRACK V2 - Core Logic Engine
 * Features: RAF Performance Monitor, Interactive Modes, Thermal Failsafe, and Audio Alerts
 */

const initialState = {
    leftSidebar: ["CLOCK: 00:00:00", "TEMP: 180.0°C", "VOLTAGE: 12.4V"],
    rightSidebar: ["LATENCY: 14ms", "FPS: 0", "MODE: NEUTRAL"],
    fps: 0,
    temp: 180.0,
    isBooting: true,
    isDead: false,
    currentMode: 'NEUTRAL' // NEUTRAL, OVERCLOCK, STEALTH
};

let state = { ...initialState };
let lastTimestamp = performance.now();
let frames = 0;

// --- AUDIO ENGINE ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playAlertTone(freq = 440, duration = 0.1) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + duration);
}

// --- SYSTEM CONTROLS ---

function switchMode() {
    const modes = ['NEUTRAL', 'OVERCLOCK', 'STEALTH'];
    state.currentMode = modes[(modes.indexOf(state.currentMode) + 1) % modes.length];
    playAlertTone(660, 0.05);
    addLog(`> MODE CHANGED: ${state.currentMode}`);
    updateSidebar('right', state.rightSidebar);
}

function rebootSystem() {
    state = { ...initialState, isBooting: false };
    document.querySelector('.pc-node').classList.remove('system-shutdown');
    document.getElementById('reboot-btn').style.display = 'none';
    addLog("> REBOOTING CORE...");
    requestAnimationFrame(tick);
}

function addLog(text) {
    const log = document.getElementById('terminal-log');
    if (!log) return;
    const entry = document.createElement('div');
    entry.innerText = text || "> DATA PACKET SYNC...";
    log.appendChild(entry);
    if (log.childNodes.length > 10) log.removeChild(log.firstChild);
    log.scrollTop = log.scrollHeight;
}

// --- RENDER & TICK ---

async function updateSidebar(side, data) {
    const container = document.querySelector(`.sidebar-${side}`);
    if (!container) return;
    container.innerHTML = '';
    data.forEach(text => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        if (text.match(/FPS|CLOCK|TEMP|MODE/)) pill.classList.add('pill-live');
        pill.innerText = text;
        pill.onclick = switchMode;
        container.appendChild(pill);
    });
}

function tick(now) {
    if (state.isDead) return;
    frames++;
    if (now - lastTimestamp >= 1000) {
        state.fps = frames;
        state.rightSidebar[1] = `FPS: ${state.fps}`;
        state.rightSidebar[2] = `MODE: ${state.currentMode}`;
        state.leftSidebar[0] = `CLOCK: ${new Date().toLocaleTimeString('en-GB', { hour12: false })}`;
        
        // Mode-based Thermodynamics
        if(state.currentMode === 'OVERCLOCK') state.temp += 2.5;
        else if(state.currentMode === 'STEALTH') state.temp -= 0.8;
        else state.temp += (Math.random() - 0.5) * 2;
        state.leftSidebar[1] = `TEMP: ${state.temp.toFixed(1)}°C`;

        // Safety Protocols
        if (state.temp > 250) {
            state.isDead = true;
            document.querySelector('.pc-node').classList.add('system-shutdown');
            document.getElementById('reboot-btn').style.display = 'block';
            playAlertTone(110, 1.5);
        } else if (state.temp > 200) {
            document.body.style.background = "#ff0000";
            playAlertTone(880, 0.1);
        } else {
            const colors = { NEUTRAL: "#0b2fa3", OVERCLOCK: "#4a0000", STEALTH: "#1a1a1a" };
            document.body.style.background = colors[state.currentMode];
        }

        updateSidebar('left', state.leftSidebar);
        updateSidebar('right', state.rightSidebar);
        frames = 0;
        lastTimestamp = now;
    }
    requestAnimationFrame(tick);
}

async function runBootSequence() {
    const pcNode = document.querySelector('.pc-node');
    pcNode.classList.add('screen-booting'); 
    await updateSidebar('left', ["INIT_CORE...", "SENSORS_ON...", "LINK_START"]);
    await updateSidebar('right', ["NET_UP", "GPU_READY", "MODE: NEUTRAL"]);
    setTimeout(() => {
        state.isBooting = false;
        pcNode.classList.remove('screen-booting');
        setInterval(() => addLog(), 3000);
        requestAnimationFrame(tick);
    }, 2000);
}

document.addEventListener('DOMContentLoaded', runBootSequence);
