const countdown = document.querySelector('.countdown');

// Set Lauch Date
const launchDate = new Date('Oct 22, 2020 00:00:00').getTime();

// Update every second
const intv1 = setInterval(() => {
    // Get todays date and time (ms)
    const now = new Date().getTime();
    
    // Distance from now to the launch date
    const distance = launchDate - now;
    
    // Time Calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);
    
    
    
    
    
    
    
    // Display result
    countdown.innerHTML = `
        <div>${days}<span>Days</span></div>
        <div>${hours}<span>Hours</span></div>
        <div>${mins}<span>Minutes</span></div>
        <div>${secs}<span>Seconds</span></div>
    `;
    
    // if Launch date passed
    if (distance < 0) {
        // Stop Countdown
        clearInterval(intv1);
        // Style and output text
        countdown.style.color = "#17a2b8";
        countdown.innerHTML = 'Launched!';
    }
}, 1000);