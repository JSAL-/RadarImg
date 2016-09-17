// var radarNode = document.querySelector('#radar_dom');
// Radar.of(radarNode).setOption({
//     maxLevel: 5,
//     items: [
//         { label: "JavaScript", point: 5 },
//         { label: "CSS", point: 2 },
//         { label: "HTML", point: 3 }
//     ],
//     r: 50,
	// [width
	// height
	// fontSize
	// fontFamaly]
// }).draw();
var Radar = function (element) {
    this.__element = element;
};
Radar.of = function (element) {
    if (!element instanceof HTMLElement) {
        throw new Error('Radar need a HTMLElement!');
    }
    return new Radar(element);
};
Radar.prototype = {
    setOption: function (option) {
    	//default options
    	this.cvsWidth = option.width || 200;
    	this.cvsHeight = option.height || 180;
    	this.fontSize = option.fontSize || 12;
    	this.fontFamaly = option.fontFamaly || "Microsoft YAHEI";

        //setup options
        this.maxLevel = option.maxLevel;
        this.demension = option.items.length;
        this.labels = [];
        this.points = [];
        for(var i = 0; i < this.demension ;i++){
        	this.labels[i] = option.items[i].label;
        	 if (option.items[i].point > this.maxLevel) {
		        throw new Error('Radar: Item.Point must smaller than maxLeval !');
		     }
        	this.points[i] = option.items[i].point;
        }
        this.r = option.r;
        return this;
    },
    draw: function () {
        //draw radar code here

		//canvas画布初始化
		var cav_radar = this.__element;
		cav_radar.width=this.cvsWidth;
		cav_radar.height=this.cvsHeight;
		var ctx = cav_radar.getContext("2d");

		var angle =  2 * Math.PI / this.demension;
		var offset = this.r / this.maxLevel;//单位长度

		//1画this.demension条线,起点为画布中点,转角为（2*Math.PI/this.demension),长度为r
		ctx.save();//保存状态

		ctx.strokeStyle = "#d2d2d2";//填充灰
	    ctx.lineWidth = 1;//设置线宽

		ctx.beginPath();
	    ctx.translate(0.5*cav_radar.width, 0.5*cav_radar.height);//原点移到中心
	    for(var k = 1;k <= this.maxLevel; k++){
		    for(var i = 0;i < this.demension; i ++){
			     ctx.moveTo(0,0);
			     ctx.lineTo(0, -k*offset);//径

			     ctx.rotate(angle);//旋转
				 ctx.lineTo(0, -k*offset);//边
			}
		}
		
		ctx.stroke();

		ctx.closePath();
		ctx.restore();

		// 2每条线平分为this.maxLevel段，按输入值绘制各个方向各个长度的线。并在线的终点写字。
		ctx.save();

		ctx.strokeStyle ='#a00'
		ctx.lineWidth = 2;//设置线宽
		ctx.font= this.fontSize + "px " + this.fontFamaly;


	    ctx.translate(0.5*cav_radar.width, 0.5*cav_radar.height);//原点移到中心
		ctx.beginPath();
		//径
		ctx.moveTo(0,0);
		for(var i = 0;i < this.demension; i ++){
			ctx.rotate(-angle);//旋转
		    ctx.lineTo(0, -this.points[i]*offset);//径
		}
		ctx.lineTo(0,0);

		//字
		for(var i = 0;i < this.demension; i ++){
		    ctx.fillText(this.labels[i],-Math.sin(angle*(i+1))*(this.r+22)-15,-Math.cos(angle*(i+1))*(this.r+22));
		}
		ctx.closePath();
		
		ctx.stroke();	
		ctx.restore();

		//3画线尾圆圈
		ctx.save();
	    ctx.translate(0.5*cav_radar.width, 0.5*cav_radar.height);//原点移到中心

		ctx.strokeStyle ='#a00';//填充红
		ctx.fillStyle ='rgb(255,255,255)';
		ctx.lineWidth=2;

		for(var i = 0;i < this.demension; i ++){
			ctx.beginPath();
			ctx.rotate(-angle);//旋转
		 	ctx.arc(0,-this.points[i]*offset-1,4,0,2*Math.PI);
			ctx.stroke();
			ctx.fill();
		}

		ctx.restore();

        return this;
    }
};

