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
  background: undefined,
  frames: 0,
  powUp : [],
  player: undefined,
  score: {value : 0, object : undefined},
  shots: [],
  balls: [],
  newGun: {state : false , shotsCounter : 0},
  obstacles: undefined,
  gameOver : false,
  init(id) {
    this.canvasId = id;
    this.ctx = document.getElementById(this.canvasId).getContext("2d");
    this.setDimensions();
    this.setEventListeners()
    this.setEventHandlers();
    this.createNewBall()
    this.createPowUp()
    this.generateObstacles()
    this.createPlayer()
    this.createScore()
    this.drawGameOver()
    this.drawBackground()


    this.drawAll()


  },
  drawAll() {
    const interval = setInterval(() => {
      this.clearScreen()
      this.background.draw()
      this.drawShots()
      this.powUp.length >= 1 ? this.powUp.forEach(elem => elem.draw()) : null
      this.balls.length >= 1 ? this.balls.forEach(elem => elem.draw()) : null
      this.checkCollision()
      this.checkObstCollision()
      this.checkShotCollision()
      this.score.object.draw(this.score.value)
      this.player.draw()
      this.checkPowUpCollision()
      this.obstacles ? this.obstacles.draw() : null
      this.gameover(interval)
      this.youWin(interval)
      this.clearShots()
      this.frames++
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
    if(this.newGun.shotsCounter === 3 ){
      this.newGun.state = false
      this.newGun.shotsCounter = 0
    }
    
  },


  createPowUp(){
    // console.log(this.powUp)
    // console.log(this.frames)

      let powUp = setInterval(() =>{
        console.log(this.powUp.length)
        console.log(this.newGun.state)
        if (this.newGun.state === false && this.powUp.length === 0){
          let weaponUp = new PowerUp(this.ctx, this.canvasSize)
         this.powUp.push(weaponUp)
        }
        

      }, 10500)

    },
      



  createPlayer() {
    this.player = new Player(this.ctx, this.canvasSize)
  },

  createNewBall() {
    let ball = new Ball(this.ctx, this.canvasSize, 10)
    this.balls.push(ball)
    ball = new Ball(this.ctx, this.canvasSize, -10)
    this.balls.push(ball)

  },
  createScore(){
    this.score.object = new Score(this.ctx, this.canvasSize, this.score.value)
  },

  clearShots() {
    this.shots.forEach(elem => {
      if (elem.position.y < this.canvasSize.h * -1) {
        let index = this.shots.indexOf(elem)
        this.shots.splice(index, 1)
      }
    })
  },

  drawBackground() {
    this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h, 'img/background.png');
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
  },

  drawShots(){
    let hSpeed
    if (this.obstacles){
      hSpeed = this.obstacles.speed
    }

    if (this.shots.length >= 1) this.shots.forEach(elem => {
      elem.draw()
      elem.move(hSpeed)
    })

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
              this.score.value ++

              if(this.shots[j].isNewShot){
                this.shots[j].impactCounter++

                    if(this.shots[j].impactCounter === 3){
                      this.shots.splice(j, 1)
                    }

              }
              else{
                this.shots.splice(j, 1);
              }
              
              
              break;
          }
      }
    }

  },

  checkObstCollision(){

    for (let i = 0; i < this.balls.length; i++) {

      let ball = this.balls[i];

      // for (let j = 0; j < this.obstacles.length; j++) {

          let obstacle = this.obstacles;

          if(this.obstacles){
            // if (obstacle.positionY > ball.ballPos.y && obstacle.positionY < ball.ballPos.y + ball.ballSize.h && obstacle.possitionY ){
          //   this.balls[i].ballVel.x *= -1
          // }
          if (ball.ballPos.x < obstacle.positionX + obstacle.obstSize.w && ball.ballPos.x + ball.ballSizeW > obstacle.positionX && obstacle.positionY + obstacle.obstSize.h < ball.ballPos.y + ball.ballSize.h && obstacle.positionY < ball.ballPos.y + ball.ballSize.h) {

            this.balls[i].ballVel.x *= -1

          }
          // if(ball.ballPos.y < obstacle.positionY + obstacle.obstSize.h && ball.ballSize.h + ball.ballPos.y > obstacle.positionY && ball.ballPos.x > obstacle.positionX &&ball.ballPos.x + ball.ballSize.w < obstacle.obstSize.w + obstacle.positionX){
          //   this.ball[i].ballVel.y *= -1
          // }
          
        if( ball.ballPos.x < obstacle.positionX + obstacle.obstSize.w && ball.ballPos.x + ball.ballSize.w > obstacle.positionX && ball.ballPos.y < obstacle.positionY + obstacle.obstSize.h && ball.ballSize.h + ball.ballPos.y > obstacle.positionY){

          this.balls[i].ballVel.y *= -1
        } 



          }
          
      }
  },

  checkPowUpCollision(){

    this.powUp.forEach(elem => {


      if (this.player.playerPos.x < elem.powUpPos.x + elem.powUpSize.w && this.player.playerPos.x + this.player.playerSize.w > elem.powUpPos.x && this.player.playerPos.y < elem.powUpPos.y + elem.powUpSize.h && this.player.playerSize.h + this.player.playerPos.y > elem.powUpPos.y){
      

      this.newGun.state = true;
      this.powUp.splice(0 ,1)

      }

    })

  },

  createMediumBall(ball){

    let mBall = new MediumBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 5, ball.ballSize.w / 2, ball.ballSize.h / 2, 10, -7, 25)
    this.balls.push(mBall)
    mBall = new MediumBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y, ball.ballSize.w / 2, ball.ballSize.h /  2, -10, -12, 25 )
    this.balls.push(mBall)

  },

  createSmallBall(ball){

    let sBall = new SmallBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 25, ball.ballSize.w / 2, ball.ballSize.h / 2, 5, -7, 20)
    this.balls.push(sBall)
    sBall = new SmallBall(this.ctx, this.canvasSize, ball.ballPos.x, ball.ballPos.y + 10, ball.ballSize.w / 2, ball.ballSize.h / 2, -5, -13, 20)
    this.balls.push(sBall)
  }, 

  generateObstacles() {
    
      const obstInterval = setInterval(() => {

          if( this.obstacles === undefined){
          this.obstacles = new Obstacle(this.ctx, this.canvasSize, 250, Math.random() * (500 - 250) + 250, 'red');
        }
      }, 1000);
    },
   

  checkShotCollision() {
    for (let i = 0; i < this.shots.length; i++) {

      let shot = this.shots[i];

      if (this.obstacles){

        let obstacle = this.obstacles;

        if(shot.position.y < obstacle.positionY + obstacle.obstSize.h && shot.position.x + shot.shotShize.w > obstacle.positionX && shot.position.x + shot.shotShize.w < obstacle.positionX + obstacle.obstSize.w){  

        // if (shot.position.x < obstacle.positionX + obstacle.obstSize.w && shot.position.x + shot.shotShize.w > obstacle.positionX && shot.position.y < obstacle.positionY + obstacle.obstSize.h && shot.shotShize.h + shot.position.y > obstacle.positionY) {
          if (this.shots[i].isNewShot){

            this.shots[i].collision = true

          }else{
            this.shots.forEach(elem => {
              if(elem.collision){
                this.shots.splice(this.shots.indexOf(elem), 1)
              }
            })
            this.obstacles = undefined
            i--
            this.shots.splice(i, 1)
            
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

          this.gameOver = true
  
         return clearInterval(interval)
        

        }
    })
  },

  drawGameOver(){
    setInterval(() => {
      if( this.gameOver){


      this.ctx.font = "bold 64px Arial"
      this.ctx.fillStyle = "red"
      this.ctx.fillText(`GAME OVER`, this.canvasSize.w / 2 - 160, this.canvasSize.h / 2)

      var lostImg = new Image
      lostImg.src = 'img/gokuLost.png'

      lostImg.addEventListener('load', () => {
        this.ctx.drawImage(lostImg, this.canvasSize.w/ 2 - 400, this.canvasSize.h +100, 800, 370)
      })
      

    

      this.reset()
      }
      
  
    }, 1000);
    

  },

  youWin(interval){
    if (this.balls.length === 0){


      this.ctx.font = "bold 64px Arial"
      this.ctx.fillStyle = "green"
      this.ctx.fillText(`YOU WIN`, this.canvasSize.w / 2 - 160, 100)



      clearInterval(interval)
      this.reset()
    }
    
  },

  reset(){
    setTimeout(() =>{
      location.reload();
    },3000)
  },

 
   
  
};