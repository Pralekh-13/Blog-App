// Login Page
function handleLogin(event) {
  event.preventDefault(); 

  // Get input values
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;

  // Validate input
  if (username === "") {
    alert("Please enter a username.");
    return;
  }

  if (email === "") {
    alert("Please enter an email.");
    return;
  }

  if (password === "") {
    alert("Please enter a password.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  fetchData(username);
}

async function fetchData(username) {
  try {
    // Fetch user data from the GitHub API (assuming the GitHub username is the same as the entered username)
    const response = await fetch("https://api.github.com/search/users?q=${username}");
    const data = await response.json();

    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(data));

    // Redirect to the home page
    window.location.href = "home.html";
  } catch (error) {
    console.log("Error:", error);
    alert("Failed to fetch user data. Please try again.");
  }
}

//document.getElementById("loginButton").addEventListener("click", handleLogin);

// Home Page
// Fetch all blogs and display them on the home page
async function fetchAndDisplayBlogs() {
  try {
    const response = await fetch(
      "https://demo.ghost.io/ghost/api/content/posts/?key=22444f78447824223cefc48062"
    );
    const data = await response.json();

    const blogs = data.posts;
    const blogContainer = document.getElementById("blogContainer");
    blogContainer.innerHTML = ""; 

    blogs.forEach((blog) => {
      const blogTile = document.createElement("div");
      blogTile.className = "blog-tile";
      blogTile.innerHTML = `
        <h2 class="tile-heading">${blog.title}</h2>
        <p class="tile-description">${truncateText(blog.custom_excerpt, 5)}</p>
      `;
      blogTile.addEventListener("click", function () {
        redirectToReadBlog(blog.id);
      });
      blogContainer.appendChild(blogTile);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

function redirectToCreateBlog() {
  window.location.href = "create-blog.html";
}

function redirectToReadBlog(blogId) {
  window.location.href = "read-blog.html?id=" + blogId;
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

// Create Blog

function handleCreatePost(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get input values
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;

  // Validate input
  if (title === "" || description === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Create a new post object
  var newPost = {
    title: title,
    description: description
  };

  sendNewPost(newPost);
}

async function sendNewPost(newPost) {
  try {
    // Send the new post to the server/API
    const response = await fetch("https://demo.ghost.io/ghost/api/content/posts/?key=22444f78447824223cefc48062", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    if (response.ok) {
      // Redirect to the home page
      window.location.href = "home.html";
    } else {
      throw new Error("Failed to create a new post.");
    }
  } catch (error) {
    console.log("Error:", error);
    alert("Failed to create a new post. Please try again.");
  }
}

function fetchAndDisplayBlogs() {
  // Fetch and display blogs code here
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayBlogs);

// Add event listener to create post button
//document.getElementById("createPostButton").addEventListener("click", handleCreatePost);

