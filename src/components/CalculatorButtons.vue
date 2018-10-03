<template>
		<div class="buttons-wrapper">
			<template v-for="button in buttons">
				<div :class="['button', button.class]" @click="add_to_screen(button)">
					<span v-html="button.text"></span>
				</div>
			</template>
		</div>
</template>

<script>
	export default {
		name: 'CalculatorButtons',

		data: () => ({
			buttons: [
				{ text: 'Clear All', class: 'clear-all-button', action: 'c_all', method_name: 'clear_screen', is_number: false },
				{ text: 'Clear', class: 'clear-button', action: 'c', method_name: 'remove_single_char', is_number: false },
				{ text: 'x <sup>x</sup>', class: 'exp-button', action: '^', method_name: 'power', is_number: false },
				{ text: '/', class: 'divide-button', action: '/', method_name: 'divide', is_number: false },
				{ text: '7', class: 'seven-button', action: '7', method_name: null, is_number: true },
				{ text: '8', class: 'eight-button', action: '8', method_name: null, is_number: true },
				{ text: '9', class: 'nine-button', action: '9', method_name: null, is_number: true },
				{ text: '*', class: 'multiply-button', action: '*', method_name: 'multiply', is_number: false },
				{ text: '4', class: 'four-button', action: '4', method_name: null, is_number: true },
				{ text: '5', class: 'five-button', action: '5', method_name: null, is_number: true },
				{ text: '6', class: 'six-button', action: '6', method_name: null, is_number: true },
				{ text: '-', class: 'minus-button', action: '-', method_name: 'subtract', is_number: false },
				{ text: '1', class: 'one-button', action: '1', method_name: null, is_number: true },
				{ text: '2', class: 'two-button', action: '2', method_name: null, is_number: true },
				{ text: '3', class: 'three-button', action: '3', method_name: null, is_number: true },
				{ text: '+', class: 'plus-button', action: '+', method_name: 'add', is_number: false },
				{ text: '0', class: 'zero-button', action: '0', method_name: null, is_number: true },
				{ text: '.', class: 'point-button', action: '.', method_name: 'make_float', is_number: false },
				{ text: '+/-', class: 'neg-pos-button', action: '+/-', method_name: 'toggle_number_sign', is_number: false },
				{ text: '=', class: 'equal-button', action: '=', method_name: 'run_expression', is_number: false },
			]
		}),

		methods: {
			add_to_screen(button) { this.$emit('add-to-screen', button) }
		}

	}
</script>

<style lang="scss" scoped>
	$light-red: #F05A59;
	$deep-red: #E33D3D;

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

	.equal-button {
		background: $deep-red;
	}

	}
</style>