/**
 * STAGETRACK V2 - Core Logic Engine
 */

const state = {
    leftSidebar: ["CLOCK: 00:00:00", "TEMP: 180.0°C", "VOLTAGE: 12.4V"],
    rightSidebar: ["LATENCY: 14ms", "FPS: 0", "STATUS: ACTIVE"],
    fps: 0,
    temp: 180.0
};

// --- RENDER ENGINE ---

async function updateSidebar(side, data) {
    const container = document.querySelector(`.sidebar-${side}`);
    if (!container) return;

    const oldPills = container.querySelectorAll('.pill');
    oldPills.forEach(p => p.classList.add('glitch-flash'));

    await new Promise(r => setTimeout(r, 120));

    container.innerHTML = '';
    data.forEach(text => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        
        // Add live-dot indicator for dynamic values
        if (text.includes("FPS") || text.includes("CLOCK") || text.includes("TEMP")) {
            pill.classList.add('pill-live');
        }
        
        pill.innerText = text;
        container.appendChild(pill);
    });
}

// --- SYSTEM MONITORS ---

let lastTimestamp = performance.now();
let frames = 0;

function tick(now) {
    frames++;
    
    if (now - lastTimestamp >= 1000) {
        // 1. Calculate FPS
        state.fps = frames;
        state.rightSidebar[1] = `FPS: ${state.fps}`;
        
        // 2. Sync Real-Time Clock
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        state.leftSidebar[0] = `CLOCK: ${time}`;

        // 3. Jitter Temperature & Safety Check
        state.temp += (Math.random() - 0.5) * 4;
        state.leftSidebar[1] = `TEMP: ${state.temp.toFixed(1)}°C`;
        
        // RED ALERT SYSTEM: Changes background if temp exceeds 185
        if (state.temp > 185) {
            document.body.style.background = "#4a0000"; 
            state.rightSidebar[2] = "STATUS: WARNING";
        } else {
            document.body.style.background = "var(--moat-color)";
            state.rightSidebar[2] = "STATUS: ACTIVE";
        }
        
        updateSidebar('left', state.leftSidebar);
        updateSidebar('right', state.rightSidebar);
        
        frames = 0;
        lastTimestamp = now;
    }
    
    requestAnimationFrame(tick);
}

// --- INITIALIZATION ---

function init() {
    updateSidebar('left', state.leftSidebar);
    updateSidebar('right', state.rightSidebar);
    requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', init);
