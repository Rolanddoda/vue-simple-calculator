<template>
	<div :class="['calculator-informations', { hidden: show_sidebar }]">
		<div class="triangle" @click="show_sidebar = !show_sidebar" title="Keyboard Events Informations">🛆</div>
		<div class="header">Key Events Informations</div>

		<div class="content">

			<article>
				Press <kbd>Delete</kbd> key to perform <q>Clear All</q> action
				<span class="author"><i><kbd>Delete</kbd></i></span>
			</article>

			<article>
				Press <kbd>Backspace</kbd> key to perform <q>Clear</q> action
				<span class="author"><i><kbd>Backspace</kbd></i></span>
			</article>

			<article>
				Click <kbd>shift</kbd> + <kbd>6</kbd> keys to perform <q>x<sup>x</sup></q> action
				<span class="author"><i><kbd>shift</kbd> + <kbd>6</kbd></i></span>
			</article>

			<article>
				Click <kbd>/</kbd> key to perform <q>/</q> action
				<span class="author"><i><kbd>/</kbd></i></span>
			</article>

			<article>
				Click <kbd>shift</kbd> + <kbd>8</kbd> keys to perform <q>*</q> action
				<span class="author"><i><kbd>shift</kbd> + <kbd>8</kbd></i></span>
			</article>

			<article>
				Click <kbd>-</kbd> key to perform <q>-</q> action
				<span class="author"><i><kbd>-</kbd></i></span>
			</article>

			<article>
				Click <kbd>+</kbd> key to perform <q>+</q> action
				<span class="author"><i><kbd>+</kbd></i></span>
			</article>

			<article>
				Click <kbd>Enter</kbd> key to perform <q>=</q> action
				<span class="author"><i><kbd>Enter</kbd></i></span>
			</article>

			<article>
				Click <kbd>.</kbd> key to perform <q>.</q> action
				<span class="author"><i><kbd>.</kbd></i></span>
			</article>

			<article>
				Click <kbd>shift</kbd> + <kbd>/</kbd> key to perform <q>+/-</q> action
				<span class="author"><i><kbd>shift</kbd> + <kbd>/</kbd></i></span>
			</article>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'CalculatorInformations',

		data: () => ({
			show_sidebar: true
		})
	}
</script>

<style lang="scss" scoped>
	@import url(https://fonts.googleapis.com/css?family=Bitter);

	$deep-blue: #2E335D;
	$light-red: #F05A59;

	.calculator-informations {
		position: absolute;
		width: 300px;
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
			}
		}

		kbd {
			padding:0.1em 0.6em;
			border:1px solid #ccc;
			font-size:11px;
			font-family:Arial,Helvetica,sans-serif;
			background-color:#f7f7f7;
			color:#333;
			-moz-box-shadow:0 1px 0 rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
			-webkit-box-shadow:0 1px 0 rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
			box-shadow:0 1px 0 rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
			-moz-border-radius:3px;
			-webkit-border-radius:3px;
			border-radius:3px;
			display:inline-block;
			margin:0 0.1em;
			text-shadow:0 1px 0 #fff;
			line-height:1.4;
			white-space:nowrap;
		}

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

		.header {
			grid-area: header;
			display: flex;
			justify-content: center;
			align-items: center;
			background: $deep-blue;
			color: white;
		}

		.content {
			grid-area: content;
			background: antiquewhite;
			padding: 10px;
			overflow: auto;

			article + article {
				margin-top: 15px;
			}

			article {
				background: #eee;
				font-family: 'Bitter', serif;
				color: #333;
				text-align: left;
				padding: 10px;
				border-radius: 10px;

				box-shadow: 1px 1px 1px #999,
				2px 2px 1px #999,
				3px 3px 1px #999;
				transition-duration: .3s;

				&:hover {
					box-shadow: 1px 1px 5px #999,
					2px 2px 6px #999,
					3px 3px 7px #999;
				}

				span.author {
					position: relative;
					display: block;
					text-align: right;
					margin-top: 5px;
					color: #999;

					i {
						position: relative;
						background: #eee;
						padding-left: 5px;
						font-style: italic;
						z-index: 5;
					}

					&::before {
						display: block;
						content: "";
						position: absolute;
						top: 50%;
						left: 0;
						width: 100%;
						height: 1px;
						background: #ccc;
						z-index: 1;
					}
				}
			}

		}
	}
</style>