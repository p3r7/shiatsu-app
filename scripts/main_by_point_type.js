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

    var pointType = 'Ho'
    // var pointType = null
    if (urlParams.has('point_type')) {
		var pointType = urlParams.get('point_type');
		diplayConsult(pointType)
    } else {
		var selectHtml = db.getPointTypesSelect();
		$('#aka-point-type-select-container').html(selectHtml);
    }

	$('#point-type-select').on('change', function() {
		//var label = $("#meridian-select option:selected").text()
		diplayConsult(this.value);
	});


    function diplayConsult (pointType) {
		$('#aka-point-type-name').html('')
		$('#aka-points-container').html('')

		$('#aka-point-type-name').append(pointType)

		var pointTypeIndex = default_conf.filteredPointTypeList.indexOf(pointType)

		var meridianList = default_conf.filteredMeridianList
		var confMeridianList = conf.filteredMeridianList
		for (var i = 0; i < meridianList.length; i++) {

		    var meridian = meridianList[i]
		    var pointIndex = db.meridianPointProperties[i][pointTypeIndex+1]

		    if (confMeridianList.includes(meridian) && pointIndex !== null) {

				var pointName = null

				var enLabel = null
				if (typeof pointIndex === 'string') {
				    var point = pointIndex
				    pointName = pointIndex
				    pointIndex = pointIndex.match(/\d+/)[0]
				    frLabel = point.substring(pointIndex.length)
				    var meridianLabels = db.meridianLabels.find(obj => {
						return obj.frAbbrev === frLabel
				    })
				    var enLabel = meridianLabels.enAbbrev
				} else {
				    var meridianLabels = db.meridianLabels.find(obj => {
						return obj.frAbbrev === meridian
				    })
				    var enLabel = meridianLabels.enAbbrev
				    pointName = pointIndex + meridian
				}
				var pointImgSrc = images.getMeridianImageSrc(enLabel, pointIndex)

				var pointHtml = '<h2>' + meridian + ': ' + pointName + '</h2>' + "\n"
				pointHtml += '<img src="' + pointImgSrc + '"/>'

				$('#aka-points-container').append(pointHtml)
		    }
		}
	}
});
