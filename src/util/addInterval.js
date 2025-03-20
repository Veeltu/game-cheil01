export function addInterval(number) {
    let total = number; // Initialize the total variable

    // Function to add 100 to total
    const add = () => {
        total += 100; // Add 100 to total
    };

    // Set interval to call add every second (1000 milliseconds)
    const intervalId = setInterval(add, 1000);

    // Optional: Return a function to stop the interval if needed
    return () => clearInterval(intervalId);
}

// Usage example
const stopAdding = addInterval();

// To stop adding after a certain time (e.g., after 10 seconds)
setTimeout(() => {
    stopAdding(); // Call the function returned to clear the interval
    console.log("Stopped adding.");
}, 10000); // Stops after 10 seconds
