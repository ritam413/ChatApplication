// Create body styles
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.background = "#f3f4f6";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";

// Create container
const container = document.createElement("div");
container.style.background = "white";
container.style.padding = "20px";
container.style.borderRadius = "10px";
container.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
container.style.textAlign = "center";

// Create heading
const heading = document.createElement("h1");
heading.textContent = "Welcome";
heading.style.color = "#333";

// Function to create styled button or link
function createButton(text, href, isLink = true) {
  let el;
  if (isLink) {
    el = document.createElement("a");
    el.href = href;
    el.textContent = text;
  } else {
    el = document.createElement("button");
    el.textContent = text;
  }

  el.style.display = "block";
  el.style.margin = "10px auto";
  el.style.padding = "10px";
  el.style.width = "200px";
  el.style.textDecoration = "none";
  el.style.background = "#4f46e5";
  el.style.color = "white";
  el.style.borderRadius = "5px";
  el.style.transition = "0.3s";
  el.style.border = "none";
  el.style.cursor = "pointer";
  el.onmouseover = () => (el.style.background = "#4338ca");
  el.onmouseout = () => (el.style.background = "#4f46e5");

  return el;
}

// Create elements
const loginLink = createButton("Login", "/login", true);
const registerLink = createButton("Register", "/register", true);
const logoutBtn = createButton("Logout", "#", false);

// Logout click handler
logoutBtn.addEventListener("click", async () => {
  try {
    const res = await fetch("/logout", {
      method: "POST",
      credentials: "include"
    });
    const data = await res.json();
    alert(data.message || "Logged out");
    window.location.reload();
  } catch (err) {
    alert("Error logging out");
  }
});

// Append elements to container
container.appendChild(heading);
container.appendChild(loginLink);
container.appendChild(registerLink);
container.appendChild(logoutBtn);

// Append container to body
document.body.appendChild(container);
