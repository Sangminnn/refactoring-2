function printOwing(invoice) {
	printBanner()
	let outstanding = calculateOutstanding()
	printDetails(outstanding)

	function printDetails(outstanding) {
		console.log(`고객명: ${invoice.customer}`)
		console.log(`채무액: ${outstanding}`)
	}
}

function printOwing(invoice) {
	printBanner()
	const outstanding = calculateOutstanding(invoice)
	recordDueDate(invoice)
	printDetail(invoice, outstanding)
}

// 미해결 채무를 계산한다.
function calculateOutstanding(invoice) {
	let outstanding = 0
	for (const order of invoice.orders) {
		outstanding += order.amount
	}
	return outstanding
}

/**
 * 여기서 Clock Wrapper를 두는 이유는 new Date와 같은 시스템 함수를 호출한다면
 * 직접 호출할 때마다 결과가 달라져서 순수함수의 특성을 잃어버린다.
 */
function recordDueDate(invoice) {
	const today = Clock.today
	invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
}

function printDetail(invoice, outstanding) {
	console.log(`고객명: ${invoice.customer}`)
	console.log(`채무액: ${outstanding}`)
	console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`)
}

function printBanner() {
	console.log('****************')
	console.log('*****고객 채무*****')
	console.log('****************')
}
