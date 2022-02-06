import animationStates from './common/animations';
import PlayerSprites from './assets/img/shadow_dog.png';
import './style.css';
import { InputHandler } from './components/InputHandler';
import { Player } from './components/Player';
import {Background} from './components/Background';
import { Enemy } from './components/Enemy';
import enemies from './common/enemies';
import {SpriteAnimations} from './common/types'
import {Frames} from './common/types'


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

	const spriteAnimations: SpriteAnimations = {};

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


	let enemiesList : Enemy[] = [];

	const handleEnemies = (deltaTime: number) => {
		if(enemyTimer >= enemyInterval + randomEnemyInterval ){			
			enemiesList.push(getRandomEnemy());
			randomEnemyInterval = Math.random() * 10000 + 50;
			enemyTimer = 0;
		}else{			
			enemyTimer += deltaTime;			
		}	

		enemiesList.forEach(e => {
			e.draw(gameFrame);
			e.update();
		})
	};

	const getRandomEnemy = () => {
		const selected = enemies[Math.floor(Math.random() * enemies.length)];
		return new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT, ctx, staggerFrames, selected.width, selected.height, selected.name);
	};

	const background = new Background(ctx);
	const input = new InputHandler();

	const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT, playerImage, ctx,
		spriteAnimations, gameFrame, staggerFrames);


	let lastTime = 0;
	let enemyTimer = 0;
	let enemyInterval = 10000;
	let randomEnemyInterval =  Math.random() * 3000 + 50;

	const animate = (timeStamp: number) => {

		const deltaTime = timeStamp - lastTime;
		lastTime = timeStamp;

		ctx?.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
		background.drawAndUpdate();		
		
		player.draw(gameFrame);
		player.update(input);			

		handleEnemies(deltaTime);
		gameFrame++;
		requestAnimationFrame(animate);
	};

	animate(0);
	document.body.appendChild(canvas);
};
