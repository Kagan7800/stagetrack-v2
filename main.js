// 1. Central Data State
const stageState = {
  leftSidebar: ["SYSTEM READY", "TEMP: 180°C", "VOLTAGE: 12V"],
  rightSidebar: ["LATENCY: 14ms", "FPS: 0", "STATUS: ACTIVE"] // FPS starts at 0
};

// 2. The Glitch & Update Function
async function updateSidebarUI(side, dataArray) {
  const container = document.querySelector(`.sidebar-${side}`);
  if (!container) return;

  const existingPills = container.querySelectorAll('.pill');
  existingPills.forEach(pill => pill.classList.add('glitch-flash'));

  await new Promise(resolve => setTimeout(resolve, 150));

  container.innerHTML = '';
  dataArray.forEach(text => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.innerText = text;
    container.appendChild(pill);
  });
}

// 3. Live FPS Tracker Logic
let lastFrameTime = performance.now();
let frameCount = 0;

function updateFPS() {
  const now = performance.now();
  frameCount++;

  if (now - lastFrameTime >= 1000) {
    const fps = frameCount;
    // Update the state
    stageState.rightSidebar[1] = `FPS: ${fps}`;
    
    // Only update the right sidebar UI to show the new FPS
    updateSidebarUI('right', stageState.rightSidebar);

    frameCount = 0;
    lastFrameTime = now;
  }

  requestAnimationFrame(updateFPS);
}

// 4. Initial Render & Start Loop
function init() {
  updateSidebarUI('left', stageState.leftSidebar);
  updateSidebarUI('right', stageState.rightSidebar);
  
  // Start the live FPS counter
  requestAnimationFrame(updateFPS);
}

window.addEventListener('DOMContentLoaded', init);
