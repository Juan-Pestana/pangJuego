class Shot {
    constructor (ctx, canvasSize, positionX){
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.position = { x: positionX + 40 , y: canvasSize.h - 180},
        this.shotShize ={w : 10, h : 500}
    
         
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

class NewShot extends Shot {
            constructor(ctx, canvasSize, position, shotShize, obst){
                super(ctx, canvasSize, position, shotShize);

             this.collision = false
             this.isNewShot = true
             this.impactCounter = 0   
            }
            draw(){
            
                this.ctx.fillStyle = 'blue'
                this.ctx.fillRect(this.position.x, this.position.y, this.shotShize.w, this.shotShize.h)
               
                
            }

            move(obstSpeed){

                if (!this.collision){
                    this.position.y -= 15
                } else {
                    this.position.x += obstSpeed
                }
                
            }




    
}