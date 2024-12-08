// Text glitch effects
class GlitchText {
    constructor() {
        this.glitchTexts = document.querySelectorAll('.glitch-text');
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.init();
    }

    init() {
        this.glitchTexts.forEach(text => {
            const original = text.textContent;
            text.addEventListener('mouseover', () => this.glitch(text, original));
        });
    }

    glitch(element, original) {
        let iterations = 0;
        const maxIterations = 10;
        
        const interval = setInterval(() => {
            element.textContent = original
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return original[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            iterations += 1/3;
            
            if (iterations >= maxIterations) {
                clearInterval(interval);
                element.textContent = original;
            }
        }, 30);
    }
} 