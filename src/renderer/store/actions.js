export default {
	openProject(context, payload){
		context.commit('openProject', payload)
	},
	reloadProject(context){
		context.commit('reloadProject')
	},
	switchPackageManager(context, payload){
		context.commit('switchPackageManager', payload)
	}
}