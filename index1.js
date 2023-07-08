document.addEventListener("DOMContentLoaded", fetchAndDisplayBlogs);

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

function redirectToReadBlog(blogId) {
  window.location.href = "readBlog.html?id=" + blogId;
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

// Create Blog Page
document.getElementById("createPostButton").addEventListener("click", redirectToCreateBlog);

function redirectToCreateBlog() {
  window.location.href = "createBlog.html";
}