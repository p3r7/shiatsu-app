requirejs.config({
    baseUrl: 'scripts',
    paths: {
	// zepto: 'lib/zepto.min', // doesn't support AMD
        jquery: 'lib/jquery-2.2.2.min'
    }
});

var dbDbg
var confDbg

requirejs(['jquery', 'app/conf', 'app/default_conf', 'app/db', 'app/images'], function ($, conf, default_conf, db, images) {

    dbDbg = db
    confDbg = conf

    var urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has('meridian')) {
		var meridian = urlParams.get('meridian');
		diplayConsult(meridian);
	} else {
		var selectHtml = db.getMeridiansSelect();
		$('#aka-meidians-select-container').html(selectHtml);
	}

	$('#meridian-select').on('change', function() {
		var frAbbrev = $("#meridian-select option:selected").text()
		diplayConsult(frAbbrev);
	});

   function diplayConsult (meridianFrLabel) {
		$('#aka-meridian-name').html('')
		$('#aka-points-container').html('')

   		var meridianIndex = null;
		for (var i = 0; i < default_conf.filteredMeridianList.length; i++) {
		    if (default_conf.filteredMeridianList[i] === meridianFrLabel)
				meridianIndex = i
		}

		var meridianLabels = db.meridianLabels.find(obj => {
		    return obj.frAbbrev === meridianFrLabel
		})
		var enLabel = meridianLabels.enAbbrev

		$('#aka-meridian-name').append(meridianFrLabel)

		var pointTypeList = default_conf.filteredPointTypeList
		var confPointTypeList = conf.filteredPointTypeList
		for (var i = 0; i < pointTypeList.length; i++) {

		    var pointType = pointTypeList[i]
		    var pointIndex = db.meridianPointProperties[meridianIndex][i+1]

		    if (confPointTypeList.includes(pointType) && pointIndex !== null) {
				var pointImgSrc = images.getMeridianImageSrc(enLabel, pointIndex)

				var pointHtml = '<h2>' + pointType + '</h2>' + "\n"
				pointHtml += '<img src="' + pointImgSrc + '"/>'

				$('#aka-points-container').append(pointHtml)
		    }
		}
   }

});
