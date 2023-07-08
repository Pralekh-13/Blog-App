document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting
  
    // Get input value
    var username = document.getElementById("username").value;
    // Fetch user data from the GitHub API
    fetchUserData(username);
  });
  
  async function fetchUserData(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();
  
      // Store user data in local storage
      localStorage.setItem("userData", JSON.stringify(userData));
  
      // Redirect to the profile page
      window.location.href = "home.html";
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to fetch user data. Please try again.");
    }
  }
  