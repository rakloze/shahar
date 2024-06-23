import AudioController from './audio.js';
document.addEventListener('DOMContentLoaded', function() {
    const knobs = document.querySelectorAll('.knob');
    const waveformSwitch = document.getElementById('waveform-switch');
    const audioController = new AudioController();

    knobs.forEach(knob => {
        let isDragging = false;
        let startY, startValue;

        knob.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startValue = parseInt(knob.getAttribute('data-value')) || 0;
            document.body.style.cursor = 'grabbing';
        });

        knob.addEventListener('touchstart', (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startValue = parseInt(knob.getAttribute('data-value')) || 0;
            document.body.style.cursor = 'grabbing';
        });

        const handleDragMove = (e) => {
            if (isDragging) {
                const clientY = e.clientY || e.touches[0].clientY;
                const deltaY = startY - clientY;
                let newValue = startValue + deltaY;
                newValue = Math.max(0, Math.min(100, newValue));
                knob.setAttribute('data-value', newValue);
                knob.style.transform = `rotate(${(newValue / 100) * 270 - 135}deg)`;

                if (knob.id === 'reverb-knob') {
                    audioController.setReverb(newValue);
                } else if (knob.id === 'decay-knob') {
                    audioController.setDecay(newValue);
                }
            }
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('touchmove', handleDragMove);

        const handleDragEnd = () => {
            if (isDragging) {
                isDragging = false;
                document.body.style.cursor = 'default';
            }
        };

        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchend', handleDragEnd);
    });

    const startButton = document.getElementById('start-button');
    let context;

    function initializeAudioContext() {
        if (!context) {
            context = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (context.state === 'suspended') {
            context.resume();
        }
    }

    startButton.addEventListener('click', function() {
        startGame();
    });

    document.querySelectorAll('.fret button').forEach(button => {
        button.addEventListener('mousedown', handleFretPress);
        button.addEventListener('mouseup', handleFretRelease);
        button.addEventListener('mouseleave', handleFretRelease);
        button.addEventListener('touchstart', handleFretPress);
        button.addEventListener('touchend', handleFretRelease);
    });

    function handleFretPress(event) {
        event.preventDefault();
        const button = event.target;
        const note = button.getAttribute('data-note');

        // Initialize AudioContext
        initializeAudioContext();

        if (note) {
            playNoteWithReverb(note);
        }
    }

    function handleFretRelease(event) {
        event.preventDefault();
        stopNote();
    }

    function playNoteWithReverb(note) {
        try {
            audioController.playNoteWithReverb(note);
        } catch (error) {
            console.error(error.message);
        }
    }

    function stopNote() {
        try {
            audioController.stopNote();
        } catch (error) {
            console.error(error.message);
        }
    }

    function startGame() {
        console.log('Game started');
        // Implement game start logic here
    }
});
