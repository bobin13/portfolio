const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Set canvas size to the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate random stars
const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        color: 'white'
    });
}

// Generate shooting stars with random angles
const shootingStars = [];
for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const speed = Math.random() * 5 + 2;
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 5,
        speed,
        dx: speed * Math.cos(angle), // Horizontal component
        dy: speed * Math.sin(angle), // Vertical component
        color: 'white'
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
    }

    for (const star of shootingStars) {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.length * star.dx / star.speed, star.y - star.length * star.dy / star.speed);
        ctx.lineWidth = 2;
        ctx.strokeStyle = star.color;
        ctx.stroke();
    }
}

function updateStars() {
    for (const star of stars) {
        //star.x += Math.random() - 0.5; // Random horizontal movement
        //star.y += Math.random() - 0.5; // Random vertical movement

        // Wrap stars around the canvas
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
    }

    for (const star of shootingStars) {
        star.x += star.dx; // Move shooting stars horizontally
        star.y += star.dy; // Move shooting stars vertically

        // Reset shooting stars when they go off the canvas
        if (star.x + star.length * star.dx / star.speed < 0 ||
            star.y + star.length * star.dy / star.speed < 0 ||
            star.y - star.length * star.dy / star.speed > canvas.height) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            star.x = canvas.width + Math.random() * 200;
            star.y = Math.random() * canvas.height;
            star.length = Math.random() * 20 + 5;
            star.speed = speed;
            star.dx = speed * Math.cos(angle);
            star.dy = speed * Math.sin(angle);
        }
    }
}

function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
}

// Start the animation
animate();

// Resize canvas when the window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});