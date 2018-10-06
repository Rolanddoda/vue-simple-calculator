<template>
	<div class="triangle"
	     @click="toggle_sidebar"
	     title="Keyboard Events Informations">
		🛆
	</div>
</template>

<script>
	export default {
		name: 'SidebarTriangle',

		props: {
			showSidebar: Boolean
		},

		methods: {
			toggle_sidebar() {
				this.$emit('update:showSidebar', !this.showSidebar)
			}
		}

	}
</script>

<style lang="scss" scoped>
	$deep-blue: #2E335D;
	$light-red: #F05A59;

	.triangle {
		grid-area: triangle;
		font-size: 18px;
		width: 100%;
		height: 100%;
		transform: rotateZ(-90deg);
		cursor: pointer;
		background: $deep-blue;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid white; //border-bottom because it is rotated
		border-radius: 0 0 10px 10px;

		&:hover {
			color: $light-red;
		}
	}
</style>