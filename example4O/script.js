// Fetch user data
fetch('https://randomuser.me/api/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const user = data.results[0];

    // Create user information display
    const userContainer = document.getElementById('user-container');
    const userCard = document.createElement('div');
    userCard.className = 'user-card';

    userCard.innerHTML = `
      <img src="${user.picture.large}" alt="User Picture" />
      <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Location:</strong> ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
      <p><strong>Date of Birth:</strong> ${user.dob.date} (Age: ${user.dob.age})</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Cell:</strong> ${user.cell}</p>
    `;

    userContainer.appendChild(userCard);

    // Create location string for geocoding
    const locationString = `${user.location.city}, ${user.location.country}`; // Simplified or adjusted location string

    // Use Nominatim to get the latitude and longitude based on the location string
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(geocodeData => {
        if (geocodeData && geocodeData.length > 0) {
          const coords = geocodeData[0];

          // Initialize the map at a very zoomed-out view
          const map = L.map('map').setView([coords.lat, coords.lon], 3); // Set the zoom level to 3

          // Set up the tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          // Add a marker at the user's location
          L.marker([coords.lat, coords.lon]).addTo(map)
            .bindPopup(`${user.name.first} ${user.name.last}'s Location`)
            .openPopup();
        } else {
          console.error('Geocoding failed: No results found.');
        }
      })
      .catch(error => {
        console.error('There was a problem with the geocoding operation:', error);
      });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });