function statement(data, plays) {
	const statementData = {}
	statementData.customer = data.customer
	statementData.performances = invoice.performances.map(enrichPerformance)
	return renderPlainText(statementData, plays)

	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance)
		result.play = playFor(result)
		result.amount = amountFor(result)
		return result
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playId]
	}

	function amountFor(aPerformance) {
		let result = 0

		switch (aPerformance.play.type) {
			case 'tragedy':
				result = 40000
				if (aPerformance.audience > 30) {
					result += 1000 * (aPerformance.audience - 30)
				}
				break
			case 'comedy':
				result = 30000
				if (aPerformance.audience > 20) {
					result += 10000 + 500 * (aPerformance.audience - 20)
				}
				result += 300 * aPerformance.audience
				break
			default:
				throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`)
		}

		return result
	}
}

function renderPlainText(data, plays) {
	let result = `청구 내역 (고객명: ${invoice.customer})\n`

	for (let perf of data.performances) {
		result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)`
	}

	result += `총액: ${usd(totalAmount())}\n`
	result += `적립 포인트: ${totalVolumeCredits()}점\n`

	return result

	function totalAmount() {
		let result = 0
		for (let perf of data.performances) {
			result += perf.amount
		}
		return result
	}

	function totalVolumeCredits() {
		let result = 0
		for (let perf of data.performances) {
			result += volumeCreditsFor(perf)
		}
		return result
	}

	function usd(aNumber) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber / 100)
	}

	function volumeCreditsFor(perf) {
		let volumeCredits = 0

		volumeCredits += Math.max(perf.audience - 30, 0)
		if (perf.play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)

		return volumeCredits
	}
}
