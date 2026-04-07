// 1. Central Data State
const stageState = {
  leftSidebar: ["SYSTEM READY", "TEMP: 180°C", "VOLTAGE: 12V"],
  rightSidebar: ["LATENCY: 14ms", "FPS: 60", "STATUS: ACTIVE"]
};

// 2. The Glitch & Update Function
async function updateSidebarUI(side, dataArray) {
  const container = document.querySelector(`.sidebar-${side}`);
  const existingPills = container.querySelectorAll('.pill');

  // Apply glitch to current pills
  existingPills.forEach(pill => pill.classList.add('glitch-flash'));

  // Wait for animation mid-point
  await new Promise(resolve => setTimeout(resolve, 150));

  // Clear and Build new pills
  container.innerHTML = '';
  dataArray.forEach(text => {
    const pill = document.createElement('div');
    pill.className = 'pill';
    pill.innerText = text;
    container.appendChild(pill);
  });
}

// 3. Initial Render
function init() {
  updateSidebarUI('left', stageState.leftSidebar);
  updateSidebarUI('right', stageState.rightSidebar);
}

// Run when page loads
window.addEventListener('DOMContentLoaded', init);

/** * PRO TIP: Call updateSidebarUI('left', ['NEW', 'DATA']) 
 * anytime you want to trigger the animation and change text.
 */
