import animationStates from './common/animations';
import PlayerSprites from './assets/img/shadow_dog.png';
import './style.css';
import { InputHandler } from './components/InputHandler';
import { Player } from './components/Player';
import {Background} from './components/Background';
import { Enemy } from './components/Enemy';

window.onload = () => {
	const canvas = document.createElement("canvas");
	canvas.classList.add('canvas');
	const ctx = canvas.getContext("2d");
	const CANVAS_WIDTH = canvas.width = 800;
	const CANVAS_HEIGHT = canvas.height = 700;	

	const playerImage = new Image();
	playerImage.src = PlayerSprites;

	const spriteWidth = 575;
	const spriteHeight = 523;
	
	let gameFrame = 0;
	const staggerFrames = 5;

	interface SpriteAnimations{
		[name : string]: Frames;
	}


	const spriteAnimations: SpriteAnimations = {};

	interface Frames{
		loc: Array<Position>
	}

	interface Position{
		x: number
		y: number
	}

	animationStates.forEach((state, index) => {
		const frames : Frames = {
			loc: []	
		};

		for(let j = 0; j < state.frames; j++){
			const positionX = j * spriteWidth;
			const positionY = index * spriteHeight;
			frames.loc.push({x: positionX, y: positionY});
		}
		spriteAnimations[state.name] = frames;
	});

	const background = new Background(ctx);

	const input = new InputHandler();


	const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, playerImage, ctx,
		spriteAnimations, gameFrame, staggerFrames);	


	const enemy = new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT, ctx);

	const animate = () => {
		ctx?.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

		background.drawAndUpdate();		
		
		player.draw(gameFrame);
		player.update(input);	

		enemy.draw();

		gameFrame++;

		requestAnimationFrame(animate);
	};

	animate();

	document.body.appendChild(canvas);

};
