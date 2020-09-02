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
  score: 0,
  shots: [],
  balls: [],
  newGun: {state : true, shotsCounter : 0},
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
        elem.move(this.obstacles[0].speed)
      })
      this.balls.length >= 1 ? this.balls.forEach(elem => elem.draw()) : null
      this.checkCollision()
      this.checkObstCollision()
      this.checkShotCollision()
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


    if(this.newGun.state === false){
      let shot = new Shot(this.ctx, this.canvasSize, this.player.playerPos.x)
      this.shots.push(shot)
 
    } else{
      
      let shot = new NewShot(this.ctx, this.canvasSize, this.player.playerPos.x)
      this.shots.push(shot)
      this.newGun.shotsCounter++
    }
    if(this.newGun.shotsCounter > 3 ){
      this.newGun.state = false
      this.newGun.shotsCounter = 0
    }
    
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

              if(this.newGun.state){
                this.shots[j].impactCounter++

                    if(this.shots[j].impactCounter === 3){
                      this.shots.splice(j, 1)
                    }

              }
              else{
                this.shots.splice(j, 1);
              }
              
              console.log(this.score)
              break;
          }
      }
    }

  },

  checkObstCollision(){

    for (let i = 0; i < this.balls.length; i++) {

      let ball = this.balls[i];

      for (let j = 0; j < this.obstacles.length; j++) {

          let obstacle = this.obstacles[j];
          
        if( ball.ballPos.x < obstacle.positionX + obstacle.obstSize.w && ball.ballPos.x + ball.ballSize.w > obstacle.positionX && ball.ballPos.y < obstacle.positionY + obstacle.obstSize.h && ball.ballSize.h + ball.ballPos.y > obstacle.positionY){

          this.balls[i].ballVel.y *= -1
        }
      }
    }
  },

  createMediumBall(ball){
    //  let oldBall = ball
    let mBall = new MediumBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 5, ball.ballSize.w / 2, ball.ballSize.h / 2, 10, -7, 25)
    this.balls.push(mBall)
    mBall = new MediumBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y, ball.ballSize.w / 2, ball.ballSize.h /  2, -10, -12, 25 )
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
      
      this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, 250, Math.random() * (500 - 250) + 250, 'red'));
   
    }
  },

  checkShotCollision() {
    for (let i = 0; i < this.shots.length; i++) {
      let shot = this.shots[i];
      for (let j = 0; j < this.obstacles.length; j++) {
        let obstacle = this.obstacles[j];
        if (shot.position.x < obstacle.positionX + obstacle.obstSize.w && shot.position.x + shot.shotShize.w > obstacle.positionX && shot.position.y < obstacle.positionY + obstacle.obstSize.h && shot.shotShize.h + shot.position.y > obstacle.positionY) {
          if (this.newGun.state){
            this.shots[i].collision = true
          }else{
            this.obstacles.splice(i, 1)
            i--
            this.shots.splice(j, 1)
            j--
          }
          if( this.obstacles.length === 0){
            const timeout = setTimeout(() => {
              this.obstacles.push(new Obstacle(this.ctx, this.canvasSize, 250, Math.random() * (500 - 250) + 250, 'red'));
              }, 500);
              break
          }
          
        }
      }
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