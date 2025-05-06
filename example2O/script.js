let countdownValue = 10000; // Countdown initial value in milliseconds (10 seconds)
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    if (countdownValue > 0) {
        // Convert milliseconds to seconds and format to three decimal places
        const seconds = (countdownValue / 1000).toFixed(3);
        countdownElement.innerText = `Next update in ${seconds} seconds...`;
        countdownValue -= 100; // Decrease by 100 milliseconds
    } else {
        countdownElement.innerText = "Updating now...";
        fetchDogAndJoke(); // Fetch new joke and dog image when countdown reaches zero
        countdownValue = 10000; // Reset countdown
    }
}

function fetchDogAndJoke() {
    // Fetching a random joke
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            const joke = `${data.setup} - ${data.punchline}`;
            // Fetching a random dog image
            return fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()).then(dogData => {
                return { joke, dogImage: dogData.message };
            });
        })
        .then(data => {
            // Updating the DOM with the joke and dog image
            document.getElementById('jokeText').innerText = data.joke;
            document.getElementById('dogImage').src = data.dogImage;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Initial fetch when the page loads
fetchDogAndJoke();

// Start the countdown timer every 100 milliseconds
const countdownInterval = setInterval(updateCountdown, 100);