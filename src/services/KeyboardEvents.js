export const keyboard_events = {
	created() {
		window.addEventListener('keyup', event => {
			const {key} = event
			switch (true) {
				case key === 'Backspace':
					this.react_to_keyboard_event('c')
					break
				case Number.isInteger(Number(key)): //if we typed a number
					this.react_to_keyboard_event(key)
					break
				case key === 'Delete':
					this.react_to_keyboard_event('c_all')
					break
				case key === 'Enter':
					this.react_to_keyboard_event('=')
					break
				case key === '?':
					this.react_to_keyboard_event('+/-')
					break
				default:
					this.react_to_keyboard_event(key)
			}
		})
	},
	methods: {
		react_to_keyboard_event(action) {
			const button = this.buttons.find(button => button.action === action)
			button && this.$emit('add-to-screen', button)
		}
	}
};