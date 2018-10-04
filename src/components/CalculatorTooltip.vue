<template>
	<div class="tooltip" v-if="show">
		Note! Here is displayed how you perform the calculations. Something like history. Don't confuse yourself thinking that
		this is evaluated as whole operation.
	</div>
</template>

<script>
	export default {
		name: 'CalculatorTooltip',
		props: {
			show: Boolean
		}
	}
</script>

<style lang="scss" scoped>
	.tooltip {
		position: absolute;
		top: -65px;
		background: aqua;
		left: -55%;
		padding: 15px;
		border-radius: 15px 15px 0;
	}
</style>