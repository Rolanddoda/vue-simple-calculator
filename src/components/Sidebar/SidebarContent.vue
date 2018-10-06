<template>
	<div class="content">

		<article class="article" v-for="article of keyboard_articles" :key="article.id">
			<span v-html="generate_text(article)"></span>
			<span class="article-title"><i> <span v-html="article.keyboard_key"></span> </i></span>
		</article>

	</div>
</template>

<script>
	export default {
		name: 'SidebarContent',

		data: () => ({
			keyboard_articles: [
				{
					id: 1,
					keyboard_key: '<kbd>Delete</kbd>',
					calculator_key: '<q>Clear All</q>',
					transition_phrase: 'key to perform'
				},

				{
					id: 2,
					keyboard_key: '<kbd>Backspace</kbd>',
					calculator_key: '<q>Clear</q>',
					transition_phrase: 'key to perform'
				},

				{
					id: 3,
					keyboard_key: '<kbd>shift</kbd> + <kbd>6</kbd>',
					calculator_key: '<q>x<sup>x</sup></q>',
					transition_phrase: 'keys to perform'
				},

				{
					id: 4,
					keyboard_key: '<kbd>/</kbd>',
					calculator_key: '<q>/</q>',
					transition_phrase: 'key to perform'
				},

				{
					id: 5,
					keyboard_key: '<kbd>shift</kbd> + <kbd>8</kbd>',
					calculator_key: '<q>*</q>',
					transition_phrase: 'keys to perform'
				},

				{
					id: 6,
					keyboard_key: '<kbd>-</kbd>',
					calculator_key: '<q>-</q>',
					transition_phrase: 'key to perform'
				},

				{
					id: 7,
					keyboard_key: '<kbd>shift</kbd> + <kbd>=</kbd>',
					calculator_key: '<q>+</q>',
					transition_phrase: 'keys to perform'
				},

				{
					id: 8,
					keyboard_key: '<kbd>Enter</kbd> or <kbd>=</kbd>',
					calculator_key: '<q>=</q>',
					transition_phrase: 'key to perform'
				},

				{
					id: 9,
					keyboard_key: '<kbd>.</kbd>',
					calculator_key: '<q>.</q>',
					transition_phrase: 'key to perform'
				},

				{
					id: 10,
					keyboard_key: '<kbd>shift</kbd> + <kbd>/</kbd>',
					calculator_key: '<q>+/-</q>',
					transition_phrase: 'keys to perform'
				},

			]
		}),

		methods: {
			generate_text(article) {
				return `Press ${article.keyboard_key} ${article.transition_phrase} ${article.calculator_key} action`
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import url(https://fonts.googleapis.com/css?family=Bitter);

	.content {
		grid-area: content;
		background: antiquewhite;
		padding: 10px;
		overflow: auto;

		.article + .article {
			margin-top: 15px;
		}

		.article {
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

			span.article-title {
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

</style>