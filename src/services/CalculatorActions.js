export const calculator_actions = {
	methods: {
		divide() { this.calculate_expression('÷') },
		multiply() { this.calculate_expression('*') },
		subtract() { this.calculate_expression('-') },
		add() { this.calculate_expression('+') },
		power() { this.calculate_expression('^') },//executed when '^' pressed
		run_expression() { this.calculate_expression('', 'first_number') },//executed when '=' pressed
		toggle_number_sign() { this[this.which_number] = -this[this.which_number] },

		clear_screen() {
			this.first_number = this.second_number = this.action = this.last_operation = ''
			this.which_number = 'first_number'
		},

		remove_single_char() {
			if (this.which_number === 'second_number' && this.second_number === '') {
				this.action = ''
				this.which_number = 'first_number'
			}else { // remove the last char from the string
				this[this.which_number] = this[this.which_number].toString().slice(0, -1)
			}
		},

	}
}