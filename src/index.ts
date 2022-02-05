import animationStates from './common/animations';
import PlayerSprites from './assets/img/shadow_dog.png';

window.onload = () => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	const CANVAS_WIDTH = canvas.width = 600;
	const CANVAS_HEIGHT = canvas.height = 600;	

	const playerImage = new Image();
	playerImage.src = PlayerSprites;

	const spriteWidth = 575;
	const spriteHeight = 523;
	
	let gameFrame = 0;
	const staggerFrames = 5;

	const  playerState = "run";

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

	
	const animate = () => {
		ctx?.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
		
		const  position  = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
		
		const frameX = spriteWidth * position;		
		const  frameY = spriteAnimations[playerState].loc[position].y;

		ctx?.drawImage(
			playerImage,
			frameX, frameY , spriteWidth, spriteHeight,
			0, 0, spriteWidth, spriteHeight	
		);

		gameFrame++;

		requestAnimationFrame(animate);
	};

	animate();

	document.body.appendChild(canvas);

};
