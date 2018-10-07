<template>
	<div class="wrapper">
		<div :class="['who-am-i', { 'move-icon': begin_to_move_icon }]"
		     @click="begin_to_move_icon = !begin_to_move_icon"
		>
			<div class="circle-icon" title="Click to discover something about me">
				👨‍💻
			</div>
		</div>

		<div :class="['hidden', {'change-content': begin_to_move_icon}]">
			<i class="icon" @click="begin_to_move_icon = false">✖</i>
			<span>
				👨‍💻 Roland Doda. <br>
				🕵️‍ Professional Front End Developer. <br>
				💝 Passionate with Javascript and Loved with Vue.js
			</span>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'WhoAmI',

		data: ()=>({
			begin_to_move_icon: false
		})
	}
</script>

<style lang="scss" scoped>
	@import "../animations";
	@import url(https://fonts.googleapis.com/css?family=Bitter);
	@font-face {
		font-family: 'letter text';
		src: url('../fonts/LetterText.ttf');
	}

	$light-red: #F05A59;

	.wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		font-family: 'Bitter', serif;

		.who-am-i {
			position: absolute;
			border-radius: 20px;
			background: cyan;
			width: auto;
			z-index: 3;
			right: 10px;
			top: 10px;
			padding: 10px;
			opacity: 0;
			animation: toggleBoxShadow 3s linear infinite 2.5s forwards,
				         moveCircleIconToBottom .5s ease-in-out 2s forwards,
					       fadeInScale .5s ease-in 1.2s forwards;


			&.move-icon {
				animation: moveCircleIconToTop .5s ease-in-out forwards;
			}
		}

		.hidden {
			position: absolute;
			right: 10px;
			top: 10px;
			font-family: 'letter text', sans-serif;
			font-size: 30px;
			background: white;
			border-radius: 90px 0 50px 0;
			border: 2px solid $light-red;
			width: 0;
			height: 0;
			padding: 0;
			visibility: hidden;
			transition: width 1s, height 1s, padding 1s, visibility 1s;
			transition-delay: .3s;
			text-align: center;
			overflow: hidden;
			z-index: 2;

			.icon {
				position: absolute;
				right: 10px;
				top: 0;
				font-size: 0.8em;
				cursor: pointer;

				&:hover {
					color: blue;
				}
			}

			&.change-content {
				width: 400px;
				height: 150px;
				padding: 10px;
				visibility: visible;
				z-index: 3;
			}

		}
	}
</style>
