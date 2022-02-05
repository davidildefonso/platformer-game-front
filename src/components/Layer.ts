export class Layer{

	public x : number;
	public y : number;
	public width : number;
	public height : number;
	public image : HTMLImageElement;
	public speedModifier : number;
	public gameSpeed : number;
	public speed: number;
	public ctx: CanvasRenderingContext2D;


	constructor(image: HTMLImageElement, speedModifier: number, gameSpeed: number, ctx: CanvasRenderingContext2D){
		this.x = 0;
		this.y = 0;
		this.width = 2400;
		this.height = 700;
		this.image = image;
		this.speedModifier = speedModifier;
		this.gameSpeed = gameSpeed  ;
		this.speed =  this.gameSpeed  * this.speedModifier;
		this.ctx = ctx;
	}


	update(){
		this.speed = this.gameSpeed * this.speedModifier;

		if(this.x < - this.width) {
			 this.x = 0;
		}		

		this.x = this.x - this.speed;	


	}


	draw(){
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		this.ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
	}
}