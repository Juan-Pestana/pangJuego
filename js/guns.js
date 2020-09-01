class Shot {
    constructor (ctx, canvasSize, positionX){
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.position = { x: positionX + 40 , y: canvasSize.h},
        this.shotShize ={w : 10, h : canvasSize.h}
    
         
    }

    

        draw() {
            
            this.ctx.fillStyle = 'black'
            this.ctx.fillRect(this.position.x, this.position.y, this.shotShize.w, this.shotShize.h)
           
            
        }
    
        move() {
            // console.log('move')
            this.position.y -= 15
            // console.log('move')
        }



    
        
    
    
}