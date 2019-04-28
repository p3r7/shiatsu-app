requirejs.config({
    baseUrl: 'scripts',
    paths: {
	// zepto: 'lib/zepto.min', // doesn't support AMD
        jquery: 'lib/jquery-2.2.2.min'
    }
});

requirejs(['jquery'], function ($) {
	$('.aka-bttn').on('click', function(){
		$(this).children()[0].click();
	});
});