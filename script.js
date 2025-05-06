/* 
To gain experience using objects, please complete the following:

1) You will fetch an object from an API url (posted on our classroom wall). 
2) Console log the result of the API fetch.
3) Explore the object in the console to learn about it's structure and the data contained.
4) Create a small user interface that displays the data returned in the object. 
   Use flexbox and your other HTML, CSS skills to make the interface look good.

*/

// Fetching advice
fetch('https://api.adviceslip.com/advice')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    
    // Fetching a random dog image after getting advice
    return fetch('https://dog.ceo/api/breeds/image/random');
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));