import { Layer } from "./Layer";
import BackgroundLayer1 from '../assets/img/bg/layer-1.png'
import BackgroundLayer2 from '../assets/img/bg/layer-2.png'
import BackgroundLayer3 from '../assets/img/bg/layer-3.png'
import BackgroundLayer4 from '../assets/img/bg/layer-4.png'
import BackgroundLayer5 from '../assets/img/bg/layer-5.png'

export class Background{	

	public layers: Layer[];	
	public speed: number;
	public ctx : CanvasRenderingContext2D;

	constructor(ctx: CanvasRenderingContext2D ){


		this.speed = 5;
		this.ctx = ctx;

		const backgroundLayer1 =  new Image();
		backgroundLayer1.src = BackgroundLayer1;

		const backgroundLayer2 =  new Image();
		backgroundLayer2.src = BackgroundLayer2;

		const backgroundLayer3 =  new Image();
		backgroundLayer3.src = BackgroundLayer3;

		const backgroundLayer4 =  new Image();
		backgroundLayer4.src = BackgroundLayer4;

		const backgroundLayer5 =  new Image();
		backgroundLayer5.src = BackgroundLayer5;

		const layer1 = new Layer(backgroundLayer1, 0.5, this.speed, this.ctx);
		const layer2 = new Layer(backgroundLayer2, 0.5, this.speed, this.ctx);
		const layer3 = new Layer(backgroundLayer3, 0.5, this.speed, this.ctx);
		const layer4 = new Layer(backgroundLayer4, 0.5, this.speed, this.ctx);
		const layer5 = new Layer(backgroundLayer5, 1, this.speed, this.ctx);

		this.layers = [layer1, layer2, layer3, layer4, layer5];


		

	}

	drawAndUpdate(){
		this.layers.forEach(layer => {
			layer.update();
			layer.draw();
		});
	}
		
}