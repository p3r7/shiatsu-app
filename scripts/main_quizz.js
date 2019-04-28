
requirejs.config({
    baseUrl: 'scripts',
    paths: {
	// zepto: 'lib/zepto.min', // doesn't support AMD
        jquery: 'lib/jquery-2.2.2.min'
    }
});


var dbDbg
var gameDbg

requirejs(['jquery', 'app/math_ext', 'app/conf', 'app/db', 'app/game', 'app/images'], function ($, MathExt, conf, db, game, images) {

    dbDbg = db
    gameDbg = game

	game.initQuestion()

	$('#aka-choices-container').on('click', '.aka-choice', function(){
	    if (! game.isChoiceSelected) {
			var $this = $(this)
			$this.addClass('selected')
			var selectedChoiceId = $this.data("aka-id")
			if (selectedChoiceId == game.correctChoiceIndex) {
			    $this.addClass('correct')
			    game.registerCorrectAnswer()
			} else {
			    $this.addClass('wrong')
			    $('#aka-choice-' + game.correctChoiceIndex).addClass('correct')
			}
			$('#aka-img').css('display', 'block')
			game.isChoiceSelected = true
	    } else {
			game.isChoiceSelected = false
			$('#aka-img').css('display', 'none')
			game.initQuestion()
	    }
	});
});
