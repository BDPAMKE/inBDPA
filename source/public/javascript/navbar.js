// navbar.js

async function fetchDataFromAPI() {
    try {
      const response = await fetch('/getinfo'); // Fetch data from the server's API endpoint
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }
  
// Function to generate the HTML content and fill the navbar list
async function fillNavbarList() {
    const userCount = document.getElementById('user-count');

    // Call the API to get the data
    const data = await fetchDataFromAPI();

    if (data) {
        userCount.innerHTML = data.info.users
        };
    }

// Call the function to fill the navbar list when the page loads
fillNavbarList();
