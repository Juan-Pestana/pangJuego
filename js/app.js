const pangApp = {
  name: "Pang Game",
  author: "Damián Lago & Juan Pestana",
  version: "1.0.0",
  license: undefined,
  description: "Arcade video game made using Canvas",
  canvasId: undefined,
  ctx: undefined,
  canvasSize: {
    w: undefined,
    h: undefined,
  },
  player: undefined,
  gun: undefined,
  score: 0,
  shots: [],
  balls: [],
  BigBall: [],
  mediumBalls: [],
  smallBalls: [],
  obstacles: [],
  init(id) {
    this.canvasId = id;
    this.ctx = document.getElementById(this.canvasId).getContext("2d");
    this.setDimensions();
    this.setEventListeners()
    this.setEventHandlers();
    this.createNewBall()
    this.generateObstacles()
    this.createPlayer()

    this.drawAll()
    console.log(this.BigBall)
    console.log("Este es el objeto", this.ctx);
  },
  drawAll() {
    const interval = setInterval(() => {
      this.clearScreen()
      if (this.shots.length >= 1) this.shots.forEach(elem => {
        elem.draw()
        elem.move()
      })
      this.balls.length >= 1 ? this.balls.forEach(elem => elem.draw()) : null
      this.checkCollision()
      this.checkObstCollision()
      // this.BigBall.length >= 1 ? this.BigBall[0].draw() : null
      //this.createMediumBall()
      // this.mediumBalls.length >= 1 ? this.mediumBalls.forEach(elem => elem.draw()) : null
      //this.createSmallBalls()
      // this.smallBalls.length >= 1 ? this.smallBalls.forEach(elem => elem.draw()) : null
      this.player.draw()
      this.obstacles.forEach(obs => obs.draw())
      this.gameover(interval)
      this.clearShots()
    }, 50)
  },

  setDimensions() {
    document
      .getElementById(this.canvasId)
      .setAttribute("width", window.innerWidth);
    document
      .getElementById(this.canvasId)
      .setAttribute("height", window.innerHeight);
    this.canvasSize = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
  },

  setEventHandlers() {
    window.onresize = () => this.setDimensions();
  },

  setEventListeners() {
    document.onkeydown = (e) => {
      e.keyCode === 37 ? this.player.move('left') : null;
      e.keyCode === 39 ? this.player.move('right') : null;
      e.keyCode === 32 ? this.createShot() : null;
    }
  },

  createShot() {
    let shot = new Shot(this.ctx, this.canvasSize, this.player.playerPos.x)
    this.shots.push(shot)
    console.log(this.shots)
  },

  createPlayer() {
    this.player = new Player(this.ctx, this.canvasSize)
  },

  createNewBall() {
    let ball = new Ball(this.ctx, this.canvasSize)
    this.balls.push(ball)
  },

  clearShots() {
    this.shots.forEach(elem => {
      if (elem.position.y < this.canvasSize.h * -1) {
        let index = this.shots.indexOf(elem)
        this.shots.splice(index, 1)
      }
    })
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
  },

  // createMediumBall() {
  //   this.balls.forEach(elem => {
  //     if (elem.ballPos.x <= 0 && elem.ballSize.w === 200) {
  //       let mBall = new MediumBall(this.ctx, this.canvasSize, elem.ballPos.x, elem.ballPos.y + 5, elem.ballSize.w / 2, elem.ballSize.h / 2, 10, -7, 20)
  //       this.balls.push(mBall)

  //       mBall = new MediumBall(this.ctx, this.canvasSize, elem.ballPos.x, elem.ballPos.y, elem.ballSize.w / 2, elem.ballSize.h / 2, 15, -25, 20)
  //       this.balls.push(mBall)

  //       this.balls.splice(this.balls.indexOf(elem), 1)

  //     }
  //   })
  // },

  // createSmallBalls() {
  //   this.balls.forEach(elem => {
  //     if (elem.ballPos.x <= 0 && elem.ballSize.w === 100) {
  //       let sBall = new SmallBall(this.ctx, this.canvasSize, elem.ballPos.x, elem.ballPos.y + 25, elem.ballSize.w / 2, elem.ballSize.h / 2, 10, -7, 17)
  //       this.balls.push(sBall)
  //       sBall = new SmallBall(this.ctx, this.canvasSize, elem.ballPos.x, elem.ballPos.y + 10, elem.ballSize.w / 2, elem.ballSize.h / 2, 15, -13, 17)
  //       this.balls.push(sBall)
  //       this.balls.splice(this.balls.indexOf(elem), 1)
  //     }
  //   })
  // },
  checkCollision(){
 
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];
      for (let j = 0; j < this.shots.length; j++) {
          let shot = this.shots[j];
          if (ball.ballPos.x < shot.position.x + shot.shotShize.w && 
            ball.ballPos.x + ball.ballSize.w > shot.position.x &&
            ball.ballPos.y < shot.position.y + shot.shotShize.h &&
            ball.ballSize.h + ball.ballPos.y > shot.position.y) {
              if(ball.ballSize.w === 200){
                this.createMediumBall(ball)
              } else if(ball.ballSize.w === 100){   
                this.createSmallBall(ball)
              }
              this.balls.splice(i, 1);
              i--;  
              this.score ++
              this.shots.splice(j, 1);
              console.log(this.score)
              break;
          }
      }
    }

  },

  checkObstCollision(){
    console.log('obstáculos',this.obstacles)
    console.log('bolas',this.balls)
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];
      for (let j = 0; j < this.obstacles.length; j++) {
          let obstacle = this.obstacles[j];
          
        if( ball.ballPos.x < obstacle.positionX + obstacle.obstSize.w && ball.ballPos.x + ball.ballSize.w > obstacle.positionX && ball.ballPos.y < obstacle.positionY + obstacle.obstSize.h && ball.ballSize.h + ball.ballPos.y > obstacle.positionY){
          // this.balls[0].ballVel.x *= -1
          this.balls[0].ballVel.y *= -1
        }
        // if(ball.ballPos.x < obstacle.positionX + obstacle.obstSize.w) {
        //   this.balls[0].ballVel.x *= -1
        //   // console.log('impacto por la izda')
        // }else if (ball.ballPos.x + ball.ballSize.w > obstacle.positionX){
        //   this.balls[0].ballVel.x *= -1
        //   // console.log('impacto por la dcha')
        // }else if (ball.ballPos.y < obstacle.positionY + obstacle.obstSize.h){
        //   this.balls[0].ballVel.y *= -1
        //   // console.log('impacto por arriba')
        // }
        // else if (ball.ballSize.h + ball.ballPos.y > obstacle.positionY){
        //   this.balls[0].ballVel.y *= -1
        //   // console.log('impacto por abajo')
        // }

        }
    }

  },

  createMediumBall(ball){
    //  let oldBall = ball
    let mBall = new MediumBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 5, ball.ballSize.w / 2, ball.ballSize.h / 2, 5, -7, 25)
    this.balls.push(mBall)
    mBall = new MediumBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y, ball.ballSize.w / 2, ball.ballSize.h /  2, -5, -12, 25 )
    this.balls.push(mBall)

  },

  createSmallBall(ball){
    //let oldBall = ball
    let sBall = new SmallBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 25, ball.ballSize.w / 2, ball.ballSize.h / 2, 5, -7, 20)
    this.balls.push(sBall)
    sBall = new SmallBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 10, ball.ballSize.w / 2, ball.ballSize.h / 2, -5, -13, 20)
    this.balls.push(sBall)
  }, 

  generateObstacles() {
    if (this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, 200, 500, 'red'));
      // this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, 400, 500, 'green'));
      // this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, 600, 500, 'red'));
    }
  },

  gameover(interval){
    this.balls.forEach(elem => {
      if(elem.ballPos.x + 18 < this.player.playerPos.x + this.player.playerSize.w &&
        elem.ballPos.x - 8 + elem.ballSize.w - 14> this.player.playerPos.x &&
        elem.ballPos.y < this.player.playerPos.y + this.player.playerSize.h &&
        elem.ballSize.h - 12 + elem.ballPos.y > this.player.playerPos.y){

          return clearInterval(interval)
        }
    })
  }
   


  
};