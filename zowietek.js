const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const axios = require('axios')

module.exports = {
	async getInfo(module, group, data={}) {
		try {
			const response = await axios.post(`http://${this.config.host}/${module}?option=getinfo&login_check_flag=1`, {
				...data,
				group: group
			})
			console.log(`======== getInfo ${module} ${group} ============`)
			console.log('Status Code:', response.status)
			console.log('Response Data:', response.data)
			if (this.connstatus == false) {
				this.updateStatus(InstanceStatus.Ok)
				this.connstatus = true
			}
			return response.data
		} catch (error) {
			this.updateStatus(InstanceStatus.Disconnected, JSON.stringify(error.message))
			this.log("error", JSON.stringify(error))
			this.connstatus = false
			return null
		}
	},

	async setInfo(module, group, data={}) {
		try {
			const response = await axios.post(`http://${this.config.host}/${module}?option=setinfo&login_check_flag=1`, {
				...data,
				group: group
			})
			console.log('Status Code:', response.status)
			console.log('Response Data:', response.data)
		} catch (error) {
			console.error('Error:', error.message)
		}
	},

	async getDeviceStatus() {
		// Get PTZ Presets (only for PTZ Cam)
		data = await this.getInfo('ptz', 'ptz', {opt: 'get_presets'})
		if (data == null) {
			return
		}
		if (data.rsp == 'succeed') {
			this.CHOICES_PRESETS = []
			data.data.forEach( (preset) => {
				this.CHOICES_PRESETS.push({id: preset.id, label: preset.desc})
			})
		}

		data = await this.getInfo('record', 'record', { opt: "get_task_list" })
		if (data.rsp == 'succeed') {
			this.CHOICES_RECORD_TASKS = []
			data.data.forEach( (task) => {
				this.CHOICES_RECORD_TASKS.push({id: task.index, label: `${task.storageInfo.name} (${~~(task.storageInfo.freespace/1024)}GB free)`})
			})
			console.log(this.CHOICES_RECORD_TASKS)
		}
	}
}
