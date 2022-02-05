import enemy1 from '../assets/img/enemies/enemy1.png'


export class Enemy{

	public gameWidth: number;
	public gameHeight: number;
	public width : number;
	public height: number;
	public image: HTMLImageElement;
	public x: number;
	public y : number;
	public ctx: CanvasRenderingContext2D;
	public frameX: number;

	constructor( gameWidth: number, gameHeight: number , ctx: CanvasRenderingContext2D){

		const enemy =  new Image();
		enemy.src = enemy1;

		this.gameHeight = gameHeight;
		this.gameWidth = gameWidth;
		this.width = 160;
		this.height = 119;
		this.image = enemy;
		this.x = this.gameWidth;
		this.y = this.gameHeight - this.height;
		this.ctx = ctx;
		this.frameX = 0;
	}


	draw(){
		this.ctx.drawImage(this.image, this.frameX * this.width, 0,  this.width, this.height,
			this.x, this.y, this.width, this.height);	
	}

	update(){
		this.x--;
	}

}