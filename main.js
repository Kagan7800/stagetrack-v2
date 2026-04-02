document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('pc-container');
    const title = document.getElementById('status-title');
    const btnGrid = document.querySelector('.btn-grid');
    const buttons = document.querySelectorAll('.control-btn');

    btnGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.control-btn');
        if (!btn) return;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        const isKid = btn.getAttribute('data-kid') === 'true';
        title.innerText = mode.toUpperCase();
        if (isKid) {
            container.classList.add('kid-active');
            title.classList.add('kid-text');
        } else {
            container.classList.remove('kid-active');
            title.classList.remove('kid-text');
        }
    });
});
