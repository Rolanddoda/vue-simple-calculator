<template>
	<div :class="['calculator-informations', { hidden: !is_sidebar_open }]">

		<sidebar-triangle :show-sidebar.sync="is_sidebar_open" />
		<div class="header" v-if="is_sidebar_open">Key Events Informations</div>
		<sidebar-content v-if="is_sidebar_open" />

	</div>
</template>

<script>
	import SidebarContent from './SidebarContent.vue'
	import SidebarTriangle from './SidebarTriangle.vue'

	export default {
		name: 'Sidebar',
		components: { SidebarContent, SidebarTriangle },

		data: () => ({
			is_sidebar_open: false
		})
	}
</script>

<style lang="scss" scoped>
	$deep-blue: #2E335D;

	.calculator-informations {
		position: absolute;
		max-width: 300px;
		height: 100%;
		display: grid;
		grid-template-rows: 50px 1fr;
		grid-template-columns: 250px 50px;
		grid-template-areas:
				'header triangle'
				'content .';

		&.hidden {
			grid-template-rows: 50px 1fr;
			grid-template-columns: 50px;
			grid-template-areas: 'triangle' '.';

			.header,
			.content{
				display: none;
			}

			.triangle {
				transform: rotateZ(90deg);
				border-radius: 10px 10px 0 0;
				border: 0;
			}
		}

		.header {
			grid-area: header;
			display: flex;
			justify-content: center;
			align-items: center;
			background: $deep-blue;
			color: white;
		}

	}
</style>