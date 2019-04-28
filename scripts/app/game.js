define(['jquery', 'app/math_ext', 'app/array_ext', 'app/conf', 'app/db', 'app/images'], function ($, MathExt, ArrayExt, conf, db, images) {
    return {

	// INITIALISATION

	isChoiceSelected: false,
	chosenMeridian: null,
	questionType: null,
	correctChoiceIndex: null,

	pointType: null,
	point: null,
	pointImgPath: null,

	initQuestion: function () {
	    this.questionType = MathExt.objectRandom(conf.questionTypeEnum)

	    var rawChoices
	    var question
	    if (this.questionType === conf.questionTypeEnum.point) {

			var pointTypeList = db.pointTypeList
			if (conf.filteredPointTypeList) {
			    pointTypeList = conf.filteredPointTypeList
			}

			var chosenPointTypeIndex = MathExt.intRandom(pointTypeList.length)
			this.pointType = pointTypeList[chosenPointTypeIndex]

			this.initSelectMeridian()

			this.point = this.chosenMeridian.point[this.pointType]
			this.pointImgPath = images.getMeridianImageSrc(this.chosenMeridian.label.enAbbrev, this.point)
			//this.pointImgPath = "img/who/" + this.chosenMeridian.label.enAbbrev + this.point + ".jpg"

			rawChoices = this.getChoicesPoint()

			$('#aka-img').attr('src', this.pointImgPath)
			question = this.pointType + " de " + this.chosenMeridian.label.frAbbrev + " ?"
	    } else {
			this.initSelectMeridian()

			rawChoices = this.getChoicesVertebra()

			$('#aka-img').attr('src', '')
			question = "Vertèbre de " + this.chosenMeridian.label.frAbbrev + " ?"
	    }

	    this.correctChoiceIndex = rawChoices[0];
	    var choices = rawChoices[1];

	    this.displayQuestion(question)
	    this.displayChoices(choices)
	},

	initSelectMeridian: function () {
	    this.clearCorrectAnswerCacheIfFull()
	    var chosenMeridianIndex
	    var meridian
	    do {
			chosenMeridianIndex = MathExt.intRandom(db.getNumberOfMeridians())
			meridian = db.getMeridianByIndex(chosenMeridianIndex)
			console.info(chosenMeridianIndex)
	    } while(!this.isMeridianInFilteredList(meridian)
		    ||this.hasQuestionAlreadyBeenAnswered(chosenMeridianIndex));
	    this.chosenMeridian = meridian
	},

	getConf: function() {
	    return conf
	},

	isMeridianInFilteredList: function (meridian) {
	    if(conf.filteredMeridianList) {
			return (conf.filteredMeridianList.indexOf(meridian.label.frAbbrev) !== -1)
	    } else {
			return true
	    }
	},

	getNumberOfMeridians: function (meridian) {
	    if(conf.filteredMeridianList) {
			return conf.filteredMeridianList.length
	    } else {
			return db.getNumberOfMeridians()
	    }
	},

	// ----------------------------------------------------------------

	// PAST CORRECT ANSWERS CACHE

	pastAnswers: {},
	registerCorrectAnswer: function () {
	    if(this.questionType === conf.questionTypeEnum.point) {
			if(!this.pastAnswers[this.questionType])
			    this.pastAnswers[this.questionType] = {}
			if(!this.pastAnswers[this.questionType][this.pointType])
			    this.pastAnswers[this.questionType][this.pointType] = []
			this.pastAnswers[this.questionType][this.pointType].push(this.chosenMeridian.index)
	    } else {
			if(!this.pastAnswers[this.questionType])
			    this.pastAnswers[this.questionType] = []
			this.pastAnswers[this.questionType].push(this.chosenMeridian.index)
	    }
	},

	clearCorrectAnswerCacheIfFull: function () {
	    var questionTypeCache = []
	    if(this.questionType === conf.questionTypeEnum.point) {
			if(ArrayExt.checkNested(this.pastAnswers, this.questionType, this.pointType)
			   && this.pastAnswers[this.questionType][this.pointType].length === this.getNumberOfMeridians())
				this.pastAnswers[this.questionType][this.pointType] = []
		} else {
			if(this.pastAnswers[this.questionType]
			   && this.pastAnswers[this.questionType].length === this.getNumberOfMeridians())
			    this.pastAnswers[this.questionType] = []
	    }
	},

	// gameDbg.pastAnswers[gameDbg.questionType][gameDbg.pointType].indexOf(8) !== -1
	// gameDbg.hasQuestionAlreadyBeenAnswered(8)
	hasQuestionAlreadyBeenAnswered: function(meridianIndex) {
	    if(this.questionType === conf.questionTypeEnum.point) {
			if(ArrayExt.checkNested(this.pastAnswers, this.questionType, this.pointType))
			    return this.pastAnswers[this.questionType][this.pointType].indexOf(meridianIndex) !== -1
			else
			    return false
	    } else {
			if(this.pastAnswers[this.questionType])
			    return this.pastAnswers[this.questionType].indexOf(meridianIndex) !== -1
			else
			    return false
	    }
	},

	// ----------------------------------------------------------------

	// FORM OPTIONS GENERATION

	getChoicesPoint: function () {
	    var choices = []
	    var deltas = []
	    var correctChoiceIndex = MathExt.intRandom(conf.nbChoices)
	    choices[correctChoiceIndex] = this.point + this.chosenMeridian.label.frAbbrev

	    for(i=0; i<conf.nbChoices; i++) {
			if(i !== correctChoiceIndex) {
			    var delta
			    do {
					var deltaValue = Math.floor((Math.random() * conf.nbChoices) + 1)
					delta = deltaValue * MathExt.signRandom()
			    } while(delta < 1
				    || deltas.indexOf(delta) !== -1)
			    deltas.push(delta)
			    choices[i] = this.point + delta + this.chosenMeridian.label.frAbbrev
			}
	    }

	    return [correctChoiceIndex, choices]
	},
	getChoicesVertebra: function () {
	    var choices = []
	    var correctChoiceIndex = MathExt.intRandom(conf.nbChoices)
	    choices[correctChoiceIndex] = this.chosenMeridian.vertebra
	    for(i=0; i<conf.nbChoices; i++) {
			if(i !== correctChoiceIndex) {
			    var vertebra
			    do {
					var index = MathExt.intRandom(db.meridian_vertebra.length)
					vertebra = db.meridian_vertebra[index]
			    } while(vertebra === this.chosenMeridian.vertebra)
			    choices[i] = vertebra
			}
	    }
	    return [correctChoiceIndex, choices]
	},


	// ----------------------------------------------------------------

	// VISUALS

	displayQuestion: function (question) {
	    $('#aka-question').html(question)
	},
	displayChoices: function (choices) {
	    var choicesHtml = ""
	    $.each(choices, function(i, v) {
			choicesHtml += '<div class="aka-choice" id="aka-choice-' + i + '" data-aka-id="' + i + '" data-aka-value="' + v + '">' + v + '</div>'
	    });
	    $('#aka-choices-container').html(choicesHtml)
	}
    }
});
