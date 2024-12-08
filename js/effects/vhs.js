// VHS effect handling
class VHSEffect {
    constructor() {
        this.tracking = 0;
        this.lastTime = 0;
        this.glitchProbability = 0.03;
        this.init();
        this.createStaticOverlay();
    }

    init() {
        this.addRandomTracking();
        this.addRandomGlitches();
        this.addIntenseGlitches();
    }

    createStaticOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'static-overlay';
        document.querySelector('.vhs-effect').appendChild(overlay);
        this.staticOverlay = overlay;
    }

    addRandomTracking() {
        setInterval(() => {
            const content = document.querySelector('.content');
            if (Math.random() < 0.15) {
                const intensity = Math.random() * 15 - 7.5;
                content.style.transform = `translateX(${intensity}px)`;
                setTimeout(() => {
                    content.style.transform = 'translateX(0)';
                }, 50 + Math.random() * 100);
            }
        }, 1000);
    }

    addRandomGlitches() {
        setInterval(() => {
            if (Math.random() < this.glitchProbability) {
                this.triggerGlitch();
            }
        }, 500);
    }

    addIntenseGlitches() {
        setInterval(() => {
            if (Math.random() < 0.1) {
                this.triggerIntenseGlitch();
            }
        }, 5000);
    }

    triggerGlitch() {
        const content = document.querySelector('.content');
        const glitchType = Math.floor(Math.random() * 3);
        
        switch(glitchType) {
            case 0:
                // Vertical slice
                content.style.clipPath = `inset(${Math.random() * 100}% 0 ${Math.random() * 100}% 0)`;
                break;
            case 1:
                // Horizontal slice
                content.style.clipPath = `inset(0 ${Math.random() * 100}% 0 ${Math.random() * 100}%)`;
                break;
            case 2:
                // RGB split
                content.style.textShadow = `
                    ${Math.random() * 10 - 5}px 0 rgba(255,0,0,0.5),
                    ${Math.random() * -10 + 5}px 0 rgba(0,255,0,0.5),
                    ${Math.random() * 10 - 5}px 0 rgba(0,0,255,0.5)
                `;
                break;
        }

        // Flash static
        this.staticOverlay.style.opacity = '0.1';
        
        setTimeout(() => {
            content.style.clipPath = 'none';
            content.style.textShadow = 'none';
            this.staticOverlay.style.opacity = '0';
        }, 50 + Math.random() * 100);
    }

    triggerIntenseGlitch() {
        const duration = 1000 + Math.random() * 2000;
        const intervals = [];
        const content = document.querySelector('.content');
        
        // Rapid glitch sequence
        for(let i = 0; i < duration/50; i++) {
            intervals.push(setTimeout(() => {
                this.triggerGlitch();
                this.staticOverlay.style.opacity = '0.3';
                content.style.filter = `
                    hue-rotate(${Math.random() * 360}deg)
                    saturate(${2 + Math.random() * 8})
                `;
            }, i * 50));
        }

        // Reset after sequence
        setTimeout(() => {
            intervals.forEach(clearTimeout);
            content.style.filter = '';
            this.staticOverlay.style.opacity = '0';
        }, duration);
    }
} 