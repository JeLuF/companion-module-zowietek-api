const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const zowietekMethods = require('./zowietek')

class ZowietekModuleInstance extends InstanceBase {

	CHOICES_PRESETS = [{ id: -1, label: 'No presets found'}]
	CHOICES_STORAGES = [{ id: -1, label: 'No storage found'}]

	connstatus = false

	constructor(internal) {
		super(internal)
	}

	async init(config) {
		Object.assign(ZowietekModuleInstance.prototype, zowietekMethods)
		this.configUpdated(config)
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

		await this.getDeviceStatus()
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 12,
				regex: Regex.IP,
			},
/*			{
				type: 'textinput',
				id: 'user',
				label: 'Username',
				width: 6,
				default: 'admin',
			},
			{
				type: 'textinput',
				id: 'password',
				label: 'Password',
				width: 6,
				default: 'admin',
			}, */
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ZowietekModuleInstance, UpgradeScripts)
