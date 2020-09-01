class Obstacle {
    constructor(ctx, canvasSize, positionX, positionY, color) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.speed = 5
        this.positionX = positionX
        this.positionY = positionY
        this.color = color
        this.obstSize ={w : 500 , h : 20}


        this.draw()
    }
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.positionX, this.positionY, this.obstSize.w, this.obstSize.h);
        this.move()
    }
    move() {
        this.positionX -= this.speed
        if (this.positionX + this.obstSize.w > this.canvasSize.w) {
            this.speed *= -1
        }
        if (this.positionX <= 0) {
            this.speed *= -1
        }
    }
}
