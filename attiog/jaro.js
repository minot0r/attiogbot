const jaro = function(word, list) {
	let stats = {
		score: 0,
		value: ''
	}

	for(item of list) {
		let dist = Math.floor(Math.max(word.length, item.length) / 2) - 1
		let matches = 0

		for(let i = 0; i < word.length; i++) {
			let start = Math.max(0, i - dist)
			let end = Math.min(i + dist, item.length - 1)

			for(let j = start; j <= end; j++)
				if(word.charAt(j) == item.charAt(j)) matches++
		}

		let score = 1 / 3 * ((matches / word.length) + (matches / item.length) + 1) // Presque l'algorithme de Jaro, il faut rajouter les transpositions

		if(stats.score < score)
			stats = {
				score: score,
				value: item
			}
	}
	return stats.value
}

module.exports = jaro