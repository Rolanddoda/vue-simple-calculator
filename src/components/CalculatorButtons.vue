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