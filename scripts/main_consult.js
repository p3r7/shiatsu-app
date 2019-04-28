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


    var urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('point')) {
		var pointRaw = urlParams.get('point');

		var pointNumber = pointRaw.match(/\d+/)[0];
		var meridian = pointRaw.substring(pointNumber.length)

		console.info(meridian)
		console.info(db.meridianLabels)

		var meridianLabels = db.meridianLabels.find(obj => {
		    return obj.frAbbrev === meridian
		})
		var enLabel = meridianLabels.enAbbrev;

		var pointImgSrc = images.getMeridianImageSrc(enLabel, pointNumber)
		$('#aka-img').attr('src', pointImgSrc)
		$('#aka-img').css('display', 'block')

		$('#aka-question').html(pointRaw)
    } else {
    	// TODO: ask for point
    }
});
