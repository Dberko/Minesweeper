var minesweeper = (function() {
	var STATE = {
		blank: 1,
		opened: 2,
		flagged: 3,
		question: 4
	},
	    IMAGE = {
		blank: 'assets/images/board/blank.gif',
	    flagged: 'assets/images/board/flagged.gif',
	    question: 'assets/images/board/question.gif',
	    minedeath: 'assets/images/mine/minedeath.gif',
	    minemisflagged: 'assets/images/mine/minemisflagged.gif',
	    minerevealed: 'assets/images/mine/minerevealed.gif',
	    facedead: 'assets/images/face/facedead.gif',
	    facesmile: 'assets/images/face/facesmile.gif',
	    facewin: 'assets/images/face/facewin.gif',
	    'number-': 'assets/images/number/number-.gif',
	    number0: 'assets/images/number/number0.gif',
	    number1: 'assets/images/number/number1.gif',
	    number2: 'assets/images/number/number2.gif',
	    number3: 'assets/images/number/number3.gif',
	    number4: 'assets/images/number/number4.gif',
	    number5: 'assets/images/number/number5.gif',
	    number6: 'assets/images/number/number6.gif',
	    number7: 'assets/images/number/number7.gif',
	    number8: 'assets/images/number/number8.gif',
	    number9: 'assets/images/number/number9.gif',
	    open0: 'assets/images/open/open0.gif',
	    open1: 'assets/images/open/open1.gif',
	    open2: 'assets/images/open/open2.gif',
	    open3: 'assets/images/open/open3.gif',
	    open4: 'assets/images/open/open4.gif',
	    open5: 'assets/images/open/open5.gif',
	    open6: 'assets/images/open/open6.gif',
	    open7: 'assets/images/open/open7.gif',
	    open8: 'assets/images/open/open8.gif'
	},
		options = {
		width: 9,
		height: 9,
		mines: 10
	};

	var isValidPos = function(position) {
		return position[0] >= 0 && position[0] < options.height &&
           position[1] >= 0 && position[1] < options.width;
	};

	var linearPos = function( position ) {
    	return position[0] * options.width + position[1];
  	};

  	var restrict = function(num, min, max) {
  		if (!num) {
  			num = 0;
  		}

  		if (num < min) {
  			num = min;
  		} else if (num > max) {
  			num = max;
  		} else {
  			return num;
  		}
  	};

  	var board = {
  		init: function() {
	  	  this.rows = options.height;
	      this.cols = options.width;
	      this.minesLeft = options.mines;
	      this.timePassed = 0;
	      this.timerID = 0;
	      this.squares = [];
	      this.minePositions = [];
	      this.squaresOpened = 0;
	      this.noneOpened = true;
	      this.create();
  		},

  		create: function() {
  			var content;
  			for( var i = 0; i < this.rows; i++ ){
	        	content += '<tr>';
	        	for( var j = 0; j < this.cols; j++ ) {
	          		this.squares.push( new Square( [i, j] ) );
	         		 content += '<td><img src="' + IMAGE.blank +
	                     		'" id=' + ( i * this.cols + j) + '></td>';
	        	}
	        content += '</tr>';
	      	}
	      	$( '.container' ).width( this.cols * 16 + 20 );
	      	$( 'tbody' ).empty().append( content );

	      	this.displayMinesCount();
	      	this.displayTimer();
	  	},

	  	generateMines: function(position) {
	  		var size = options.width * options.height;
	  	
		  	shuffleArray = function( array ) {
	            for (var i = array.length - 1; i > 0; i--) {
	              var j = Math.floor(Math.random() * (i + 1));
	              var temp = array[i];
	              array[i] = array[j];
	              array[j] = temp;
	            }
	            return array;
	        };

	        for (var i = 0; i < array.length - 1; i++) {
	        	if (i != position) {
	        		this.minePositions.push(i);
	        	}
	        }

	        this.minePositions = shuffleArray(this.minePositions).slice(0, options.mines);
	        this.addMines();

		},

		addMines: function() {
			var square,
				neighborSquare,
				neighborPositions,
				squares = this.squares;

			$.each(this.minePositions, function(index, position){
				square = squares[position];
				square.isMine = true;

				neighborPositions = square.neighborPositions();
				$.each(neighborPositions, function(index, neighborPosition) {
					neighborSquare = squares[neighborPosition];
					neighborSquare.adjacentMines += 1;
				});
			});

			this.timerID = setInterval(this.updateTimer.bind(this), 1000);
		},

		// How many more mines can be flagged
		displayMinesCount: function() {
			var display = restrict(this.minesLeft, -99, 999);
			var displayStr = ('00' + Math.abs(display) ).slice(-3);

			if (display < 0) {
				displayStr = '-' + displayStr.slice(-2);
			}
			$( '#mine0' ).attr( 'src', IMAGE['number' + displayStr[0]] );
	      	$( '#mine1' ).attr( 'src', IMAGE['number' + displayStr[1]] );
	      	$( '#mine2' ).attr( 'src', IMAGE['number' + displayStr[2]] );
		},

		updateTimer: function() {
			this.timePassed++;
			this.displayTimer();
			if (this.timePassed >= 999) {
				this.timePassed = 999;
				clearInterval(this.timerID);
			}
		},

		displayTimer: function() {
		    var displayStr = ('00' + Math.abs(this.timePassed) ).slice(-3);
			$( '#time0' ).attr( 'src', IMAGE['number' + displayStr[0]] );
			$( '#time1' ).attr( 'src', IMAGE['number' + displayStr[1]] );
			$( '#time2' ).attr( 'src', IMAGE['number' + displayStr[2]] );
		},

		handleInput: function(clickType, $square) {
			var square = this.squares[$square.attr['id']];
			// left click
			if (clickType == 1) {
				
			} else if (clickType == 3) {
				
			}
		}

  	};

}); 