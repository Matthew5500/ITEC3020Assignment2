document.addEventListener("DOMContentLoaded", function () {
    // --- Registration Form ---
    var registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var username = document.getElementById("regUsername").value;
        var email = document.getElementById("regEmail").value;
        var password = document.getElementById("regPassword").value;
        var confirmPassword = document.getElementById("regConfirmPassword").value;
        
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        
        // Save user data (for demo purposes, a single user is stored)
        var user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Registration successful! Please log in.");
        window.location.href = "login.html";
      });
    }
  
    // --- Login Form ---
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (storedUser && username === storedUser.username && password === storedUser.password) {
          window.location.href = "index.html";
        } else {
          alert("Invalid username or password.");
        }
      });
    }
    
    // --- Blog Form ---
    var blogForm = document.getElementById("blogForm");
    if (blogForm) {
      blogForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var title = document.getElementById("blogTitle").value;
        var description = document.getElementById("travelDescription").value;
        var image = document.getElementById("blogImage").value;
        
        var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        blogs.push({
          title,
          description,
          image,
          date: new Date().toLocaleString()
        });
        localStorage.setItem("blogs", JSON.stringify(blogs));
        alert("Blog post added successfully!");
        blogForm.reset();
      });
    }
    
    // --- Display Blogs on Home Page ---
    var blogsList = document.getElementById("blogsList");
    if (blogsList) {
      var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      if (blogs.length === 0) {
        blogsList.innerHTML = "<p>No blog posts available.</p>";
      } else {
        blogs.forEach(function (blog) {
          var blogDiv = document.createElement("div");
          blogDiv.className = "blog-post mb-3";
          blogDiv.innerHTML = "<h3>" + blog.title + "</h3>" +
                              "<p><em>" + blog.date + "</em></p>" +
                              "<p>" + blog.description + "</p>" +
                              (blog.image ? "<img src='" + blog.image + "' alt='Blog Image' style='max-width:100%;'>" : "");
          blogsList.appendChild(blogDiv);
        });
      }
    }
    
    // --- About Form ---
    var aboutForm = document.getElementById("aboutForm");
    if (aboutForm) {
      aboutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var courseName = document.getElementById("courseName").value;
        var courseCode = document.getElementById("courseCode").value;
        var instructor = document.getElementById("instructor").value;
        var term = document.getElementById("term").value;
        
        var courses = JSON.parse(localStorage.getItem("courses")) || [];
        courses.push({ courseName, courseCode, instructor, term });
        localStorage.setItem("courses", JSON.stringify(courses));
        alert("Course added successfully!");
        aboutForm.reset();
        loadCourses();
      });
    }
    
    // Function to load courses into the table
    function loadCourses() {
      var coursesTable = document.getElementById("coursesTable");
      if (coursesTable) {
        var courses = JSON.parse(localStorage.getItem("courses")) || [];
        coursesTable.innerHTML = "";
        courses.forEach(function (course) {
          var row = document.createElement("tr");
          row.innerHTML = "<td>" + course.courseName + "</td>" +
                          "<td>" + course.courseCode + "</td>" +
                          "<td>" + course.instructor + "</td>" +
                          "<td>" + course.term + "</td>";
          coursesTable.appendChild(row);
        });
      }
    }
    loadCourses();
    
    // --- Contact Form ---
    var contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var name = document.getElementById("contactName").value;
        var subject = document.getElementById("contactSubject").value;
        var message = document.getElementById("contactMessage").value;
        
        var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push({
          name,
          subject,
          message,
          date: new Date().toLocaleString()
        });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        alert("Message sent successfully!");
        contactForm.reset();
      });
    }
    
    // --- Load Inbox Messages ---
    var inboxMessages = document.getElementById("inboxMessages");
    if (inboxMessages) {
      var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      if (contacts.length === 0) {
        inboxMessages.innerHTML = "<p>No messages in the inbox.</p>";
      } else {
        contacts.forEach(function (contact) {
          var msgDiv = document.createElement("div");
          msgDiv.className = "inbox-message mb-3";
          msgDiv.innerHTML = "<h4>" + contact.subject + "</h4>" +
                             "<p><strong>From:</strong> " + contact.name + " <em>(" + contact.date + ")</em></p>" +
                             "<p>" + contact.message + "</p>";
          inboxMessages.appendChild(msgDiv);
        });
      }
    }
    
    // --- Bus Fare Calculation ---
    var busFareForm = document.getElementById("busFareForm");
    if (busFareForm) {
      busFareForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var distance = parseFloat(document.getElementById("busDistance").value);
        var fare = (distance * 1.23).toFixed(2);
        document.getElementById("busFareResult").innerHTML = "<p>Total Bus Fare: $" + fare + "</p>";
      });
    }
    
    // --- Train Fare Calculation with Promo Code ---
    var trainFareForm = document.getElementById("trainFareForm");
    if (trainFareForm) {
      trainFareForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var distance = parseFloat(document.getElementById("trainDistance").value);
        var baseFare = distance * 1.23;
        var promoCode = document.getElementById("promoCode").value.trim().toUpperCase();
        var discount = 0;
        if (promoCode === "PROMO10" || promoCode === "SAVE10") {
          discount = 0.10;
        } else if (promoCode === "PROMO15" || promoCode === "SAVE15") {
          discount = 0.15;
        }
        var totalFare = baseFare - (baseFare * discount);
        totalFare = totalFare.toFixed(2);
        document.getElementById("trainFareResult").innerHTML = "<p>Total Train Fare: $" + totalFare + "</p>";
      });
    }
  });
  