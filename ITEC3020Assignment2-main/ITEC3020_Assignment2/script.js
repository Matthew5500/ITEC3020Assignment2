document.addEventListener('DOMContentLoaded', function() {

  //Authentication Check (Only Allow Access to Pages if User is Logged in)
  (function() {
    const allowedPages = ['login.html', 'register.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (allowedPages.includes(currentPage)) {
      // If the user is already logged in, don't allow access to login or register pages.
      if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = 'index.html';
      }
    } else {
      // For all other pages, if not logged in, redirect to login.
      if (localStorage.getItem('loggedIn') !== 'true') {
        window.location.href = 'login.html';
      }
    }
  })();


  //Function to Render Blog Posts on the Home Page (index.html)
  function renderBlogs() {
    const blogContainer = document.getElementById('blogPosts');
    if (!blogContainer) return;
    blogContainer.innerHTML = ''; //Clear container
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.forEach(blog => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-4 mb-3';
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card bg-dark text-white h-100';
      if (blog.image) {
        const img = document.createElement('img');
        img.src = blog.image;
        img.className = 'card-img-top';
        img.alt = blog.title;
        cardDiv.appendChild(img);
      }
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      const title = document.createElement('h5');
      title.className = 'card-title';
      title.textContent = blog.title;
      const desc = document.createElement('p');
      desc.className = 'card-text';
      desc.textContent = blog.description;
      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      // Optional: display the date
      const dateP = document.createElement('p');
      dateP.className = 'card-text';
      const small = document.createElement('small');
      small.textContent = blog.date;
      dateP.appendChild(small);
      cardBody.appendChild(dateP);
      cardDiv.appendChild(cardBody);
      colDiv.appendChild(cardDiv);
      blogContainer.appendChild(colDiv);
    });
  }


  //Function to Render Courses in the About Me Page
  function renderCourses() {
    const tableBody = document.getElementById('coursesTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.forEach((course, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${course.courseName}</td>
        <td>${course.courseCode}</td>
        <td>${course.instructor}</td>
        <td>${course.term}</td>
        <td>
          <button class="btn btn-sm btn-warning edit-course" data-index="${index}">Edit</button>
          <button class="btn btn-sm btn-danger delete-course" data-index="${index}">Delete</button>
        </td>
      `;
      tableBody.appendChild(tr);
    })
  }


  //Function to Render Contact Messages in the Inbox Page
  function renderContacts() {
    const inboxContainer = document.getElementById('inboxMessages');
    if (!inboxContainer) return;
    inboxContainer.innerHTML = '';
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.forEach(msg => {
      const div = document.createElement('div');
      div.className = 'list-group-item bg-dark text-white';
      div.innerHTML = `
        <h5 class="mb-1">${msg.name}</h5>
        <p class="mb-1">${msg.subject}</p>
        <p class="mb-1">${msg.messsage}</p>
        <small>${msg.date}</small>
      `;
      inboxContainer.appendChild(div);
    });
  }


  //Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      //Simulate Login Validation
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      if (username && password) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html';
      }
      else {
        alert('Please enter username and password.');
      }
    });
  }


  //Registration Form Submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('regUsername').value
      const email = document.getElementById('regEmail').value
      const password = document.getElementById('regPassword').value
      const confirmPassword = document.getElementById('regConfirmPassword').value;
      if (password !== confirmPassword) {
        alert('Password do not match!');
      }
      else {
        //Store user info in localStorage
      localStorage.setItem('registeredUser', JSON.stringify({ username, email, password }));
      //Show confirmation message on the register page
      const msgDiv = document.getElementById('registerMessage');
      msgDiv.textContent = "Registration successful! Please log in.";
      msgDiv.classList.remove('d-none');
      //Optionally auto-redirect after a short delay:
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
      }
    });
  }


  //Blog Post Submission
  const blogForm = document.getElementById('blogForm');
  if(blogForm) {
    blogForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const title = document.getElementById('blogTitle').value;
      const description = document.getElementById('travelDescription').value;
      const imageInput = document.getElementById('blogImage');
      const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const imageBase64 = event.target.result;
          const blogPost = { title, description, image: imageBase64, date: new Date().toLocaleString() };
          blogs.push(blogPost);
          localStorage.setItem('blogs', JSON.stringify(blogs));
          alert('Blog post submitted!');
          blogForm.reset();
          renderBlogs(); 
        };
        reader.readAsDataURL (imageInput.files[0]);
      }
      else {
        const blogPost = { title, description, image: '', date: new Date().toLocaleString() };
        blogs.push(blogPost);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        alert('Blog post submitted!');
        blogForm.reset();
        renderBlogs();
      }
    });
  }


  //Course form Submission
  const courseForm = document.getElementById('courseForm');
  if (courseForm) {
    courseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const courseName = document.getElementById('courseName').value;
      const courseCode = document.getElementById('courseCode').value;
      const instructor = document.getElementById('instructor').value;
      const term = document.getElementById('term').value;
      const course = { courseName, courseCode, instructor, term };
      let courses = JSON.parse(localStorage.getItem('courses')) || [];
      courses.push(course);
      localStorage.setItem('courses', JSON.stringify(courses));
      alert('Course information saved!');
      courseForm.reset();
      renderCourses();
    });
  }


  //Handle edit and delete for courses (in about_me.html)
  const coursesTableBody = document.getElementById('coursesTableBody');
  if (coursesTableBody) {
    coursesTableBody.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-course')) {
        const index = e.target.getAttribute('data-index');
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        renderCourses();
      }
      if (e.target.classList.contains('edit-course')) {
        const index = e.target.getAttribute('data-index');
        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        const course = courses[index];
        // Pre-fill the form for editing
        document.getElementById('courseName').value = course.courseName;
        document.getElementById('courseCode').value = course.courseCode;
        document.getElementById('instructor').value = course.instructor;
        document.getElementById('term').value = course.term;
        // Remove the course so that the updated info replaces it
        courses.splice(index, 1);
        localStorage.setItem('courses', JSON.stringify(courses));
        renderCourses();
      }
    });
  }


  //Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const subject = document.getElementById('contactSubject').value;
      const messsage = document.getElementById('contactMessage').value;
      const contactMsg = { name, subject, messsage, date: new Date().toLocaleString() };
      let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
      contacts.push(contactMsg);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      alert('Message sent!');
      contactForm.reset();
    });
  }


  //Bus Fare Calculation
  const busFareForm = document.getElementById('busFareForm');
  if (busFareForm) {
    busFareForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const distance = parseFloat(document.getElementById('busDistance').value);
      const fare = distance * 1.23;
      document.getElementById('busFareResult').textContent = `Total Bus fare: $${fare.toFixed(2)}`;
    });
  }


  //Train Fare Calculation
  const trainFareForm = document.getElementById('trainFareForm');
  if (trainFareForm) {
    trainFareForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const distance = parseFloat(document.getElementById('trainDistance').value);
      let fare = distance * 1.23;
      const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
      if (promoCode === 'PROMO10' || promoCode === "SAVE10") {
        fare -= fare * 0.10;
      }
      else if (promoCode === 'PROMO15' || promoCode === 'Save15') {
        fare -= fare * 0.15;
      }
      document.getElementById('trainFareResult').textContent = `Total Train Fare: $${fare.toFixed(2)}`;
    });
  }


    //Render dynamic content on pages (if the corresponding element exists)
    renderBlogs();
    renderCourses();
    renderContacts();
});