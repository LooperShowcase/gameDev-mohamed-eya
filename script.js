const cardsContainer = document.getElementById("cards");
let cards = [];
let score=0;
let firstCard, secondCard;
let lockboard = false;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    console
    console.log(cards);
    shuffleCards();
    generataCards();
  }); 


function shuffleCards(){
let temp;
let currentIndex=cards.length;
let randomIndex;

while (currentIndex !==0){
randomIndex=Math.floor(Math.random()* currentIndex);
currentIndex--;
temp=cards[currentIndex];
cards[currentIndex]=cards[randomIndex];
cards[randomIndex]=temp;

}
}


function generataCards(){
  for( let card of cards){
    const cardElement=document.createElement('div');
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name)
    cardElement.innerHTML=`
      <div class="front">
        <img class="front-image" src="${card.image}">
      </div>
      <div class="back">
      </div>
    `;
    cardsContainer.appendChild(cardElement);
    cardElement.addEventListener("click" ,flipCard); 

  }
}


function flipCard(){
  if (lockboard) return;
  if(this===firstCard)return;

  this.classList.add('flipped');

  if(!firstCard){
  firstCard= this;
  return;
}
secondCard=this;
lockboard=true;
checkForMatch();
document.getElementById('score').textContent=score
}

function checkForMatch(){
  let isMatch = firstCard.dataset.name=== secondCard.dataset.name
  if(isMatch){
    disableCards();
  }else{
    unflipcards();
  }
}

function disableCards(){
 firstCard.removeEventListener("click", flipCard);
 secondCard.removeEventListener("click", flipCard);
score++;
unlockBoard();
}
function unflipcards(){
setTimeout(() => {
firstCard.classList.remove("flipped");
secondCard.classList.remove("flipped");
unlockBoard();
},1000);
}

function unlockBoard(){
firstCard= null;
secondCard= null;
lockboard=false;
}

function restart() {
  cardsContainer.innerHTML="";
  unlockBoard();
  generataCards();
  shuffleCards();
  score = 0 ;
  
  document.getElementById('score').textContent = score;
  stopConfetti();
}