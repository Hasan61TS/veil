// Main JavaScript handling
document.addEventListener('DOMContentLoaded', () => {
    // Initialize effects
    const vhsEffect = new VHSEffect();
    const glitchText = new GlitchText();

    // Hidden message handling
    const secretButton = document.querySelector('.secret-button');
    const hiddenAudio = document.getElementById('hidden-message');
    
    secretButton.addEventListener('click', () => {
        const code = prompt('ENTER ACCESS CODE:', '');
        // The coordinates are: 34°05'N 118°24'W, 40°43'N 74°00'W, 51°30'N 0°07'W
        // Code is: 34401851 (first numbers of each coordinate pair)
        if (code === '34401851') {
            window.location.href = './terminal.html';
            vhsEffect.triggerIntenseGlitch();
        } else {
            vhsEffect.triggerGlitch();
            const glitchText = document.createElement('div');
            glitchText.className = 'error-message glitch-text';
            glitchText.textContent = 'ACCESS DENIED';
            document.body.appendChild(glitchText);
            setTimeout(() => glitchText.remove(), 2000);
        }
    });

    // Hidden text reveal on highlight
    document.addEventListener('selectionchange', () => {
        const selection = window.getSelection().toString();
        if (selection.includes("THEY'RE IN THE FOOD")) {
            document.querySelector('.hidden-text').style.display = 'block';
            // Trigger glitch effect
            vhsEffect.triggerGlitch();
        }
    });

    // Coordinate puzzle handler
    document.querySelectorAll('.location').forEach(loc => {
        loc.addEventListener('click', () => {
            // Add to player's collected coordinates
            // When all correct coordinates are collected, reveal next clue
        });
    });
}); 