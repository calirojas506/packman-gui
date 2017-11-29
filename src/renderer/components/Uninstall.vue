<template lang="pug">
	.c-uninstall-page
		.row
			.col-sm-12
				h2(v-if='!finished')
					span Uninstall<span v-if='confirmed'>ing</span> {{ formattedPackagesList }}
				h2(v-else)
					span Finished uninstalling {{ formattedPackagesList }}

		.row
			.col-sm-12
				template(v-if='!confirmed')
					p Do you want to uninstall the selected package<span v-if='packages.length > 1'>s</span>?
						strong  You cannot reverse this action.
					.text-right
						router-link.btn.btn-default(
							:to="{name: 'uninstall', query: {packageName, confirmed: true, flag}}"
						) Yes, uninstall the package<span v-if="packages.length > 1">s</span>
						| &nbsp;
						button.btn.btn-default(
							@click='$router.go(-1)'
						) Cancel
				template(v-else)
					pre(v-if='log.length')
						ul.list-unstyled
							li(
								v-for='line in log' :key='line'
							) {{ line }}
					.progress(v-if='!finished')
						.progress-bar.progress-bar-striped.progress-bar-danger(
							:class='{active: !finished}'
						)
							span(v-if='finished') Completed
							span(v-else) Please, wait...
					.text-right(
						v-show='finished'
					)
						button.btn.btn-default(
							type='button'
							@click='$router.go(-2)'
						) Dependencies&nbsp;
							i.fa.fa-chevron-right
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import Utils from '@/modules/Utils.js'

	export default {
		name: 'uninstall',
		data(){
			return {
				packageName: '',
				confirmed: false,
				finished: false,
				log: [],
				exitCode: null,
				flag: ''
			}
		},
		computed: {
			...mapGetters([
				'project',
				'currentPackageManager'
			]),
			formattedPackagesList(){
				let formatted = this.packageName.replace(/,([^,]*)$/,' and $1')

				return formatted.replace(/,/g, ', ')
			},
			packages(){
				return this.packageName.split(',')
			}
		},
		methods: {
			...mapActions([
				'reloadProject'
			]),
			uninstall(){
				let initial = [this.currentPackageManager.commands.uninstall]

				let packages = this.packageName.split(',')
				let params = [...initial, ...packages]


				if(this.flag != '') params.push(this.flag)

				Utils.execute(this.currentPackageManager.command, params, {
					cwd: this.project.fileDirectory
				}, (data) => {
					this.log.push(data)
				}, (code) => {
					this.reloadProject()
					this.exitCode = code
					this.finished = true
				})
			},
			init(){
				this.packageName = this.$route.query.packageName
				this.confirmed = this.$route.query.confirmed
				this.flag = this.$route.query.flag

				if(this.confirmed == true) this.uninstall()
			}
		},
		created(){
			this.init()
		},
		watch: {
			'$route'(){
				this.init()
			}
		}
	}
</script>
