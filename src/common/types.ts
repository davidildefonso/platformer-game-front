	export interface SpriteAnimations{
		[name : string]: Frames;
	}


	export interface Frames{
		loc: Array<Position>
	}

	export interface Position{
		x: number
		y: number
	}