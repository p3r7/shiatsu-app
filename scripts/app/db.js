
define(function () {
	return {

		// ----------------------------------------------------------------
		// DB: LOGES


		// ----------------------------------------------------------------
		// DB: MERIDIANS

		meridianLabels: [
		{
			enAbbrev: 'LU',
			frAbbrev: 'P'
		},
		{
			enAbbrev: 'LI',
			frAbbrev: 'Gi'
		},
		{
			enAbbrev: 'ST',
			frAbbrev: 'E'
		},
		{
			enAbbrev: 'SP',
			frAbbrev: 'Rtp'
		},
		{
			enAbbrev: 'HT',
			frAbbrev: 'C'
		},
		{
			enAbbrev: 'SI',
			frAbbrev: 'Ig'
		},
		{
			enAbbrev: 'BL',
			frAbbrev: 'V'
		},
		{
			enAbbrev: 'KI',
			frAbbrev: 'Rn'
		},
		{
			enAbbrev: 'PC',
			frAbbrev: 'MC'
		},
		{
			enAbbrev: 'TE',
			frAbbrev: 'TR'
		},
		{
			enAbbrev: 'GB',
			frAbbrev: 'VB'
		},
		{
			enAbbrev: 'LR',
			frAbbrev: 'F'
		},
		{
			enAbbrev: 'GV',
			frAbbrev: 'VG'
		},
		{
			enAbbrev: 'CV',
			frAbbrev: 'VC'
		}
		],

		// nb points, E, S, Lo, Yuan, Mu, Zi, Ting, Iong, Iu, King, Ho, Xi
		meridianPointProperties: [
		[11, 1, 7, 7, 9, 9, 5, 11, 10, 9, 8, 5, 6],
		[20, 4, 20, 6, 4, 11, 2, 1, 2, 3, 5, 11, 7],
		[45, 1, 42, 40, 42, 41, 45, 45, 44, 43, 41, 36, 34],
		[21, 1, 21, 4, 3, 2, 5, 1, 2, 3, 5, 9, 8],
		[9, 1, 9, 5, 7, 9, 7, 9, 8, 7, 4, 3, 6],
		[19, 1, 18, 7, 4, 3, 8, 1, 2, 3, 5, 8, 6],
		[67, 1, 67, 58, 64, 67, 65, 67, 66, 65, 60, 40, 63],
		[27, 1, 22, 4, 3, 7, 1, 1, 2, 3, 7, 10, 5],
		[9, 1, 8, 6, 7, 9, 7, 9, 8, 7, 5, 3, 4],
		[23, 1, 23, 5, 4, 3, 10, 1, 2, 3, 6, 10, 7],
		[44, 1, 41, 37, 40, 43, 38, 44, 43, 41, 38, 34, 36],
		[14, 1, 14, 5, 3, 8, 2, 1, 2, 3, 4, 8, 6],
		[null, null, 1, null, null, null, null, null, null, null, null, null, null],
		[null, null, 15, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null, null, null, null, null, '59V'],
		[null, null, null, null, null, null, null, null, null, null, null, null, '8Rn'],
		[null, null, null, null, null, null, null, null, null, null, null, null, '35VB'],
		[null, null, null, null, null, null, null, null, null, null, null, null, '9Rn'],
		],

		meridian_vertebra: ["T3", "L4", "T12", "T11", "T5", "S1", "S2", "L2", "T4", "L1", "T10", "T9"],

		meridian_quality: [
		"Instinct de conservation",
		"Programmation cellulaire",
		"Compréhension",
		"Mémoire, concentration, réflexion",
		"Coordinateur des entités viscérales",
		"Synthèse des informations reçues",
		"Esprit de décision",
		"Volonté, faculté de réalisation",
		"Circulation",
		"Absorption, transformation, élimination",
		"Elimination du passé",
		"Imagination",
		],

		pointTypeList: [
		"Entrée", "Sortie",
		"Lo", "Yuan",
		"Mu", "Zi",
		"Ting", "Iong", "Iu", "King", "Ho",
		"Xi",
		],


		// ----------------------------------------------------------------
		// FUNCTIONS

		getMeridiansSelect : function (index) {
			var select = '<select id="meridian-select">'
			// for (i = 0 ; i < this.meridianLabels.length ; i++) {
			for (i = 0 ; i < 12 ; i++) {
				var meridian = this.meridianLabels[i]
				select += '<option value="' + meridian['enAbbrev'] +'">' + meridian['frAbbrev'] + '</option>'
			}
			select += '</select>'
			return select
		},

		getPointTypesSelect : function (index) {
			var select = '<select id="point-type-select">'
			// for (i = 0 ; i < this.pointTypeList.length ; i++) {
			for (i = 0 ; i < 11 ; i++) {
				var pointType = this.pointTypeList[i]
				select += '<option value="' + pointType +'">' + pointType + '</option>'
			}
			select += '</select>'
			return select
		},

		getNumberOfMeridians : function (index) {
			return Object.keys(this.meridianLabels).length
		},

		getMeridianByIndex: function (index) {
			var meridian = {}

			meridian.index = index

			meridian.point = {}
			var rawMeridianProps = this.meridianPointProperties[index]
			// for (i = 0 ; i < rawMeridianProps.length ; i++) {
			for (i = 0 ; i < 12 ; i++) {
				var prop = rawMeridianProps[i]
				if (i === 0) {
					meridian.nbPoints = prop
				} else {
					var pointType = this.pointTypeList[i-1]
					if (prop !== null)
						meridian.point[pointType] = prop
				}
			}

			meridian.label = {}
			meridian.label.enAbbrev = this.meridianLabels[index].enAbbrev
			meridian.label.frAbbrev = this.meridianLabels[index].frAbbrev

			meridian.vertebra = this.meridian_vertebra[index]

			meridian.quality = this.meridian_quality[index]

			return meridian
		}

	}
});
