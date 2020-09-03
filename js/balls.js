class Ball {

    constructor(ctx, canvasSize, velX) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.image = new Image()
        this.image.src = 'img/ball.png'

        this.ballSize = {
            w: 200,
            h: 200
        }
        this.ballPos = {
            x: this.canvasSize.w / 2,
            y: 100
        }
        this.ballVel = {
            x: velX,
            y: 3
        }
        this.ballPhysics = {
            gravity: .4
        }
        this.bounce = 23
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.image, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }



    move() {
        this.ballPos.x += this.ballVel.x
        this.ballVel.y += this.ballPhysics.gravity
        this.ballPos.y += this.ballVel.y
        if (this.ballPos.y > this.canvasSize.h - this.ballSize.h) {
            this.ballVel.y = this.bounce
            this.ballVel.y *= -1
        }
        this.ballPos.x > this.canvasSize.w - this.ballSize.w ? this.ballVel.x *= -1 : null
        if (this.ballPos.x <= 0) {
            this.ballVel.x *= -1



        }
    }
}

class MediumBall extends Ball {
    constructor(ctx, canvasSize, positionX, postionY, ballSizeW, ballSizeh, ballVelX, ballVelY, bounce) {
        super(ctx, canvasSize);

        this.ballPos = {
            x: positionX,
            y: postionY
        }
        this.ballSize = {
            w: ballSizeW,
            h: ballSizeh
        }
        this.ballVel = {
            x: ballVelX,
            y: ballVelY
        }
        this.bounce = bounce
    }
}

class SmallBall extends Ball {
    constructor(ctx, canvasSize, positionX, postionY, ballSizeW, ballSizeh, ballVelX, ballVelY, bounce) {
        super(ctx, canvasSize);
        this.ballPos = {
            x: positionX,
            y: postionY
        }
        this.ballSize = {
            w: ballSizeW,
            h: ballSizeh
        }
        this.ballVel = {
            x: ballVelX,
            y: ballVelY
        }
        this.bounce = bounce
    }
}