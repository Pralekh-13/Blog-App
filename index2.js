// Function to generate a unique ID for the post
// import { v4 as uuidv4 } from 'uuid';

function generateId() {
  // Generate a random UUID
  return uuidv4();
}

// Function to store the new post in localStorage or send it to a server/API
function storePost(newPost) {
  // Store the post in localStorage
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to handle form submission
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
    description: description,
    id: generateId() // Generate a unique ID for the post
  };

  // Store the new post in localStorage or send it to a server/API
  storePost(newPost);

  // Redirect to the home page
  window.location.href = "home.html";
}

// Attach form submit event listener
document.getElementById("createPostForm").addEventListener("submit", handleCreatePost);
