var player1 = true;
var over = false;
var chessBox = [];
var board = [];
var player1Win = [];
var player2Win = [];

for(i=0;i<15;i++){
 chessBox[i]=[];
 for(j=0;j<15;j++){
   chessBox[i][j]=0;
 }

}

for(var i=0;i<15;i++){
 board[i]=[];
 for(var j=0;j<15;j++){
   board[i][j]=[];
 }
}

var count =0;


for(var i=0;i<15;i++){
 for(var j=0;j<11;j++){
 for(var k=0; k<5;k++){
   board[i][j+k][count] = true;
 }
 count++;
 }
}

for(var i=0;i<15;i++){
 for(var j=0;j<11;j++){
 for(var k=0; k<5;k++){
   board[j+k][i][count] = true;
 }
 count++;
 }
}

for(var i=0;i<11;i++){
 for(var j=0;j<11;j++){
 for(var k=0; k<5;k++){
   board[i+k][j+k][count] = true;
 }
 count++;
 }
}

for(var i=0;i<11;i++){
 for(var j=14;j>3;j--){
 for(var k=0; k<5;k++){
   board[i+k][j-k][count] = true;
 }
 count++;
 }
}

console.log(count);

for (var i=0;i<count;i++) {
 player1Win[i] = 0;
 player2Win[i] = 0;
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');
context.strokeStyle = "#BFBFBF";
drawChessBoard();

function drawChessBoard(){
   for(var i=0;i<15;i++){
     context.moveTo(15+i*30,15);
     context.lineTo(15+i*30,435);
     context.moveTo(15,15+i*30);
     context.lineTo(435,15+i*30);
     context.stroke();
   }

}

var oneStep = function(i,j,k){
context.beginPath();
context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
context.closePath();
  if(k){
    context.fillStyle = "#e31212";
  }
  else{
    context.fillStyle = "#176ee8";
  }
 context.fill();
}


var player2step = function(i,j){
			oneStep(i,j,false);
			chessBox[i][j]=1;
			for(var k=0;k<count;k++){
				if(board[i][j][k]){
					player2Win[k]++;
				}
				if(player2Win[k]==5){
          window.alert("player2 win");
          over = true;
				}
			}
      if(!over){
        player1=!player1;
      }

		}

chess.onclick = function(e){
   if(over){
     return;
   }
   var x = e.offsetX;
   var y = e.offsetY;
   var i = Math.floor(x/30);
   var j = Math.floor(y/30);
   if(chessBox[i][j]==0){
     if (player1) {
       oneStep(i,j,true);
        chessBox[i][j]=1;
        for(var k=0;k < count; k++){
          if(board[i][j][k]){
            player1Win[k]++;
          }
          if(player1Win[k] == 5){
            window.alert("player1 win");
            over = true;
          }
        }
        if(!over){
          player1=!player1;
        }
     }
     else {
       player2step(i,j);
     }
   }
}
