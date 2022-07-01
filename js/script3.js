var cvs = document.getElementById('canvas');
var ctx = cvs.getContext("2d"); // говорим о то что у нас 2д изображение
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

//музыка
var fly = new Audio();
var score_audio = new Audio();

fly.src = "fly.mp3";
score_audio.src = "score.mp3";


//Картинки
bird.src = "img/2.png";
bg.src = "img/1.png";
fg.src = "img/3.png";
pipeUp.src = "img/5.png";
pipeBottom.src = "img/4.png";
// Позиция птички

var xPos = 10;
var yPos = 150;
var grav = 1;
var score = 0;
// позиция блоков

var pipe = [];
pipe[0] = {
	x: cvs.width,
	y: 0,
}

document.addEventListener('keydown', moveUp);

var gap = 120; // расстояние между блоками чтоб птичка прошла
// Функции картинок 
function draw() {
	ctx.drawImage(bg, 0, 0); // картинки рисуется по х = 0  и у = 0
	for (let i = 0; i < pipe.length; i++) {

		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

		pipe[i].x--;

		if (pipe[i].x == 60) {
			pipe.push({
				x: cvs.width,
				y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			});
		}
		if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= 400) {
			location.reload();

		}
		if (pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	// ctx.drawImage(bird, 10, 150); // можно еще писать высоту и ширину картинки ( bird, 10, 150 , 299 , 300) тут 299 и 300 высота и ширина картинки
	ctx.drawImage(bird, xPos, yPos);
	yPos += grav;
	ctx.fillStyle = "#000";
	ctx.font = "144px";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);
	requestAnimationFrame(draw);
}

pipeBottom.onload = draw; // рисуется тогда когда загрузится 


function moveUp(event) {
	yPos -= 30;
	fly.play();
	if (event.code == 'KeyZ') {
		yPos += 130;
	}
}


// document.addEventListener('keydown', moveStop);

// function moveStop(event){
// 	console.

// }