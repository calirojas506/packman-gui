import fs from 'fs'

export default {
	openProject(state, payload){
		fs.readFile(payload.f.path, (err, data) => {
			if(err){
				console.log('Error reading the file')
			}else{
				state.project.fileContents = JSON.parse(data.toString())
				state.project.filePath = payload.f.path
				state.project.fileDirectory = require('path').dirname(payload.f.path)

				if(fs.existsSync(state.project.fileDirectory + '/' + 'yarn.lock')){
					state.project.packageManager = 2
				}else{
					state.project.packageManager = 1
				}
			}
		})
	},
	reloadProject(state){
		fs.readFile(state.project.filePath, (err, data) => {
			if(err){
				console.log('Error reloading the project')
			}else{
				state.project.fileContents = JSON.parse(data.toString())
			}
		})
	},
	switchPackageManager(state, payload){
		state.project.packageManager = payload.id
	}
}