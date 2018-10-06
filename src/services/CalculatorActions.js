export const calculator_actions = {
	methods: {
		manage_button_action(button) { this[button.method_name]() },
		divide() { this.make_number(); this.calculate_expression('÷') },
		multiply() { this.make_number(); this.calculate_expression('*') },
		subtract() { this.make_number(); this.calculate_expression('-') },
		add() { this.make_number(); this.calculate_expression('+') },
		power() { this.make_number(); this.calculate_expression('^') },//executed when '^' pressed
		run_expression() { this.make_number(); this.calculate_expression('', 'first_number') },//executed when '=' pressed
		toggle_number_sign() { this.make_number(); this[this.which_number] = -this[this.which_number] },

		clear_screen() {
			this.first_number = this.second_number = this.action = this.last_operation = ''
			this.which_number = 'first_number'
		},

		make_number() {
			if (this[this.which_number] !== '')
				this[this.which_number] = Number(this[this.which_number])
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