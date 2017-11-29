export default {
	app(state){
		return state.app
	},
	project(state){
		return state.project
	},
	packageManagers(state){
		return state.packageManagers
	},
	packageManagerId(state){
		return state.project.packageManager
	},
	currentPackageManager(state){
		let pm = state.project.packageManager

		return state.packageManagers.find(el => {
			return el.id == pm
		})
	}
}