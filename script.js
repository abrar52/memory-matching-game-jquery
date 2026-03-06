$(document).ready(function(){

let symbols = ['🚀','⭐','🎮','🎧','💎','🔥','⚡','🧩'];

let cards = symbols.concat(symbols);

cards.sort(()=>0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matches = 0;

let timer = 0;
let timerInterval;
let gameStarted = false;



// generate cards
for(let i=0;i<cards.length;i++){

$("#gameBoard").append(
'<div class="card" data-symbol="'+cards[i]+'"></div>'
);

}



// click card
$(".card").click(function(){

if(lockBoard) return;
if($(this).hasClass("flipped")) return;


// start timer
if(!gameStarted){

gameStarted=true;

timerInterval=setInterval(function(){

timer++;
$("#timer").text(timer);

},1000);

}


$(this).addClass("flipped");
$(this).text($(this).data("symbol"));


if(!firstCard){

firstCard=$(this);

}else{

secondCard=$(this);

moves++;
$("#moves").text(moves);

checkMatch();

}

});



function checkMatch(){

let symbol1=firstCard.data("symbol");
let symbol2=secondCard.data("symbol");


if(symbol1===symbol2){

$("#matchSound")[0].play();

matches++;

firstCard=null;
secondCard=null;

if(matches===symbols.length){

clearInterval(timerInterval);

$("#winMessage").fadeIn();

}

}
else{

lockBoard=true;

$("#wrongSound")[0].play();

setTimeout(function(){

firstCard.removeClass("flipped").text("");
secondCard.removeClass("flipped").text("");

firstCard=null;
secondCard=null;

lockBoard=false;

},1000);

}

}

});