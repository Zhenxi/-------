var window_width =1024;
var window_height = 612;
var radius = 8; 
var margintop =60;
var marginleft =30;

var endTime = new Date(2016,6,23,21,30,22);
var curShowTimeSeconds = 0;//表示现在倒计时需要有多少秒

var balls=[];
const colors= ["#335584","#0099cc","#aa66cc","#ff8800","yellow","red","#ff4444","#669900","#99cc00"]
window.onload = function(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = window_width;
	canvas.height = window_height;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	// render(context)
	setInterval(
		function(){
			render(context);
			update();						 
		}
		,50
	);
}
<!--获取从现在倒计时需要有多少秒-->
function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime()-curTime.getTime();
	ret = Math.round(ret/1000);

	return ret >=0?ret:0;              //秒
}

function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds = curShowTimeSeconds % 60;


	if(nextSeconds!= curSeconds){
		//加小球
		if(parseInt(curHours/10) != parseInt(nextHours/10)){
			addBalls(marginleft+0,margintop,parseInt(curHours/10));
		}
		if(parseInt(curHours%10) != parseInt(nextHours%10)){
			addBalls(marginleft+15*(radius+1),margintop,parseInt(curHours%10));
		}
		if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
			addBalls(marginleft+39*(radius+1),margintop,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
			addBalls(marginleft+54*(radius+1),margintop,parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
			addBalls(marginleft + 78*(radius+1),margintop,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
			addBalls(marginleft+93*(radius+1),margintop,parseInt(curSeconds%10));
		}
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();


}

//小球的运动
function updateBalls(){
	for (var i =0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy +=balls[i].g;


		if (balls[i].y>= window_height-radius){
			balls[i].y = window_height-radius;
			balls[i].vy = -balls[i].vy*0.7;
		}
	}
}

//小球初始状态
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){	
			if(digit[num][i][j]==1){
				var aBall = {
					x: x+(2*j+1)*(radius+1),
					y: y+(2*i+1)*(radius+1),

					g:2+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*5,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	} 
}


function render(cxt){
	cxt.clearRect(0,0,window_width,window_height);//重绘
	var hours = parseInt(curShowTimeSeconds/3600)
	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60)
	var seconds = curShowTimeSeconds % 60

	renderDigit(marginleft,margintop,parseInt(hours/10),cxt);
	renderDigit(marginleft + 15*(radius+1),margintop,parseInt(hours%10),cxt);
	renderDigit(marginleft + 30*(radius+1),margintop,10,cxt);
	renderDigit(marginleft + 39*(radius+1),margintop,parseInt(minutes/10),cxt);
	renderDigit(marginleft + 54*(radius+1),margintop,parseInt(minutes%10),cxt);
	renderDigit(marginleft + 69*(radius+1),margintop,10,cxt);
	renderDigit(marginleft + 78*(radius+1),margintop,parseInt(seconds/10),cxt);
	renderDigit(marginleft + 93*(radius+1),margintop,parseInt(seconds%10),cxt);

	for (var i = 0; i<balls.length;i++){
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI);
		cxt.closePath();

		cxt.fill()
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle="#aaa";
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){	
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+(2*j+1)*(radius+1),y+(2*i+1)*(radius+1),radius,0,2*Math.PI);
				cxt.closePath();
				cxt.fill()
			}

		}
	}
}