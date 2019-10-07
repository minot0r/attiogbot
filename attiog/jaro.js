const jaro = function(word, list) {
	let stats = {
		score: 0,
		value: ''
	}

	for(item of list) {
		let m = Math.floor(Math.max(word.length, item.length) / 2) - 1
		let s = 1 / 3 * ((m / word.length) + (m / item.length) + 1) // Presque l'algorithme de Jaro, il faut rajouter les transpositions

		if(s > word.score)
			stats = {
				score: s,
				value: item
			}
	}

	console.log(stats.value)
	return stats.value
}

module.exports = jaro