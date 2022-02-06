import enemy1 from '../assets/img/enemies/enemy1.png';
import enemy2 from '../assets/img/enemies/enemy2.png';
import enemy3 from '../assets/img/enemies/enemy3.png';
import enemy4 from '../assets/img/enemies/enemy4.png';

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
	public position: number;
	public staggerFrames: number;

	constructor( gameWidth: number, gameHeight: number , ctx: CanvasRenderingContext2D, staggerFrames: number,
		width: number, height: number, name: string
	){

		

		this.gameHeight = gameHeight;
		this.gameWidth = gameWidth;
		this.width = width;
		this.height = height ;
		this.image = this.getImage(name);
		this.x = this.gameWidth;
		this.y = this.gameHeight - this.height;
		this.ctx = ctx;
		this.frameX = 0;
		this.staggerFrames = staggerFrames;
	}

	getImage(name: string){

		const enemy =  new Image();	

		switch (name) {
			case "enemy1":
				enemy.src = enemy1;
				break;
			case "enemy2":
				enemy.src = enemy2;
				break;
			case "enemy3":
				enemy.src = enemy3;
				break;
			case "enemy4":
				enemy.src = enemy4;
				break;
			default:
				break;
		}

		return enemy;
	}


	draw(gameFrame: number){
		
		this.position  = Math.floor(gameFrame/10) % 6;		
		this.frameX = this.width * this.position;

		this.ctx.drawImage(this.image, this.frameX, 0,  this.width, this.height,
			this.x, this.y, this.width, this.height);	
	}

	update(){
		this.x--;
	}

}