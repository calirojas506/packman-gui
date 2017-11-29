export default {
	execute: (command, flags, options, onData, onExit) => {
		let spawn = require('child_process').spawn
		let proc = spawn(command, flags, options)

		proc.stdout.on('data', data => {
			onData(data.toString())
		})

		proc.on('exit', code => {
			onExit(code.toString())
		})

		proc.stderr.on('data', data => {
			onData(data.toString())
		})
	}
}