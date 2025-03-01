module.exports = function (self) {
	self.setActionDefinitions({
		setTally: {
			name: 'Set Tally',
			options: [
				{
					id: 'color',
					type: 'dropdown',
					label: 'Color',
					default: 0,
					choices: [
						{ id: 0, label: "Off" },
						{ id: 1, label: "Red" },
						{ id: 2, label: "Green" },
					]
				},
			],
			callback: async (event) => {
				await self.setInfo('system', 'tally_led', { opt: 'set_tally_led_info', data: {mode_id: 1, color_id: event.options.color}})
			},
		},
		move: {
			name: 'Move camera',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 8,
					choices: [
						{ id:  8, label: 'Up' },
						{ id: 32, label: 'Up Right' },
						{ id:  4, label: 'Right' },
						{ id: 34, label: 'Down Right' },
						{ id: 10, label: 'Down' },
						{ id: 33, label: 'Down Left' },
						{ id:  2, label: 'Left' },
						{ id: 31, label: 'Up Left' },
						{ id:  0, label: 'Stop' },
					]
				},
			],
			callback: async (event) => {
				if (event.options.direction == 0) {
					await self.setInfo('ptz', 'ptz', {opt: 'control', opid: 6 })
					await self.setInfo('ptz', 'ptz', {opt: 'control', opid: 12 })
					await self.setInfo('ptz', 'ptz', {opt: 'control', opid: 35 })
				} else {
					await self.setInfo('ptz', 'ptz', {opt: 'control', opid: event.options.direction })
				}
			}
		},
		step: {
			name: 'Move camera (single step)',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Direction',
					default: 8,
					choices: [
						{ id:  7, label: 'Up' },
						{ id:  3, label: 'Right' },
						{ id:  9, label: 'Down' },
						{ id:  1, label: 'Left' },
					]
				},
			],
			callback: async (event) => {
				await self.setInfo('ptz', 'ptz', {opt: 'control', opid: event.options.direction })
			}
		},
		zoom: {
			name: 'Zoom',
			options: [
				{
					id: 'direction',
					type: 'dropdown',
					label: 'Zoom direction',
					default: 18,
					choices: [
						{ id: 14, label: 'Zoom in' },
						{ id: 16, label: 'Zoom out' },
						{ id: 18, label: 'Stop zoom' },
					]
				}
			],
			callback: async (event) => {
				await self.setInfo('ptz', 'ptz', {opt: 'control', opid: event.options.direction })
			}
		},
		usePreset: {
			name: 'Move to preset',
			options: [
				{
					id: 'preset',
					type: 'dropdown',
					label: 'Preset',
					choices: self.CHOICES_PRESETS
				},
			],
			callback: async (event) => {
				await self.setInfo('ptz', 'ptz', {opt: 'control', opid: 29, data: {id: event.options.preset}})
			}
		},
		home: {
			name: 'Move to home',
			options: [],
			callback: async (event) => {
				await self.setInfo('ptz', 'ptz', {opt: 'control', opid: 38, data: {id: 0}})
			},
		},
	})
}
