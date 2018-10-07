<template>
	<div class="calculator">

		<screen-wrapper
				:screen-text="screen_text"
        :error-message="error_message"
        :last-operation="last_operation"
        :show-tooltip.sync="show_tooltip"
		/>
		<calculator-tooltip :show="show_tooltip" />
    <calculator-buttons @add-to-screen="add_to_screen" />

	</div>
</template>

<script>
	import CalculatorButtons from '@/components/CalculatorButtons.vue'
	import CalculatorTooltip from '@/components/CalculatorTooltip.vue'
	import ScreenWrapper from '@/components/ScreenWrapper.vue'
	import { calculator_actions } from "@/services/CalculatorActions"

	export default {
    name: 'Calculator',
		mixins: [calculator_actions],
		components: { CalculatorButtons, CalculatorTooltip, ScreenWrapper },

    data: () => ({
	    first_number: '',
	    second_number: '',
	    action: '',
	    which_number: 'first_number',
	    last_operation: '',
	    last_operation_result: 0,
	    show_tooltip: false,
	    error_message: '',
    }),

		computed: {
    	screen_text() {
    		const text = this.first_number + this.action + this.second_number
		    if (text.toString().length > 11)
		    	this.error_message = 'There are more than 11 chars, but 11 displayed'
		    else
		    	this.error_message = ''

		    return text.toString().slice(0, 11) || 0
	    }
		},

		watch: {

			first_number(new_val) {
				if (new_val && !new_val.toString().includes('.')) {
					this.first_number = Number.isInteger(Number(new_val)) ? Number(new_val) : 0
				}
			},

			second_number(new_val) {
				if (new_val && !new_val.toString().includes('.')) {
					this.second_number = Number.isInteger(Number(new_val)) ? Number(new_val) : 0
				}
			},

			screen_text(new_val) {
				new_val.toString().length > 11
					? this.error_message = 'There are more than 11 chars, but 11 displayed'
					: ''
			}

		},

		methods: {

			add_to_screen(button) {
				if (button.is_number) {
					this.add_to_number(Number(button.action).toString())
				}else {
					this.manage_button_action(button)
				}
			},

			add_to_number(number, reverse_number_sign = false) {
				if (reverse_number_sign)
					this[this.which_number] = -Number(this[this.which_number])
				else {
					this[this.which_number] += number
				}
			},

			calculate_expression(expression, which_number = 'second_number') {
				if ((this.first_number === '' && this.second_number === '') || this.error_message)
					return
				if (this.first_number !== '' && this.second_number !== ''){
					this.last_operation += `(${this.screen_text})`
					this.first_number = this.get_and_display_result()
					this.second_number = ''
				}
				this.which_number = which_number
				this.action = expression
			},

			make_float() { //executed when '.' pressed
				if(this[this.which_number].toString().includes('.') || this.error_message) {
					this.error_message = 'Cannot add double dot'
					return
				} else
					this.error_message = ''

				if(this[this.which_number] === '')
					this[this.which_number] = '0.'
				else
					this[this.which_number] += '.'
			},

			get_and_display_result() {
				if (this.screen_text.toString().includes('^'))
					return Math.pow(this.first_number, this.second_number)

				const calculation = this.screen_text.replace(/÷/g, '/')
				let expression_in_array_format = calculation.split('')

				/* Serves for adding necessary spaces to expression (due to eval issues) */
				expression_in_array_format.forEach((item, index) => {
					if (!Number.isInteger(Number(item)) && item !== '.') { //if item it is not integer nor equal to .
						expression_in_array_format[index] += ' '
					}
				})

				const expression = expression_in_array_format.join('')
				return Number(parseFloat(eval(expression)).toPrecision(11))
			}

		}

	}
</script>

<style lang="scss" scoped>
	@import "../animations";

  $deep-blue: #2E335D;
  $light-red: #F05A59;
  $deep-red: #E33D3D;

  .calculator {
    position: relative;
    width: 320px;
    height: 80%;
		  box-shadow: -75px 60px 40px -30px rgba(135, 91, 135, .2);
	  border-radius: 15px;
	  transform: rotate3d(1, 1, -1, 25deg);
	  transition: transform .5s ease-in-out;
	  animation: animateBoxShadowOut .5s ease-in-out forwards;
	  z-index: 1;

	  &:hover {
		  transform: rotate3d(0, 0, 0, 0);
		  animation: animateBoxShadowIn .5s ease-in-out forwards;
	  }
  }

</style>