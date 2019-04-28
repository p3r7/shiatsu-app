define(function () {
    return {

		imgRepoBaseUrl: 'http://restapi' + '.fs' + '.n' + 'cloud' + '.com/' + 'herb' + 'hub/images/' + 'acu' + 'point/',
		// imgRepoBaseUrl: 'img/who/',

		getMeridianImageSrc : function (enMeridianAbbrev, index) {
		    return this.imgRepoBaseUrl + enMeridianAbbrev + index + '.jpg';
		}
    }
});
