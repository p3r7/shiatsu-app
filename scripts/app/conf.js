define(['app/default_conf'], function (default_conf) {
    return {
	nbChoices: 4,
	questionTypeEnum: {
	    // TODO: probability weight
	    point: 'point',
	    // vertebra: 'vertebra',
	},


	// ----------------------------------------------------------------
	// POINT TYPES

	get filteredPointTypeList() {
	    var pointList = localStorage.getItem('filteredPointTypeList')

	    if (! pointList) {
		pointList = default_conf.filteredPointTypeList
		localStorage.setItem('filteredPointTypeList', pointList)
	    } else {
		pointList = pointList.split(',')
	    }

	    return pointList
	},
	removePoint (v) {
	    var pointList = this.filteredPointTypeList
	    if (pointList.includes(v)) {
		var i = pointList.indexOf(v);
		pointList.splice(i, 1);
		localStorage.setItem('filteredPointTypeList', pointList)
	    }
	},
	addPoint (v) {
	    var pointList = this.filteredPointTypeList
	    if (! pointList.includes(v)) {
		pointList.push(v)

		// reorder array
		pointListReordered = []
		completePointList = default_conf.filteredPointTypeList
		for (var i = 0; i < completePointList.length; i++) {
		    var v2 = completePointList[i]
		    if (pointList.includes(v2))
			pointListReordered.push(v2)
		}

		localStorage.setItem('filteredPointTypeList', pointListReordered)

	    }
	},


	// ----------------------------------------------------------------
	// MERIDIANS

	get filteredMeridianList() {
	    var meridianList = localStorage.getItem('filteredMeridianList')

	    if (! meridianList) {
		meridianList = default_conf.filteredMeridianList
		localStorage.setItem('filteredMeridianList', meridianList)
	    } else {
	    	meridianList = meridianList.split(',')
	    }

	    return meridianList
	},
	removeMeridian (v) {
	    var meridianList = this.filteredMeridianList
	    if (meridianList.includes(v)) {
		var i = meridianList.indexOf(v);
		meridianList.splice(i, 1);
		localStorage.setItem('filteredMeridianList', meridianList)
	    }
	},
	addMeridian (v) {
	    var meridianList = this.filteredMeridianList
	    if (! meridianList.includes(v)) {
		meridianList.push(v)

		// reorder array
		meridianListReordered = []
		completeMeridianList = default_conf.filteredMeridianList
		for (var i = 0; i < completeMeridianList.length; i++) {
		    var v2 = completeMeridianList[i]
		    if (meridianList.includes(v2))
			meridianListReordered.push(v2)
		}

		localStorage.setItem('filteredMeridianList', meridianListReordered)

	    }
	}


    }
});
