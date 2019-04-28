define(function () {
    return {
		intRandom: function (max) {
		    return Math.floor((Math.random() * max))
		},
		signRandom: function (max) {
		    return Math.random() < 0.5 ? -1 : 1
		},
		objectRandom: function (obj) {
		    var keys = Object.keys(obj)
		    var selectedKey = keys[this.intRandom(keys.length)]
		    return obj[selectedKey]
		}
    }
});
