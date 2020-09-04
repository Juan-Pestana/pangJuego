class Obstacle {
    constructor(ctx, canvasSize, positionX, positionY, color) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.speed = (Math.round(Math.random()) * 2 - 1) * 5
        this.positionX = positionX
        this.positionY = positionY
        this.color = color
        this.obstSize = {
            w: Math.random() * (650 - 450) + 450,
            h: 20
        }
        this.imageInstance = new Image()
        this.imageInstance.src = `img/obs.png`
        this.draw()
    }
    draw() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.positionX, this.positionY, this.obstSize.w, this.obstSize.h);
        this.ctx.drawImage(this.imageInstance, this.positionX, this.positionY, this.obstSize.w, this.obstSize.h)

        this.move()
    }
    move() {
        this.positionX = this.positionX + this.speed
        if (this.positionX + this.obstSize.w > this.canvasSize.w) {
            this.speed *= -1
        }
        if (this.positionX <= 0) {
            this.speed *= -1
        }
    }
}