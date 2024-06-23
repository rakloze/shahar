document.addEventListener('DOMContentLoaded', function() {
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

    if (startButton) {
        startButton.addEventListener('click', function() {
            startScaleIdentification();
        });
    }

    document.querySelectorAll('.fret button').forEach(button => {
        button.addEventListener('click', handleFretClick);
    });

    function handleFretClick(event) {
        const button = event.target;
        const string = button.getAttribute('data-string');
        const fret = button.getAttribute('data-fret');
        const note = button.getAttribute('data-note');

        // Initialize AudioContext
        initializeAudioContext();

        if (note) {
            playMidiFile(note);
        }

        const positionIndex = correctNotes.findIndex(position => position.string === string && position.fret === fret);
        if (positionIndex !== -1) {
            score += 10;
            updateScore();
            button.classList.add('correct');
            correctNotes.splice(positionIndex, 1);
            if (correctNotes.length === 0) {
                nextRound();
            }
        } else {
            score -= 5;
            updateScore();
            button.classList.add('wrong');
            setTimeout(() => button.classList.remove('wrong'), 500);
        }
    }



let score = 0;
let timeLeft = 60;
let notesToHighlight = [];
let correctNotes = [];
let currentScale = '';

const scalePositions = {
    'A Major': [
        { string: '1', fret: '4' }, { string: '1', fret: '5' },
        { string: '2', fret: '5' }, { string: '2', fret: '7' },
        { string: '3', fret: '4' }, { string: '3', fret: '6' }, { string: '3', fret: '7' },
        { string: '4', fret: '4' }, { string: '4', fret: '6' }, { string: '4', fret: '7' },
        { string: '5', fret: '4' }, { string: '5', fret: '5' }, { string: '5', fret: '7' },
        { string: '6', fret: '5' }, { string: '6', fret: '7' }
    ],
    'G#/Ab Major': [
        { string: '1', fret: '3' }, { string: '1', fret: '4' },
        { string: '2', fret: '4' }, { string: '2', fret: '6' },
        { string: '3', fret: '3' }, { string: '3', fret: '5' }, { string: '3', fret: '6' },
        { string: '4', fret: '3' }, { string: '4', fret: '5' }, { string: '4', fret: '6' },
        { string: '5', fret: '3' }, { string: '5', fret: '4' }, { string: '5', fret: '6' },
        { string: '6', fret: '4' }, { string: '6', fret: '6' }
    ],
    'G Major': [
        { string: '1', fret: '2' }, { string: '1', fret: '3' },
        { string: '2', fret: '3' }, { string: '2', fret: '5' },
        { string: '3', fret: '2' }, { string: '3', fret: '4' }, { string: '3', fret: '5' },
        { string: '4', fret: '2' }, { string: '4', fret: '4' }, { string: '4', fret: '5' },
        { string: '5', fret: '2' }, { string: '5', fret: '3' }, { string: '5', fret: '5' },
        { string: '6', fret: '3' }, { string: '6', fret: '5' }
    ],
    'F#/Gb Major': [
        { string: '1', fret: '1' }, { string: '1', fret: '2' },
        { string: '2', fret: '2' }, { string: '2', fret: '4' },
        { string: '3', fret: '1' }, { string: '3', fret: '3' }, { string: '3', fret: '4' },
        { string: '4', fret: '1' }, { string: '4', fret: '3' }, { string: '4', fret: '4' },
        { string: '5', fret: '1' }, { string: '5', fret: '2' }, { string: '5', fret: '4' },
        { string: '6', fret: '2' }, { string: '6', fret: '4' }
    ],
    'A#/Bb Major': [
        { string: '1', fret: '5' }, { string: '1', fret: '6' },
        { string: '2', fret: '6' }, { string: '2', fret: '8' },
        { string: '3', fret: '5' }, { string: '3', fret: '7' }, { string: '3', fret: '8' },
        { string: '4', fret: '5' }, { string: '4', fret: '7' }, { string: '4', fret: '8' },
        { string: '5', fret: '5' }, { string: '5', fret: '6' }, { string: '5', fret: '8' },
        { string: '6', fret: '6' }, { string: '6', fret: '8' }
    ],
    'B Major': [
        { string: '1', fret: '6' }, { string: '1', fret: '7' },
        { string: '2', fret: '7' }, { string: '2', fret: '9' },
        { string: '3', fret: '6' }, { string: '3', fret: '8' }, { string: '3', fret: '9' },
        { string: '4', fret: '6' }, { string: '4', fret: '8' }, { string: '4', fret: '9' },
        { string: '5', fret: '6' }, { string: '5', fret: '7' }, { string: '5', fret: '9' },
        { string: '6', fret: '7' }, { string: '6', fret: '9' }
    ],
    'C Major': [
        { string: '1', fret: '7' }, { string: '1', fret: '8' },
        { string: '2', fret: '8' }, { string: '2', fret: '10' },
        { string: '3', fret: '7' }, { string: '3', fret: '9' }, { string: '3', fret: '10' },
        { string: '4', fret: '7' }, { string: '4', fret: '9' }, { string: '4', fret: '10' },
        { string: '5', fret: '7' }, { string: '5', fret: '8' }, { string: '5', fret: '10' },
        { string: '6', fret: '8' }, { string: '6', fret: '10' }
    ],
    'C#/Db Major': [
        { string: '1', fret: '8' }, { string: '1', fret: '9' },
        { string: '2', fret: '9' }, { string: '2', fret: '11' },
        { string: '3', fret: '8' }, { string: '3', fret: '10' }, { string: '3', fret: '11' },
        { string: '4', fret: '8' }, { string: '4', fret: '10' }, { string: '4', fret: '11' },
        { string: '5', fret: '8' }, { string: '5', fret: '9' }, { string: '5', fret: '11' },
        { string: '6', fret: '9' }, { string: '6', fret: '11' }
    ],
    'D Major': [
        { string: '1', fret: '9' }, { string: '1', fret: '10' },
        { string: '2', fret: '10' }, { string: '2', fret: '12' },
        { string: '3', fret: '9' }, { string: '3', fret: '11' }, { string: '3', fret: '12' },
        { string: '4', fret: '9' }, { string: '4', fret: '11' }, { string: '4', fret: '12' },
        { string: '5', fret: '9' }, { string: '5', fret: '10' }, { string: '5', fret: '12' },
        { string: '6', fret: '10' }, { string: '6', fret: '12' }
    ],
    'F minor': [
        { string: '1', fret: '1' }, 
        { string: '2', fret: '1' }, { string: '2', fret: '2' }, { string: '2', fret: '4' },
        { string: '3', fret: '0' }, { string: '3', fret: '1' }, { string: '3', fret: '3' }, 
        { string: '4', fret: '1' }, { string: '4', fret: '3' }, 
        { string: '5', fret: '1' }, { string: '5', fret: '3' }, { string: '5', fret: '4' },
        { string: '6', fret: '1' }, { string: '6', fret: '3' }, { string: '6', fret: '4' }
    ],
    'F#/Gb minor': [
        { string: '1', fret: '2' }, 
        { string: '2', fret: '2' }, { string: '2', fret: '3' }, { string: '2', fret: '5' },
        { string: '3', fret: '1' }, { string: '3', fret: '2' }, { string: '3', fret: '4' }, 
        { string: '4', fret: '2' }, { string: '4', fret: '4' }, 
        { string: '5', fret: '2' }, { string: '5', fret: '4' }, { string: '5', fret: '5' },
        { string: '6', fret: '2' }, { string: '6', fret: '4' }, { string: '6', fret: '5' }
    ],
    'G minor': [
        { string: '1', fret: '3' }, 
        { string: '2', fret: '3' }, { string: '2', fret: '4' }, { string: '2', fret: '6' },
        { string: '3', fret: '2' }, { string: '3', fret: '3' }, { string: '3', fret: '5' }, 
        { string: '4', fret: '3' }, { string: '4', fret: '5' }, 
        { string: '5', fret: '3' }, { string: '5', fret: '5' }, { string: '5', fret: '6' },
        { string: '6', fret: '3' }, { string: '6', fret: '5' }, { string: '6', fret: '6' }
    ],
    'G#/Ab minor': [
        { string: '1', fret: '4' }, 
        { string: '2', fret: '4' }, { string: '2', fret: '5' }, { string: '2', fret: '7' },
        { string: '3', fret: '3' }, { string: '3', fret: '4' }, { string: '3', fret: '6' }, 
        { string: '4', fret: '4' }, { string: '4', fret: '6' }, 
        { string: '5', fret: '4' }, { string: '5', fret: '6' }, { string: '5', fret: '7' },
        { string: '6', fret: '4' }, { string: '6', fret: '6' }, { string: '6', fret: '7' }
    ],
    'A minor': [
        { string: '1', fret: '5' }, 
        { string: '2', fret: '5' }, { string: '2', fret: '6' }, { string: '2', fret: '8' },
        { string: '3', fret: '4' }, { string: '3', fret: '5' }, { string: '3', fret: '7' }, 
        { string: '4', fret: '5' }, { string: '4', fret: '7' }, 
        { string: '5', fret: '5' }, { string: '5', fret: '7' }, { string: '5', fret: '8' },
        { string: '6', fret: '5' }, { string: '6', fret: '7' }, { string: '6', fret: '8' }
    ],
    'A#/Bb minor': [
        { string: '1', fret: '6' }, 
        { string: '2', fret: '6' }, { string: '2', fret: '7' }, { string: '2', fret: '9' },
        { string: '3', fret: '5' }, { string: '3', fret: '6' }, { string: '3', fret: '8' }, 
        { string: '4', fret: '6' }, { string: '4', fret: '8' }, 
        { string: '5', fret: '6' }, { string: '5', fret: '8' }, { string: '5', fret: '9' },
        { string: '6', fret: '6' }, { string: '6', fret: '8' }, { string: '6', fret: '9' }
    ],
    'B minor': [
        { string: '1', fret: '7' }, 
        { string: '2', fret: '7' }, { string: '2', fret: '8' }, { string: '2', fret: '10' },
        { string: '3', fret: '6' }, { string: '3', fret: '7' }, { string: '3', fret: '9' }, 
        { string: '4', fret: '7' }, { string: '4', fret: '9' }, 
        { string: '5', fret: '7' }, { string: '5', fret: '9' }, { string: '5', fret: '10' },
        { string: '6', fret: '7' }, { string: '6', fret: '9' }, { string: '6', fret: '10' }
    ],
    'C minor': [
        { string: '1', fret: '8' }, 
        { string: '2', fret: '8' }, { string: '2', fret: '9' }, { string: '2', fret: '11' },
        { string: '3', fret: '7' }, { string: '3', fret: '8' }, { string: '3', fret: '10' }, 
        { string: '4', fret: '8' }, { string: '4', fret: '10' }, 
        { string: '5', fret: '8' }, { string: '5', fret: '10' }, { string: '5', fret: '11' },
        { string: '6', fret: '8' }, { string: '6', fret: '10' }, { string: '6', fret: '11' }
    ],
    'C#/Db minor': [
        { string: '1', fret: '9' }, 
        { string: '2', fret: '9' }, { string: '2', fret: '10' }, { string: '2', fret: '12' },
        { string: '3', fret: '8' }, { string: '3', fret: '9' }, { string: '3', fret: '11' }, 
        { string: '4', fret: '9' }, { string: '4', fret: '11' }, 
        { string: '5', fret: '9' }, { string: '5', fret: '11' }, { string: '5', fret: '12' },
        { string: '6', fret: '9' }, { string: '6', fret: '11' }, { string: '6', fret: '12' }
    ], 
    'A Major': [
        { string: '1', fret: '4' }, { string: '1', fret: '5' },
        { string: '2', fret: '5' }, { string: '2', fret: '7' },
        { string: '3', fret: '4' }, { string: '3', fret: '6' }, { string: '3', fret: '7' },
        { string: '4', fret: '4' }, { string: '4', fret: '6' }, { string: '4', fret: '7' },
        { string: '5', fret: '4' }, { string: '5', fret: '5' }, { string: '5', fret: '7' },
        { string: '6', fret: '5' }, { string: '6', fret: '7' }
    ],
    'G#/Ab Major': [
        { string: '1', fret: '3' }, { string: '1', fret: '4' },
        { string: '2', fret: '4' }, { string: '2', fret: '6' },
        { string: '3', fret: '3' }, { string: '3', fret: '5' }, { string: '3', fret: '6' },
        { string: '4', fret: '3' }, { string: '4', fret: '5' }, { string: '4', fret: '6' },
        { string: '5', fret: '3' }, { string: '5', fret: '4' }, { string: '5', fret: '6' },
        { string: '6', fret: '4' }, { string: '6', fret: '6' }
    ],
    'G Major': [
        { string: '1', fret: '2' }, { string: '1', fret: '3' },
        { string: '2', fret: '3' }, { string: '2', fret: '5' },
        { string: '3', fret: '2' }, { string: '3', fret: '4' }, { string: '3', fret: '5' },
        { string: '4', fret: '2' }, { string: '4', fret: '4' }, { string: '4', fret: '5' },
        { string: '5', fret: '2' }, { string: '5', fret: '3' }, { string: '5', fret: '5' },
        { string: '6', fret: '3' }, { string: '6', fret: '5' }
    ],
    'F#/Gb Major': [
        { string: '1', fret: '1' }, { string: '1', fret: '2' },
        { string: '2', fret: '2' }, { string: '2', fret: '4' },
        { string: '3', fret: '1' }, { string: '3', fret: '3' }, { string: '3', fret: '4' },
        { string: '4', fret: '1' }, { string: '4', fret: '3' }, { string: '4', fret: '4' },
        { string: '5', fret: '1' }, { string: '5', fret: '2' }, { string: '5', fret: '4' },
        { string: '6', fret: '2' }, { string: '6', fret: '4' }
    ],
    'A#/Bb Major': [
        { string: '1', fret: '5' }, { string: '1', fret: '6' },
        { string: '2', fret: '6' }, { string: '2', fret: '8' },
        { string: '3', fret: '5' }, { string: '3', fret: '7' }, { string: '3', fret: '8' },
        { string: '4', fret: '5' }, { string: '4', fret: '7' }, { string: '4', fret: '8' },
        { string: '5', fret: '5' }, { string: '5', fret: '6' }, { string: '5', fret: '8' },
        { string: '6', fret: '6' }, { string: '6', fret: '8' }
    ],
    'B Major': [
        { string: '1', fret: '6' }, { string: '1', fret: '7' },
        { string: '2', fret: '7' }, { string: '2', fret: '9' },
        { string: '3', fret: '6' }, { string: '3', fret: '8' }, { string: '3', fret: '9' },
        { string: '4', fret: '6' }, { string: '4', fret: '8' }, { string: '4', fret: '9' },
        { string: '5', fret: '6' }, { string: '5', fret: '7' }, { string: '5', fret: '9' },
        { string: '6', fret: '7' }, { string: '6', fret: '9' }
    ],
    'C Major': [
        { string: '1', fret: '7' }, { string: '1', fret: '8' },
        { string: '2', fret: '8' }, { string: '2', fret: '10' },
        { string: '3', fret: '7' }, { string: '3', fret: '9' }, { string: '3', fret: '10' },
        { string: '4', fret: '7' }, { string: '4', fret: '9' }, { string: '4', fret: '10' },
        { string: '5', fret: '7' }, { string: '5', fret: '8' }, { string: '5', fret: '10' },
        { string: '6', fret: '8' }, { string: '6', fret: '10' }
    ],
    'C#/Db Major': [
        { string: '1', fret: '8' }, { string: '1', fret: '9' },
        { string: '2', fret: '9' }, { string: '2', fret: '11' },
        { string: '3', fret: '8' }, { string: '3', fret: '10' }, { string: '3', fret: '11' },
        { string: '4', fret: '8' }, { string: '4', fret: '10' }, { string: '4', fret: '11' },
        { string: '5', fret: '8' }, { string: '5', fret: '9' }, { string: '5', fret: '11' },
        { string: '6', fret: '9' }, { string: '6', fret: '11' }
    ],
    'D Major': [
        { string: '1', fret: '9' }, { string: '1', fret: '10' },
        { string: '2', fret: '10' }, { string: '2', fret: '12' },
        { string: '3', fret: '9' }, { string: '3', fret: '11' }, { string: '3', fret: '12' },
        { string: '4', fret: '9' }, { string: '4', fret: '11' }, { string: '4', fret: '12' },
        { string: '5', fret: '9' }, { string: '5', fret: '10' }, { string: '5', fret: '12' },
        { string: '6', fret: '10' }, { string: '6', fret: '12' }
    ],
};

function handleFretClick(event) {
    const button = event.target;
    const string = button.getAttribute('data-string');
    const fret = button.getAttribute('data-fret');

    const positionIndex = correctNotes.findIndex(position => position.string === string && position.fret === fret);
    if (positionIndex !== -1) {
        score += 10;
        updateScore();
        button.classList.add('correct');
        correctNotes.splice(positionIndex, 1);
        if (correctNotes.length === 0) {
            nextRound();
        }
    } else {
        score -= 5;
        updateScore();
        button.classList.add('wrong');
        setTimeout(() => button.classList.remove('wrong'), 500);
    }
}

function getRandomScalePosition() {
    const scaleNames = Object.keys(scalePositions);
    const randomIndex = Math.floor(Math.random() * scaleNames.length);
    return scaleNames[randomIndex];
}

function startScaleIdentification() {
    score = 0;
    timeLeft = 60;
    updateScore();
    updateTime();
    startTimer();
    nextRound();
}

function nextRound() {
    clearHighlights();
    notesToHighlight = [];
    correctNotes = [];
    currentScale = getRandomScalePosition();
    alert(`Identify the positions for the ${currentScale} scale.`);
    notesToHighlight = scalePositions[currentScale];
    correctNotes = [...notesToHighlight];
    console.log("Next round for scale: " + currentScale); // Debugging line
}

function updateScore() {
    document.getElementById("score").innerText = `Score: ${score}`;
}

function updateTime() {
    document.getElementById("timer").innerText = `Time: ${timeLeft}`;
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        updateTime();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Game over! Your score is ${score}`);
            highlightCorrectNotes();
        }
    }, 1000);
}

function highlightCorrectNotes() {
    correctNotes.forEach(position => {
        const button = document.querySelector(`button[data-string="${position.string}"][data-fret="${position.fret}"]`);
        if (button) {
            button.classList.add('correct');
        }
    });
}

function clearHighlights() {
    document.querySelectorAll('.fret button').forEach(button => {
        button.classList.remove('correct', 'wrong');
        button.removeEventListener('click', handleFretClick);
        button.addEventListener('click', handleFretClick);
    });
}

function initializeAudioContext() {
    if (!context) {
        context = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (context.state === 'suspended') {
        context.resume();
    }
}});