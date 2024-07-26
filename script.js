const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('.color-btn');
let activeColor = 'black';
let currentTheme = 'light'; // Initialize with light theme
const lightBackgroundColor = 'white';
const darkBackgroundColor = 'black';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set active color
function setActiveColor(color) {
    document.querySelector('.active-btn')?.classList.remove('active-btn');
    activeColor = color;
    this.classList.add('active-btn');
}

// Event listener for color buttons
colorButtons.forEach((btn) => {
    btn.addEventListener('click', function() {
        setActiveColor(this.dataset.color);
    });
});

let isDrawing = false;

function getCanvasOffset() {
    const rect = canvas.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

function handleMouseDown(event) {
    const canvasOffset = getCanvasOffset();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvasOffset.left, event.clientY - canvasOffset.top);
}

function handleMouseMove(event) {
    if (!isDrawing) return;
    const canvasOffset = getCanvasOffset();
    ctx.lineTo(event.clientX - canvasOffset.left, event.clientY - canvasOffset.top);
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function handleMouseUp() {
    isDrawing = false;
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', function() {
    toggleTheme();
});

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme');
    setCanvasBackgroundColor();
}

function setCanvasBackgroundColor() {
  ctx.fillStyle = currentTheme === 'light' ? lightBackgroundColor : darkBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Call the function to set initial canvas background color
setCanvasBackgroundColor();
