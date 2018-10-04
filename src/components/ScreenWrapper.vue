<template>
	<div class="screen-wrapper">

		<span class="display-value"> {{ screenText }} </span>

		<div class="error-message" v-if="errorMessage"> ❗️ {{ errorMessage }} ❗️ </div>

		<div v-if="lastOperation"
		     class="last-operation"
		     @mouseover="toggle_tooltip(true)"
		     @mouseleave="toggle_tooltip(false)"
		>
			{{ lastOperation }}
		</div>

	</div>
</template>

<script>
	export default {
		name: 'ScreenWrapper',

		props: {
			screenText: [String, Number],
			errorMessage: String,
			showTooltip: Boolean,
			lastOperation: String
		},

		methods: {
			toggle_tooltip(toogle) {
				this.$emit('update:showTooltip', toogle)
			}
		}

	}
</script>

<style lang="scss" scoped>
	$deep-blue: #2E335D;

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
</style>