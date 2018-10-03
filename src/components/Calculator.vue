<template>
	<div class="calculator">

    <div class="screen-wrapper">
      <span class="display-value"> {{ screen_text }} </span>
	    <div class="error-message" v-if="error_message"> ❗️ {{ error_message }} ❗️ </div>
	    <div class="last-operation" @mouseover="show_tooltip = true" @mouseleave="show_tooltip = false" v-if="last_operation"> {{ last_operation }} </div>
    </div>

		<div class="tooltip" v-if="show_tooltip">
			Note! Here is displayed how you perform the calculations. Something like history. Don't confuse yourself thinking that
			this is evaluated as whole operation.
		</div>

    <calculator-buttons @add-to-screen="add_to_screen" />

	</div>
</template>

<script>
	import CalculatorButtons from '@/components/CalculatorButtons.vue'
	export default {
    name: 'Calculator',
		components: { CalculatorButtons },

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

			manage_button_action(button) {
				if (this[this.which_number] !== '')
					this[this.which_number] = Number(this[this.which_number])

				switch (button.action) {
					case 'c_all':
						this.first_number = this.second_number = this.action = this.last_operation = ''
						this.which_number = 'first_number'
						break
					case 'c':
						if (this.which_number === 'second_number' && this.second_number === '') {
							this.action = ''
							this.which_number = 'first_number'
						}else {
							this[this.which_number] = this[this.which_number].toString().slice(0, -1)
						}
						break
					case '+/-':
						this[this.which_number] = -this[this.which_number]
						break
					case '/':
						if ((this.first_number === '' && this.second_number === '') || this.error_message)
							return
						if (this.first_number !== '' && this.second_number !== ''){
							this.last_operation += `(${this.screen_text})`
							this.first_number = this.get_and_display_result()
							this.second_number = ''
						}
						this.which_number = 'second_number'
						this.action = '÷'
						break
					case '*':
						if ((this.first_number === '' && this.second_number === '') || this.error_message)
							return
						if (this.first_number !== '' && this.second_number !== ''){
							this.last_operation += `(${this.screen_text})`
							this.first_number = this.get_and_display_result()
							this.second_number = ''
						}
						this.which_number = 'second_number'
						this.action = '*'
						break
					case '=':
						if ((this.first_number === '' && this.second_number === '') || this.error_message)
							return
						if (this.first_number !== '' && this.second_number !== ''){
							this.last_operation += `(${this.screen_text})`
							this.first_number = this.get_and_display_result()
							this.second_number = ''
						}
						this.which_number = 'first_number'
						this.action = ''
						break
					case '-':
						if ((this.first_number === '' && this.second_number === '') || this.error_message)
							return
						if (this.first_number !== '' && this.second_number !== ''){
							this.last_operation += `(${this.screen_text})`
							this.first_number = this.get_and_display_result()
							this.second_number = ''
						}
						this.which_number = 'second_number'
						this.action = '-'
						break
					case '+':
						if ((this.first_number === '' && this.second_number === '') || this.error_message)
							return
						if (this.first_number !== '' && this.second_number !== ''){
							this.last_operation += `(${this.screen_text})`
							this.first_number = this.get_and_display_result()
							this.second_number = ''
						}
						this.which_number = 'second_number'
						this.action = '+'
						break
					case  '.':
						if(this[this.which_number].toString().includes('.') || this.error_message) {
							this.error_message = 'Cannot add double dot'
							return
						} else
								this.error_message = ''

						if(this[this.which_number] === '')
							this[this.which_number] = '0.'
						else
							this[this.which_number] += '.'

						break
					case  '^':
						if (this[this.which_number] === '' || this.error_message)
							return
						if (this.first_number !== '' && this.second_number !== ''){
							this.last_operation += `(${this.screen_text})`
							this.first_number = this.get_and_display_result()
							this.second_number = ''
						}
						this.which_number = 'second_number'
						this.action = '^'
						break
				}
			},

			get_and_display_result() {
				if (this.screen_text.toString().includes('^'))
					return Math.pow(this.first_number, this.second_number)

				const calculation = this.screen_text.replace(/÷/g, '/')
				let expression_in_array_format = calculation.split('')

				/* Serves for adding necessary spaces to expression (due to eval issues) */
				expression_in_array_format.forEach((item, index) => {
					if (!Number.isInteger(Number(item))) { //if item it is not integer
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
  $deep-blue: #2E335D;
  $light-red: #F05A59;
  $deep-red: #E33D3D;

  .calculator {
    position: relative;
    width: 320px;
    height: 80%;

	  .tooltip {
		  position: absolute;
		  top: -65px;
		  background: aqua;
		  left: -55%;
		  padding: 15px;
		  border-radius: 15px 15px 0;
	  }

    .screen-wrapper {
	    position: relative;
      background: $deep-blue;
      height: 30%;
      width: 100%;
      border-radius: 15px 15px 0 0;
      display: grid;
      justify-content: end;
      align-items: end;
      color: white;
      font-size: 50px;

	    .error-message {
		    position: absolute;
		    width: 100%;
		    top: 0;
		    text-align: right;
		    font-size: 12px;
		    padding: 10px;
		    color: red;
	    }

	    .last-operation {
		    position: absolute;
		    width: 100%;
		    top: 35px;
		    text-align: right;
		    font-size: 30px;
		    max-height: 70px;
		    overflow: auto;
	    }

      > .display-value {
	      position: absolute;
	      width: 99%;
	      text-align: right;
        padding: 10px;
	      overflow: hidden;
      }
    }

  }
</style>