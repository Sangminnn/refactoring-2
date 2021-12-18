/** 자바스크립트에서 알맞는 서브클래스를 사용하게 해주려면 팩토리 함수를 사용해야한다. */
function createPerformanceCalculator(aPerformance, aPlay) {
	switch (aPlay.type) {
		case 'tragedy':
			return new TragedyCalculator(aPerformance, aPlay)
		case 'comedy':
			return new ComedyCalculator(aPerformance, aPlay)
		default:
			throw new Error(`알수 없는 장르: ${aPlay.type}`)
	}
}

class TragedyCalculator extends PerformanceCalculator {
	get amount() {
		let result = 40000
		if (this.performance.audience > 30) {
			result += 1000 * (this.performance.audience - 30)
		}
		return result
	}
}
class ComedyCalculator extends PerformanceCalculator {
	get amount() {
		let result = 30000
		if (this.performance.audience > 20) {
			result += 10000 + 500 * (this.performance.audience - 20)
		}
		result += 300 * this.performance.audience
		return result
	}

	get volumeCredits() {
		return super.volumeCredits + Math.floor(this.performance.audience / 5)
	}
}

/** 공연료 계산기 클래스 */
class PerformanceCalculator {
	constructor(aPerformance, aPlay) {
		this.performance = aPerformance
		this.play = aPlay
	}

	get amount() {
		throw new Error('서브클래스에서 처리하도록 설계되었습니다.')
	}

	get volumeCredits() {
		return Math.max(this.performance.audience - 30, 0)
	}
}

export default function createStatementData(invoice, plays) {
	const result = {}
	result.customer = data.customer
	result.performances = invoice.performances.map(enrichPerformance)
	result.totalAmount = totalAmount(result)
	result.totalVolumeCredits = totalVolumeCredits(result)
	return result

	function enrichPerformance(aPerformance) {
		const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))
		const result = Object.assign({}, aPerformance)
		result.play = calculator.play
		result.amount = calculator.amount
		result.volumeCredits = calculator.volumeCredits
		return result
	}

	function amountFor(aPerformance) {
		return new PerformanceCalculator(aPerformance, playFor(aPerformance).amount)
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playId]
	}

	function volumeCreditsFor(aPerformance) {}

	function totalAmount(data) {
		return data.performances.reduce((total, p) => total + p.amount, 0)
	}

	function totalVolumeCredits(data) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
	}
}
