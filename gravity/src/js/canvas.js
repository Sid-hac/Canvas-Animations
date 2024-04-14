import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

  let friction = 0.7;
  let gravity = 1;

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})
addEventListener("click" , function(){
  init()
})

// Objects
class Ball {
  constructor(x, y,dx , dy,radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
     
    if(this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy * friction
    }else {
        this.dy += gravity
    }

    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx * friction
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Implementation
let ballArray;
let ball
function init() {
  ballArray = []

  for (let i = 0; i < 100; i++) {
    let radius = 30
    let x = utils.randomIntFromRange(0, (canvas.width - radius))
    let y = utils.randomIntFromRange(0, (canvas.height - radius))
    let dx = utils.randomIntFromRange(-4 , 4)
    let dy = utils.randomIntFromRange(1, 10)
    let color = colors[Math.floor(Math.random() * colors.length)]
    ball = new Ball(x , y ,dx , dy , radius , color)
    ballArray.push(ball) 
  }
     

}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  ballArray.forEach(ball => {
   ball.update()
  })
    
}

init()
animate()
