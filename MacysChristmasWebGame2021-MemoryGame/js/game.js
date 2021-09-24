Howler.autoUnlock = false;
const cvs = document.getElementById("gamecanvas");
const ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let frames = 0;
let isClicked = false;
let answers = [];
let curStage = 0;
let levels = 3;
let curlevel = 0;
let minNum = 3;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomInt2(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//background
const bgimg = [];
for(let i = 1; i< 71; i++){
	let curframe = new Image();
	curframe.src = './img/bg/bg ('+ i +').jpg';
	bgimg.push(curframe);
}
const bg = {
	imgx : 0,
	imgy : 0,
	imgw : 1920,
	imgh : 1080,

	x : 0,
	y : 0,
	w : cvs.width,
	h : cvs.height,

	frame : 0,
	frameSpeed : 5,

	draw : function(){
		// console.log(this.imgh);
		ctx.drawImage(bgimg[this.frame],this.imgx,this.imgy,this.imgw,this.imgh,this.x,this.y,this.w,this.h);
	},

	update :function(){
		this.frame += frames % this.frameSpeed == 0 ? 1 : 0;
		this.frame = this.frame % bgimg.length;
	},

	resize : function(){
		// this.imgw = this.imgh * (cvs.width/cvs.height);
		this.imgh = this.imgw * (cvs.height/cvs.width);
		this.h = cvs.height;
		this.w = cvs.width;
	}
}


//elf windows
//blue small
const doorframes = 65;
const blueSmallimg = [];
for(let i = 1; i< doorframes; i++){
	let curframe = new Image();
	curframe.src = './img/BlueElf-Small/blueElf-small ('+ i +').png';
	blueSmallimg.push(curframe);
}

//blue large
const blueLargeimg = [];
for(let i = 1; i< doorframes; i++){
	let curframe = new Image();
	curframe.src = './img/Blue-Large/BlueLarge ('+ i +').png';
	blueLargeimg.push(curframe);
}

//red small
const redSmallimg = [];
for(let i = 1; i< doorframes; i++){
	let curframe = new Image();
	curframe.src = './img/RedElf-Samll/RedSmall ('+ i +').png';
	redSmallimg.push(curframe);
}

//red large
const redLargeimg = [];
for(let i = 1; i< doorframes; i++){
	let curframe = new Image();
	curframe.src = './img/Red-Large/RedLarge ('+ i +').png';
	redLargeimg.push(curframe);
}

//yellow small
const yellowSmallimg = [];
for(let i = 1; i< doorframes; i++){
	let curframe = new Image();
	curframe.src = './img/YellowElf-Small/YellowSmall ('+ i +').png';
	yellowSmallimg.push(curframe);
}

//yellow large
const yellowLargeimg = [];
for(let i = 1; i< doorframes; i++){
	let curframe = new Image();
	curframe.src = './img/Yellow-Large/YellowLarge ('+ i +').png';
	yellowLargeimg.push(curframe);
}

//door sound effects
const blueSound = new Howl({
	src:['./sound/Blue.wav'],
	volume : 0.5,
	html5:true
});

const redSound = new Howl({
	src:['./sound/Red.wav'],
	volume : 0.5,
	html5:true
});

const yellowSound = new Howl({
	src:['./sound/Yellow.wav'],
	volume : 0.5,
	html5:true
});

const windows = {
	imgx : 0,
	imgy : 0,
	imgw : 500,
	imgh : 500,

	x : 405,
	y : 175,
	w : 160,
	h : 160,
	gap : 82,
	gaph : 126,
	gaph2 : 140,

	isplayed : false,
	isallAnimPlayed : false,
	isordergeneraged: false,

	frame : 0,
	frameSpeed : 2,

	colororderS : [blueSmallimg,redSmallimg,yellowSmallimg],
	colororderL : [blueLargeimg,redLargeimg,yellowLargeimg],
	soundorder : [blueSound,redSound,yellowSound],

	colorpos:[[1,1],[0,0],[2,4]],
	colororder:[0,1,2],
	curid:0,

	draw : function(){
		switch(curStage){
			case 0 : //wait for start one round
				this.allDoorClosed();
				this.oneRoundGenerator();
				break;
			case 1 : //play the pattern first
				// console.log("stage 1 : " +"this.curid : " + this.curid);
				this.certianDoorClosed(this.curid);
				this.playPatternAnim();
				if(this.isallAnimPlayed){
					curStage ++;
					isClicked = false;
					isCorrect = false;
				}
				break;
			case 2 : //player repeat the pattern
				if(this.isplayed){
					this.allDoorClosed();
					if(this.curid >= this.colororder.length){
						curStage ++;
					}
				}else{
					this.certianDoorClosed(this.curid-1);
					if(!this.isplayed){
						this.drawAdoor(this.colorpos[this.curid-1],this.colororder[this.curid-1],this.isplayed);
					}
				}
				break;
			case 3 : //show result stage
				this.allDoorClosed();
				if(isCorrect){
					effectAnim.playEffectAnim(effectAnim.happyEffect,3,1);
					// console.log("play correct anim");
				}else{
					effectAnim.playEffectAnim(effectAnim.sadEffect,3,1);
					// console.log("play wrong anim");
				}
				if(effectAnim.isplayed){
					this.roundReset();
					effectAnim.reset();
					// console.log(curlevel);
					curlevel ++;
					curStage = 0;
					console.log(curlevel);
					if(curlevel>=levels && isCorrect){ //game restart
						console.log("final win");
						curStage = 4;
					}
					if(!isCorrect){
						console.log("restart");
						curlevel = 0;
					}
				}
				break;
			case 4:
				this.allDoorClosed();
				effectAnim.playEffectAnim(effectAnim.finalWin,4,3);
				if(effectAnim.isplayed){
					effectAnim.reset();
					curlevel = 0;
					curStage = 0;
				}
				break;
		}
	},

	roundReset : function(){
		this.isordergeneraged = false;
		this.isallAnimPlayed = false;
		this.isplayed = false;
		this.curid = 0;
		this.frame = 0;
	},

	allDoorClosed : function(){
		//all doors closed
		for(let i = 0; i<3; i++){
			for(let j = 0; j <7; j++){
				this.drawAdoor([i,j],0,true);
			}
		}
	},

	certianDoorClosed : function(id){
		for(let i = 0; i<3; i++){
			for(let j = 0; j <7; j++){
				if(i == this.colorpos[id][0] && j == this.colorpos[id][1]){
				}else{
					this.drawAdoor([i,j],0,true);
				}
			}
		}
	},

	playPatternAnim : function () {
		if(!this.isallAnimPlayed){
			if(!this.isplayed){
				// console.log("id0: "+ this.curid);
				// console.log(this.curid + ": " + this.frame);
				this.drawAdoor(this.colorpos[this.curid],this.colororder[this.curid],this.isplayed);
			}else{
				// console.log("id1: "+this.curid);
				this.curid ++;
				// console.log("id1: "+this.curid);
				this.frame = 0;
				if(this.curid < this.colororder.length){
					this.isplayed = false;
				}else{
					this.isallAnimPlayed = true;
					this.curid = 0;
				}
			}
		}
	},

	drawAdoor : function(id,colorindex,isPlayAnim) {
		let posx = this.x + id[1] * this.gap;
		switch(id[0]){
			case 0 :
				let posy = this.y;
				if(!isPlayAnim){
					this.playonce(this.colororderS[colorindex],posx,posy,colorindex);
					// isPlayAnim = true;
				}else{
					ctx.drawImage(this.colororderS[colorindex][0],this.imgx,this.imgy,this.imgw,this.imgh,posx,posy,this.w,this.h);
				}
				break;
			case 1 :
				if(id[1] > 4 || id[1] < 2){
					let posy = this.y + this.gaph;
					if(!isPlayAnim){
						this.playonce(this.colororderL[colorindex],posx,posy,colorindex);
						// isPlayAnim = true;
					}else{
						ctx.drawImage(this.colororderL[colorindex][0],this.imgx,this.imgy,this.imgw,this.imgh,posx,posy,this.w,this.h);
					}
					break;
				}
			case 2 :
				if(id[1] != 3){
					let posy = this.y + (this.gaph2 + this.gaph);
					if(!isPlayAnim){
						this.playonce(this.colororderL[colorindex],posx,posy,colorindex);
						// isPlayAnim = true;
					}else{
						ctx.drawImage(this.colororderL[colorindex][0],this.imgx,this.imgy,this.imgw,this.imgh,posx,posy,this.w,this.h);
					}
					break;
				}
		}
	},

	playonce : function(animator,x,y,index){
		//play sound effect
		if(this.frame == 0){
			this.soundorder[index].play();
		}
		//play anim
		ctx.drawImage(animator[this.frame],this.imgx,this.imgy,this.imgw,this.imgh,x,y,this.w,this.h);
		this.frame += frames % this.frameSpeed == 0 ? 1 : 0;
		if(this.frame >= animator.length - 1){
			// console.log("played");
			this.frame = 0;
			this.isplayed = true;
		}
	},

	orderGenerator : function(curlevel,minCount){
		let curorder = [];
		for(let i=0;i<curlevel + minCount; i++){
			curorder.push(getRandomInt(this.colororderS.length));
		}
		return curorder;
	},

	posGenerator : function(curlevel,minCount) {
		const lastTwoline = [[1,5],[1,6],[2,0],[2,1],[2,2],[2,4],[2,5],[2,6]];
		let posorder = [];
		for(let i = 0; i <curlevel + minCount; i++){
			let curPos = [];
			let curRam = getRandomInt(17);
			if(curRam <=8){
				curPos.push(Math.round(curRam/7));
				curPos.push(Math.round(curRam%7));
			}else if(curRam >8){
				curPos = lastTwoline[curRam - 9];
			}
			posorder.push(curPos);
		}
		return posorder;
	},

	oneRoundGenerator : function(){
		if(!this.isordergeneraged){
			this.colororder = [];
			this.colorpos = [];
			this.colororder = this.orderGenerator(curlevel,minNum);
			this.colorpos = this.posGenerator(curlevel,minNum);
			// console.log(this.colororder);
			this.isordergeneraged = true;
		}
	},

	update :function(){
		this.frame += frames % this.frameSpeed == 0 ? 1 : 0;
		// console.log(blueSmallimg.length);
		this.frame = this.frame % blueSmallimg.length;
	},

	resize : function(){
		// this.imgw = this.imgh * (cvs.width/cvs.height);
		// this.imgh = this.imgw * (cvs.height/cvs.width);
		// this.h = cvs.height;
		// this.w = cvs.width;
	}
}

//Elfves React Anim
//happyblue
const happyBimg = [];
for(let i = 1; i< 61; i++){
	let curframe = new Image();
	curframe.src = './img/happyBlueElf/happyblue ('+ i +').png';
	happyBimg.push(curframe);
}
//happyred
const happyRimg = [];
for(let i = 1; i< 61; i++){
	let curframe = new Image();
	curframe.src = './img/happyRedElf/happyred ('+ i +').png';
	happyRimg.push(curframe);
}
//happyyellow
const happyYimg = [];
for(let i = 1; i< 61; i++){
	let curframe = new Image();
	curframe.src = './img/happyYellowElf/happyyellow ('+ i +').png';
	happyYimg.push(curframe);
}
//sadblue
const sadBimg = [];
for(let i = 1; i< 61; i++){
	let curframe = new Image();
	curframe.src = './img/sadBlueElf/sadblue ('+ i +').png';
	sadBimg.push(curframe);
}
//sadred
const sadRimg = [];
for(let i = 1; i< 61; i++){
	let curframe = new Image();
	curframe.src = './img/sadRedElf/sadred ('+ i +').png';
	sadRimg.push(curframe);
}
//sadyellow
const sadYimg = [];
for(let i = 1; i< 61; i++){
	let curframe = new Image();
	curframe.src = './img/sadYellowElf/sadyellow ('+ i +').png';
	sadYimg.push(curframe);
}
//finalWin
const winnerimg = [];
for(let i = 1; i< 68; i++){
	let curframe = new Image();
	curframe.src = './img/finalWin/winner ('+ i +').png';
	winnerimg.push(curframe);
}

//sound effect
const HappySound = new Howl({
	src:['./sound/Happy.wav'],
	volume : 0.5,
	html5:true
});

const SadSound = new Howl({
	src:['./sound/Sad.wav'],
	volume : 0.5,
	html5:true
});

const WinSound = new Howl({
	src:['./sound/Winner.wav'],
	volume : 0.5,
	html5:true
});

const effectAnim = {
	imgx : 0,
	imgy : 0,
	imgw : 803,
	imgh : 1080,

	imgwinnerw : 1920,
	imgwinnerh : 1080,

	x : cvs.width * 0.25,
	y : cvs.height * 0.25,
	w : 803 * 0.35,
	h : 1080 * 0.35,
	gap : 200,

	winnerx : cvs.width * 0.25,
	winnery : cvs.height * 0.25,
	winnerw : 1920 * 0.35,
	winnerh : 1080 * 0.35,

	frame : 0,
	frameSpeed : 2,
	curCounter : 0,
	isplayed : false,
	happyEffect:[happyBimg,happyRimg,happyYimg],
	sadEffect:[sadBimg,sadRimg,sadYimg],
	finalWin :[winnerimg],
	elfSound : [SadSound,HappySound],

	playEffectAnim : function(effect,stage,playtimes) {
		if(!this.isplayed){
			for(let i = 0 ; i<effect.length;i++){
				// console.log(this.frame);
				let posx = this.x + i * this.gap;
				if(stage == 4){
					ctx.drawImage(effect[i][this.frame],this.imgx,this.imgy,this.imgwinnerw,this.imgwinnerh,this.winnerx,this.winnery,this.winnerw,this.winnerh);
				}else{
					ctx.drawImage(effect[i][this.frame],this.imgx,this.imgy,this.imgw,this.imgh,posx,this.y,this.w,this.h);
				}
			}
			//play sound effects
			if(this.curCounter == 0 && this.frame == 0){
				if(stage == 4){
					WinSound.play();
				}else{
					var id = isCorrect ? 1 : 0;
					this.elfSound[id].play();
				}
			}
			this.frame += frames % this.frameSpeed == 0 ? 1 : 0;
			if(this.frame >= effect[0].length - 1){
					this.curCounter ++;
					this.frame = 0;
			}
			if(this.curCounter>=playtimes){
				this.isplayed = true;
				this.curCounter = 0;
			}
		}
	},

	reset:function(){
		this.frame = 0;
		this.isplayed = false;
	},
}


//buttons
const btnimg = [];
for(let i = 1; i< 4; i++){
	let curframe = new Image();
	curframe.src = './img/buttons/btn ('+ i +').png';
	btnimg.push(curframe);
}
const buttons = {
	imgx : 0,
	imgy : 0,
	imgw : 200,
	imgh : 200,

	x : 410,
	y : 650,
	w : 100,
	h : 100,
	gap : 260,

	draw : function(){
		if(curStage == 2){
			for(let i = 0; i < 3; i++){
				let posx = i * this.gap + this.x;
				ctx.drawImage(btnimg[i],this.imgx,this.imgy,this.imgw,this.imgh,posx,this.y,this.w,this.h);
			}
		}
	},
}

const textInstructor = {
	content : ["Click to Start the Game","Watch the Pattern","Repeat the Pattern","","You Win the Game!"],
	font : 'bold 40px Arial',
	color : "white",
	x : cvs.width * 0.48,
	y : cvs.height * 0.2,
	curContent : "",

	draw : function(){
		ctx.font = this.font;
		ctx.fillStyle = this.color;
		ctx.textAlign = "center";
		if(curStage == 3){
			if(isCorrect){
				this.curContent = "Correct!";
			}else{
				this.curContent = "Wrong!";
			}
		}else{
			this.curContent = this.content[curStage];
		}
		ctx.fillText(this.curContent, this.x, this.y);
	},

}

// let curAnswrId = 0;
let isCorrect = false;
window.addEventListener("click", clicked, false);
function clicked(e) {
	e.preventDefault();
	var x = e.clientX;
	var y = e.clientY;

	switch(curStage){
		case 0 ://click to start the game
			curStage ++; 
			break;
		case 1: //watch the pattern, click unavaible
			break;
		case 2: //play repeat the pattern, open click function
			// curStage ++;
			for(let i = 0 ; i < 3; i++){
				let curXmin = buttons.x + i * buttons.gap;
					if(x>curXmin && x<curXmin + buttons.w && y>buttons.y && y<buttons.y + buttons.h){
							isClicked = true;
			        if(i == windows.colororder[windows.curid]){
			        	isCorrect = true;
			        	windows.isplayed = false;
			        	windows.frame = 0;
			        	windows.curid ++;
			        }else{
			        	curStage ++;
			        	isCorrect = false;
			        }
			    }
			}
			break;
		case 3://click unavaible
			break;
	}

}

window.addEventListener('resize',function(evt){
	var size = {
		width: window.innerWidth || document.body.clientWidth,
	  height: window.innerHeight || document.body.clientHeight
	}
	cvs.width = size.width;
	cvs.height = size.height;
	resize();
});

function resize() {
	bg.resize();
}


function draw(){
	ctx.clearRect(0, 0, cvs.width,cvs.height);
	bg.draw();
	windows.draw();
	buttons.draw();
	textInstructor.draw();
}

function update(){
	bg.update();
	// windows.update();
}

function loop(){
	update();
	draw();
	frames ++;

	if(frames <= 50){
		resize();
	}else if(frames >= 10000){
		frames = 0;
	}
	requestAnimationFrame(loop);
}

loop();