const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angleSlider = document.getElementById('angleSlider');
const angleDisplay = document.getElementById('angleDisplay');
const incidentAngleDisplay = document.getElementById('incidentAngle');
const refractedAngleDisplay = document.getElementById('refractedAngle');

// Constants for the refractive indices
const n1 = 1.00; // Air
const n2 = 1.33; // Water

canvas.width = 600;
canvas.height = 300;

// Draw the initial scene
function drawScene(incidentAngle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw water and air boundary
    ctx.fillStyle = '#0077be'; // Water
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    ctx.fillStyle = '#d3eafc'; // Air
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;

    // Draw normal line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Calculate refraction angle using Snell's law
    const incidentAngleRadians = incidentAngle * Math.PI / 180;
    const refractedAngle = Math.asin((n1 / n2) * Math.sin(incidentAngleRadians)) * 180 / Math.PI;

    // Draw incident ray
    drawLaserBeam(canvas.width / 2, canvas.height / 2, incidentAngle, true);

    // Draw refracted ray
    drawLaserBeam(canvas.width / 2, canvas.height / 2, refractedAngle, false);

    // Update the display of angles
    incidentAngleDisplay.textContent = `${incidentAngle.toFixed(2)}°`;
    refractedAngleDisplay.textContent = `${refractedAngle.toFixed(2)}°`;
}

// Draw laser beam
function drawLaserBeam(x, y, angle, isIncident) {
    ctx.strokeStyle = isIncident ? 'red' : 'green';
    ctx.lineWidth = 2;

    const length = 150;
    const angleRadians = angle * Math.PI / 180;
    
    const endX = isIncident
        ? x - length * Math.cos(angleRadians)
        : x + length * Math.cos(angleRadians);
    const endY = y - length * Math.sin(angleRadians);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

// Update the simulation when slider is moved
angleSlider.addEventListener('input', function() {
    const incidentAngle = parseFloat(angleSlider.value);
    angleDisplay.textContent = incidentAngle;
    drawScene(incidentAngle);
});

// Initialize the simulation with default angle
