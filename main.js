/**
 * STAGETRACK V2 - Core Logic
 * Best Practices: State Management, Decoupled Rendering, RAF Loop
 */

const state = {
    leftSidebar: ["SYSTEM READY", "TEMP: 180°C", "VOLTAGE: 12V"],
    rightSidebar: ["LATENCY: 14ms", "FPS: 0", "STATUS: ACTIVE"],
    fps: 0
};

// --- RENDER ENGINE ---

/**
 * Updates a specific sidebar with glitch effects
 * @param {string} side - 'left' or 'right'
 * @param {string[]} data - Array of strings for the pills
 */
async function updateSidebar(side, data) {
    const container = document.querySelector(`.sidebar-${side}`);
    if (!container) return;

    // Apply glitch to existing elements
    const oldPills = container.querySelectorAll('.pill');
    oldPills.forEach(p => p.classList.add('glitch-flash'));

    // Wait for the "digital snap"
    await new Promise(r => setTimeout(r, 120));

    container.innerHTML = '';
    data.forEach(text => {
        const pill = document.createElement('div');
        pill.className = 'pill';
        if (text.includes("FPS")) pill.classList.add('pill-live');
        pill.innerText = text;
        container.appendChild(pill);
    });
}

// --- SYSTEM PERFORMANCE MONITOR ---

let lastTimestamp = performance.now();
let frames = 0;

function tick(now) {
    frames++;
    
    // Every 1 second, update the state and UI
    if (now - lastTimestamp >= 1000) {
        state.fps = frames;
        state.rightSidebar[1] = `FPS: ${state.fps}`;
        
        // Dynamic update
        updateSidebar('right', state.rightSidebar);
        
        frames = 0;
        lastTimestamp = now;
    }
    
    requestAnimationFrame(tick);
}

// --- INITIALIZATION ---

function init() {
    console.log("StageTrack V2: System Initialized");
    updateSidebar('left', state.leftSidebar);
    updateSidebar('right', state.rightSidebar);
    requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', init);
