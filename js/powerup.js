class PowerUp {
    constructor(ctx, canvasSize) {

        this.ctx = ctx
        this.canvasSize = canvasSize

        this.powUpSize = {
            w: 50,
            h: 50
        }

        this.powUpPos = {
            x: Math.random() * (this.canvasSize.w - this.powUpSize.w - 1) + 1,
            y: 0
        }
        this.speed = 9

        this.imageInstance = new Image()
        this.imageInstance.src = `img/powerup.png`

    }

    draw() {

        // this.ctx.fillStyle = 'yellow'
        // this.ctx.fillRect(this.powUpPos.x, this.powUpPos.y, this.powUpSize.w, this.powUpSize.h)
        this.ctx.drawImage(this.imageInstance, this.powUpPos.x, this.powUpPos.y, this.powUpSize.w, this.powUpSize.h)
        this.move()
    }

    move() {

        if (this.powUpPos.y + this.powUpSize.h > this.canvasSize.h) {
            this.powUpPos.y = this.canvasSize.h - this.powUpSize.h
            this.speed = 0
        } else {
            this.powUpPos.y += this.speed
        }
    }







}