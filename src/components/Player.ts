import { InputHandler } from "./InputHandler";

interface SpriteAnimations{
		[name : string]: Frames;
}

interface Frames{
	loc: Array<Position>
}

interface Position{
	x: number
	y: number
}

export class Player{

	public gameWidth : number;
	public gameHeight: number;
	public width : number ;
	public height : number;
	public x : number;
	public y : number;
	public image: HTMLImageElement;
	public frameX : number;
	public frameY : number;
	public speed: number;
	public vy: number;
	public ctx: CanvasRenderingContext2D;
	public spriteWidth: number;
	public spriteHeight: number;
	public weight: number;
	public position: number;
	public gameFrame: number;
	public staggerFrames: number;
	public playerState : string;
	public spriteAnimations: SpriteAnimations ;

	constructor(gameWidth: number, gameHeight: number, image: HTMLImageElement, ctx: CanvasRenderingContext2D,
		spriteAnimations: SpriteAnimations, gameFrame: number, staggerFrames: number){
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.image = image;
		this.ctx = ctx;
		this.width = 150;
		this.height = 150;
		this.x = 0;
		this.y = this.gameHeight - this.height;
		this.frameX = 0;
		this.frameY = 0;
		this.speed = 0;
		this.vy = 0;
		this.spriteWidth = 575;
		this.spriteHeight = 523;
		this.weight = 1;
		this.spriteAnimations = spriteAnimations;
		this.gameFrame = gameFrame;
		this.staggerFrames = staggerFrames;
		this.playerState = "idle";
	}

	draw(gameFrame : number){
		
		this.position  = Math.floor(gameFrame/this.staggerFrames) % this.spriteAnimations[this.playerState].loc.length;
		
		this.frameX = this.spriteWidth * this.position;		
		this.frameY = this.spriteAnimations[this.playerState].loc[this.position].y;

		

		this.ctx.drawImage(
			this.image,
			this.frameX, this.frameY , this.spriteWidth, this.spriteHeight,
			this.x, this.y, this.width, this.height	
		);	

	}

	update(input : InputHandler){
		
		if(input.keys.indexOf("ArrowRight") > -1 ){
			this.playerState = "run";
			this.speed = 5;
		}else if(input.keys.indexOf("ArrowLeft") > - 1){
			this.playerState = "run";
			this.speed = -5;
		}else if(input.keys.indexOf("ArrowUp") > -1  && this.onGround() ){
			this.vy -= 32; 

		}else {
			this.playerState = "idle";
			this.speed = 0;
		}

		this.x += this.speed;

		if(this.x < 0) this.x = 0;
		else if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

		this.y += this.vy;

		if(!this.onGround()){
			this.playerState = this.vy >= 0 ? "fall" : "jump";
			this.vy += this.weight;
			this.frameY = 1;
		}else{
			this.vy = 0;
			this.frameY = 0;
		}

		if(this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
	}

	onGround(){
		return this.y >= this.gameHeight - this.height;
	}
}