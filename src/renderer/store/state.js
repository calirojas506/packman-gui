export default {
	app: {
		version: '0.1 alpha',
		name: 'packman-gui',
		description: 'Universal GUI for Node.js Dependencies Management'
	},
	project: {
		filePath: '',
		fileDirectory: '',
		fileContents: {},
		packageManager: 1
	},
	packageManagers: [
		{
			id: 1,
			name: 'npm',
			command: 'npm',
			image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg',
			commands: {
				install: 'install',
				uninstall: 'uninstall',
				outdated: 'outdated',
				update: 'update'
			},
			flags: {
				dev: '--save-dev',
				dep: '--save'
			}
		},
		{
			id: 2,
			name: 'Yarn',
			command: 'yarn',
			image: 'http://www.verdaccio.org/css/icon/yarn-logo.svg',
			commands: {
				install: 'add',
				uninstall: 'remove',
				outdated: 'outdated',
				update: 'update'
			},
			flags: {
				dev: '--dev',
				dep: ''
			}
		}
	]
}