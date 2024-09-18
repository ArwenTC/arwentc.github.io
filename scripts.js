
// Hamburger menu function
// Credit : w3schools
// Link : https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
function hamburger() {
    // Collects navbar element into variable
    var x = document.getElementById("nav");
    var y = document.getElementById("hamburger");

    // If the class name is navbar, adds responsive css elements
    if (x.className == "navbar") {
      x.className += " responsive";
      // Sets hamborgir image
      y.src = "images/hamburger_open.png";
    } else {
      // Sets the class name back to navbar (Case in which the navbar is already clicked)
      x.className = "navbar";
      // Sets hamborgir image
      y.src = "images/hamburger.png";
    }
}

// SS4 Link function
function ss4() {
    window.location.href = "http://www.w3schools.com";
}