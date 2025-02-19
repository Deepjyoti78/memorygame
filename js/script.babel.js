'use strict';

var cardsArray = [{
  'name': 'shell',
  'img': 'img/blueshell.png'
}, {
  'name': 'star',
  'img': 'img/star.png'
}, {
  'name': 'bobomb',
  'img': 'img/bobomb.png'
}, {
  'name': 'mario',
  'img': 'img/mario.png'
}, {
  'name': 'luigi',
  'img': 'img/luigi.png'
}, {
  'name': 'peach',
  'img': 'img/peach.png'
}];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
    card.addEventListener('animationend', function() {
      card.style.visibility = 'hidden';
    });
  });
  
  // Check if all cards are matched
  var allCards = document.querySelectorAll('.card');
  var matchedCards = document.querySelectorAll('.match');
  if (allCards.length === matchedCards.length) {
    setTimeout(function() {
      var binaryMessage = document.createElement('div');
      binaryMessage.textContent = '01000010 - 01101100 - 01101111 - 01100011 - 01101011 - 00110100 - 01000010 - 01001101 BASEMENT';
      binaryMessage.style.position = 'fixed';
      binaryMessage.style.top = '50%';
      binaryMessage.style.left = '50%';
      binaryMessage.style.transform = 'translate(-50%, -50%)';
      binaryMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      binaryMessage.style.color = '#fff';
      binaryMessage.style.padding = '20px 40px';
      binaryMessage.style.borderRadius = '10px';
      binaryMessage.style.fontSize = '24px';
      binaryMessage.style.fontWeight = 'bold';
      binaryMessage.style.zIndex = '1000';
      binaryMessage.style.animation = 'popIn 0.5s ease-out';
      game.appendChild(binaryMessage);
    }, 500);
  }
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
