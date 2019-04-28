requirejs.config({
    baseUrl: 'scripts',
    paths: {
	// zepto: 'lib/zepto.min', // doesn't support AMD
        jquery: 'lib/jquery-2.2.2.min'
    }
});

var dbDbg
var confDbg

requirejs(['jquery', 'app/conf', 'app/default_conf', 'app/db'], function ($, conf, default_conf, db) {

    dbDbg = db
    confDbg = conf


    // --------------------------------------------------------------------
    // POINT TYPES

    confPointList = conf.filteredPointTypeList
    completePointList = default_conf.filteredPointTypeList

    for (var i = 0; i < completePointList.length; i++) {
	var p = completePointList[i]

	var checkboxHtml = '<input type="checkbox" class="checkbox-point-conf" name="' + p + '" value="' + p + '"'
	if (confPointList.includes(p))
	    checkboxHtml += ' checked'
	checkboxHtml += '> ' + p + '<br>'

	$('#aka-conf-points-container').append(checkboxHtml)

    }

    $('.checkbox-point-conf').on('change', function() {
	var $this = $(this)
	if (this.checked)
	    conf.addPoint($this.attr('name'))
	else
	    conf.removePoint($this.attr('name'))
    });

    // --------------------------------------------------------------------
    // MERIDIANS

    confMeridianList = conf.filteredMeridianList
    completeMeridianList = default_conf.filteredMeridianList

    for (var i = 0; i < completeMeridianList.length; i++) {
	var m = completeMeridianList[i]

	var checkboxHtml = '<input type="checkbox" class="checkbox-meridian-conf" name="' + m + '" value="' + m + '"'
	if (confMeridianList.includes(m))
	    checkboxHtml += ' checked'
	checkboxHtml += '> ' + m + '<br>'

	$('#aka-conf-meridians-container').append(checkboxHtml)

    }

    $('.checkbox-meridian-conf').on('change', function() {
	var $this = $(this)
	if (this.checked)
	    conf.addMeridian($this.attr('name'))
	else
	    conf.removeMeridian($this.attr('name'))
    });


});
