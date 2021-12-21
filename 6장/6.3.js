// before
return (
	order.quantity * order.itemPrice -
	Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
	Math.min(order.quantity * order.itemPrice * 0.1, 100)
)

// after
const basePrice = order.quantity * order.itemPrice
const quantityDiscount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
const shipping = Math.min(order.quantity * order.itemPrice * 0.1, 100)

return basePrice - quantityDiscount + shipping

/** 위의 코드에서도 변경하려는 부분이 나타내려고 하는 정보를 정확하게 이해하고, 이를 발라내서 변수화시키는 것이 중요하다. */

class Orderbefore {
	constructor(aRecord) {
		this._data = aRecord
	}

	get quantity() {
		return this._data.quantity
	}
	get itemPrice() {
		return this._data.itemPrice
	}

	get price() {
		return (
			order.quantity * order.itemPrice -
			Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
			Math.min(order.quantity * order.itemPrice * 0.1, 100)
		)
	}
}

class OrderAfter {
	constructor(aRecord) {
		this._data = aRecord
	}

	get quantity() {
		return this._data.quantity
	}
	get itemPrice() {
		return this._data.itemPrice
	}

	get price() {
		return this.basePrice - this.quantityDiscount + this.shipping
	}

	get basePrice() {
		return order.quantity * order.itemPrice
	}
	get quantityDiscount() {
		return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05
	}
	get shipping() {
		return Math.min(order.quantity * order.itemPrice * 0.1, 100)
	}
}
