class Score {
    constructor(ctx, canvasSize, score){
        this.ctx = ctx,
        this.canvasSize = canvasSize
        this.scorePos = {
            x : this.canvasSize.w -200,
            y : 100
        }
       

    }

    draw(score){

    this.ctx.fillStyle = "blue";
    this.ctx.font = "bold 26px Arial";
    this.ctx.fillText(`score ${score}`, this.scorePos.x, this.scorePos.y);

    }


}