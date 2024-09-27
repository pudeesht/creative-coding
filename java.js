let canvas;
let ctx;
let forcefield;
let animateeffect;

window.onload = function() {
    canvas = document.getElementById("canvas1");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    forcefield = new Forcefieldeffect(ctx, canvas.width, canvas.height);
    forcefield.animate(0);
}

window.addEventListener("resize", function() {
    this.cancelAnimationFrame(animateeffect);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    forcefield = new Forcefieldeffect(ctx, canvas.width, canvas.height);
    forcefield.animate(0);
})

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener("mousemove", function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

class Forcefieldeffect {
    #ctx;
    #width;
    #height;

    constructor(ctx, width, height) {
        
        this.#width = width;
        this.#height = height;
        
        this.#ctx = ctx;
        this.#ctx.strokeStyle = "white";
        
        this.lasttime = 0;
        this.interval=1000/60;
        this.time=0;

        this.cellsize=15;

        this.gradient;

        this.#creategradient();
        this.#ctx.strokeStyle = this.gradient;

        this.radius=0;
        this.vr=0.03;
        this.limit=0.21;

    }

    #creategradient()
    {
        this.gradient=this.#ctx.createLinearGradient(this.#width,0,0,this.#height);
        this.gradient.addColorStop("0.4","#fe5c94");
        this.gradient.addColorStop("0.1","#ff5c34");
        this.gradient.addColorStop("0.9","#43ef10");
        this.gradient.addColorStop("0.7","#ffff33");
    }

    #draw(angle,xx,yy) {
        // const centerX = this.#width / 2;
        // const centerY = this.#height / 2;
        // let length = ((mouse.x-xx)**2 + (mouse.y-yy)**2)**0.5;
        let length =35;
        this.#ctx.beginPath();
        this.#ctx.moveTo(xx, yy);
        this.#ctx.lineTo(xx+Math.sin(angle)*length, yy+Math.cos(angle)*length);
        this.#ctx.stroke();     
    }

    animate(timestamp) {

        const deltatime=timestamp-this.lasttime;
        this.lasttime=timestamp;
        if (this.time>this.interval)
        {
            this.radius+=this.vr;
            if(this.radius>5 ||this.radius<-5)
                this.vr=this.vr*-1;


            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            for(let y=0;y<this.#height;y+=this.cellsize)
            {
                for ( let x=0;x<this.#width;x+=this.cellsize)
                {
                    const angle=(Math.sin(x*0.01)+Math.cos(y*0.01))*this.radius;
                    this.#draw(angle,x,y);
                }
            }
            this.time=0;
        }
        else
        {
            this.time+=deltatime;
        }
        animateeffect = requestAnimationFrame(this.animate.bind(this));            

    }
}