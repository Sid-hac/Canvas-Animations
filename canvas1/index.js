var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

// c.fillRect(100, 100, 100, 100);

// //line
// c.beginPath();
// c.moveTo(100, 100);
// c.lineTo(200, 200);
// c.stroke();

//arc/ circles

// for (var i = 0; i < 3; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y,30, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
// }

let mouse = {
  x: undefined,
  y: undefined,
};

let maxRadius = 40;
let minRadius = 4;

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

let colorArray = ["#2C3ES0", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"];

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };
    this.move = function () {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y += this.dy;

      //interactivity
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  }
}
let circleArray = [];

for (let i = 0; i < 800; i++) {
  let radius = Math.random() * 5 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;

  let dx = (Math.random() - 0.5) * 5;
  let dy = (Math.random() - 0.5) * 5;
  let circle = new Circle(x, y, dx, dy, radius);
  circleArray.push(circle);
}

function init() {
  for (let i = 0; i < 500; i++) {
    let circleArray = []
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;

    let dx = (Math.random() - 0.5) * 5;
    let dy = (Math.random() - 0.5) * 5;
    let circle = new Circle(x, y, dx, dy, radius);
    circleArray.push(circle);
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].move();
  }
}
animate();
