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

    <div class="buttons-wrapper">
	    <template v-for="button in buttons">
		    <div :class="['button', button.class]" @click="add_to_screen(button)">
			    <span v-html="button.text"></span>
		    </div>
	    </template>
    </div>

	</div>
</template>

<script>
	export default {
    name: 'Calculator',

    data: () => ({
	    first_number: '',
	    second_number: '',
	    action: '',
	    which_number: 'first_number',
	    last_operation: '',
	    last_operation_result: 0,
	    show_tooltip: false,
	    error_message: '',
      buttons: [
        { text: 'Clear All', class: 'clear-all-button', action: 'c_all', is_number: false },
        { text: 'Clear', class: 'clear-button', action: 'c', is_number: false },
        { text: 'x <sup>x</sup>', class: 'exp-button', action: '^', is_number: false },
        { text: '/', class: 'divide-button', action: '/', is_number: false },
        { text: '7', class: 'seven-button', action: '7', is_number: true },
        { text: '8', class: 'eight-button', action: '8', is_number: true },
        { text: '9', class: 'nine-button', action: '9', is_number: true },
        { text: '*', class: 'multiply-button', action: '*', is_number: false },
        { text: '4', class: 'four-button', action: '4', is_number: true },
        { text: '5', class: 'five-button', action: '5', is_number: true },
        { text: '6', class: 'six-button', action: '6', is_number: true },
        { text: '-', class: 'minus-button', action: '-', is_number: false },
        { text: '1', class: 'one-button', action: '1', is_number: true },
        { text: '2', class: 'two-button', action: '2', is_number: true },
        { text: '3', class: 'three-button', action: '3', is_number: true },
        { text: '+', class: 'plus-button', action: '+', is_number: false },
        { text: '0', class: 'zero-button', action: '0', is_number: true },
        { text: '.', class: 'point-button', action: '.', is_number: false },
        { text: '+/-', class: 'neg-pos-button', action: '+/-', is_number: false },
        { text: '=', class: 'equal-button', action: '=', is_number: false },
      ]
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
				const expression = calculation.split('').join(' ')
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

    .buttons-wrapper {
      background: $light-red;
      height: 70%;
      width: 100%;
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      align-items: center;
      justify-items: center;
      color: white;
	    border-radius: 0 0 15px 15px;
	    overflow: hidden;
	    
	    .button {
		    cursor: pointer;
		    width: 100%;
		    height: 100%;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    border: 1px solid #F26462;
	    }

	    /*.zero-button {*/
		    /*grid-column: span 2;*/
	    /*}*/

	    .equal-button {
		    background: $deep-red;
	    }

    }

  }
</style>