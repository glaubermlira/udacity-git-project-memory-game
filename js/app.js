/*Projeto Nanodegree udacity - memory game
autor: glauber Mendes
*/

//...................start........................
var openCards = [];
var movCounter = 0;

var ratingStars = $('i');
var clickes = 0;
cardsList = cardsImplement();
var gameEnded = false;

var interval;
var timer = document.querySelector('.timer');
timer.innerHTML = '0 mins : 0 secs';

var shuffled = shuffle(cardsList);
displayCards();
var click = 0;

// add event listener
$('.card').on('click', function () {
	click++;
	if (click === 1) {startTimer(); }
	matcher(this);
});

//..............................................
function cardsImplement() {
	var cards = [];
	cards = document.getElementsByClassName('card');
	return transformer(cards);
}

//convert object into array
function transformer(obj) {
	var transformed = [];
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			transformed.push(obj[key].innerHTML);
		}
	}
	return transformed;
}

//........display cards.............................

function displayCards() {
	var list = createCards();
	replacer(list);
}

function replacer(list) {
	document.getElementsByClassName('deck')[0].innerHTML = list.innerHTML;
}

//.........creat cards to shuffled..................
function createCards() {
	var list = document.createElement('ul');
	for (var x = 0; x < shuffled.length; x++) {
		var li = document.createElement('li');
		li.innerHTML = shuffled[x];
		li.classList.add('card');
		list.appendChild(li);
	}
	return list;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

//.......handel method.....................................
function matcher(card) {
	if (isClicked(card)) {
		return;
	}
	displayIcons(card);
	markedOpened(card);
}

function isClicked(card) {
	if ($(card).hasClass('show') || $(card).hasClass('open')) {
		return true;
	}
	return false;
}

//..................................................
function displayIcons(card) {
	$(card).addClass('show open');
}

function incMoves(card) {
	if (gameEnded || $(card).hasClass('match') || $(card).is($(openCards[0]))) {
		return false;
	}
	movCounter++;
	rating(movCounter);
	$('.moves').text(movCounter);
}

//........check 2 cards is similar html content and class .........
function isMatch(openCards) {
	let case1 = openCards[0].innerHTML != openCards[1].innerHTML;
	let case2 = $(openCards[0]).is($(openCards[1]));
	if (case1 || case2) {
		return false;
	} else {
		return true;
	}
};

function matched(openCards) {
	closeOpenCards(openCards);
	markAsMatched(openCards);
	openedCards = [];
}

function markAsMatched(openCards) {
	for (let i = openCards.length - 1; i >= 0; i--) {
		$(openCards[i]).addClass('match');
	}
}
function noMatched(openCards) {
	var currentCards = openCards;
	animate(currentCards);
	setTimeout(function(){
		hideIcons(currentCards);
	}, 1000);
	openCards = [];
}
//.........................................................
function rating(moves) {
	var score = 3;
	if (moves <= 15) {
		ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
		score = 3;
	} else if (moves > 15 && moves <= 25) {
		ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		score = 2;
	} else if (moves > 25) {
		ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		score = 1;
	}
	return score;
}

//..........animate cards..........................................
function animate(openedCards) {
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openCards[i]).addClass('unmatched');
	}
}

function hideIcons(openCards) {
	for (var i = openCards.length - 1; i >= 0; i--) {
		$(openCards[i]).removeClass('open show unmatched');
	}
}

function closeOpenCards(openedCards) {
	for (var i = openedCards.length - 1; i >= 0; i--) {
		$(openedCards[i]).removeClass('open');
	}
}

/*styleDanger = (openCards) => {
  for (var i = openCards.length - 1; i >= 0; i--) {
    $(openCards[i]).addClass('danger');
  }
}*/

function checkMatchedAll() {
	var all = true;
	$('.card').each(function () {
		return all = $(this).hasClass('match');
	});
	if (all) {
		showStatistics();
		gameEnded = true;
	}
}

function handleReset() {
	window.location.reload();
}

function showStatistics() {
	var score = rating(movCounter);
	clearInterval(interval);
	var time = getTimer();
	sweetAlert('Congratulations!!! You won with ' + movCounter + ' movings scoring ' + score + ' star, in the time of ' + time);
}

function getTimer() {
	return $('#timer').text();
}

function markedOpened(card) {
	if (openCards.length > 0) {
		incMoves(card);
		//displaySymbol(card);
		openCards.push(card);
		if (isMatch(openCards)) {
			matched(openCards);
			openCards = [];
		} else {
			noMatched(openCards);
			openCards = [];
		}
	} else {
		openCards.push(card);
		incMoves(card);
	}
	checkMatchedAll();
}

//......timer for calculate time gaming it.........
var second = 0, minute = 0;	hour = 0;

function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = minute + ' mins ' + ' : ' + second + ' secs';
		second++;
		if (second === 60) {
			minute++;
			second = 0;
		}
		if (minute === 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}

function sweetAlert(titleToBind, textToShow, typeToBind) {
	const swalWithBootstrapButtons = swal.mixin({
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
	});

	swalWithBootstrapButtons({
		title: titleToBind,
		text: textToShow,
		type: typeToBind,
		showCancelButton: true,
		confirmButtonText: 'Play Again',
		cancelButtonText: 'Do not play!',
		reverseButtons: true
	}).then((result) => {
		if (result.value) {
			swal({
				title: 'Reloading',
				text: 'have fun',
				type: 'success',
				timer: 2500
			});
			setTimeout(function () {
				window.location.reload();
			}, 2000);
		} else if (result.dismiss === 'cancel') {
			swal({
				title: ':(',
				text: 'Refresh the page to play again',
				type: 'info',
				animation: false,
				customClass: 'animated tada',
				timer: 3000
			});
		}
	});
}


//................restart game.................................
$('.restart').click(function () {
		window.location.reload();
	});
