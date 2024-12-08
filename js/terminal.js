class AudioController {
    constructor() {
        this.audio = document.getElementById('briefing');
        this.playButton = document.querySelector('.play-button');
        this.progress = document.querySelector('.progress');
        this.progressBar = document.querySelector('.progress-bar');
        this.timeDisplay = document.querySelector('.time-display');
        this.isPlaying = false;
        
        this.initializeEvents();
    }

    initializeEvents() {
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.playButton.textContent = '▶';
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audio.pause();
            this.playButton.textContent = '▶';
        } else {
            this.audio.play();
            this.playButton.textContent = '⏸';
        }
        this.isPlaying = !this.isPlaying;
    }

    updateProgress() {
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progress.style.width = percent + '%';
        
        const minutes = Math.floor(this.audio.currentTime / 60);
        const seconds = Math.floor(this.audio.currentTime % 60);
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        this.audio.currentTime = percent * this.audio.duration;
    }
}

class Terminal {
    constructor() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('output');
        this.status = document.querySelector('.terminal-status');
        this.protocolInput = document.getElementById('protocol-input');
        this.unblurButton = document.getElementById('unblur-button');
        this.terminalInterface = document.getElementById('terminal-interface');
        this.passwordOverlay = document.getElementById('password-overlay');
        this.vhsEffect = new VHSEffect();
        
        this.initializeTerminal();
        this.initializeProtocolCheck();
    }

    initializeProtocolCheck() {
        this.unblurButton.addEventListener('click', () => {
            if (this.protocolInput.value.toUpperCase() === 'MEAT_PUPPET_PROTOCOL') {
                this.terminalInterface.classList.remove('blur');
                this.passwordOverlay.style.display = 'none';
                this.input.disabled = false;
                this.vhsEffect.triggerIntenseGlitch();
            } else {
                this.vhsEffect.triggerGlitch();
                this.protocolInput.value = '';
                this.protocolInput.placeholder = 'INVALID PROTOCOL';
                setTimeout(() => {
                    this.protocolInput.placeholder = 'PROTOCOL CODE';
                }, 2000);
            }
        });
    }

    initializeTerminal() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand(this.input.value.trim().toLowerCase());
                this.input.value = '';
            }
        });
    }

    writeToTerminal(text) {
        this.output.innerHTML += `\n> ${text}`;
        this.output.scrollTop = this.output.scrollHeight;
    }

    handleCommand(command) {
        this.writeToTerminal(command);

        switch(command) {
            case 'help':
                this.writeToTerminal('Available command: veil-is-evil');
                break;
            case 'veil-is-evil':
                this.writeToTerminal('ACCESS GRANTED - REDIRECTING TO TRUTH');
                this.status.textContent = 'UNLOCKED';
                this.status.style.color = '#00ff00';
                this.vhsEffect.triggerIntenseGlitch();
                
                setTimeout(() => {
                    window.location.replace('./truth.html');
                }, 2000);
                break;
            case 'clear':
                this.output.innerHTML = '> TERMINAL CLEARED';
                break;
            default:
                this.writeToTerminal('INVALID COMMAND');
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const glitchText = new GlitchText();
    const audioController = new AudioController();
    const terminal = new Terminal();
}); 