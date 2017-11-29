<template lang="pug">
	.c-install-page
		.row
			.col-sm-12
				h2(v-if='!finished')
					template(v-if='flag != "--update--"')
						span Install<span v-if='confirmed'>ing</span> packages
					template(v-else)
						span Updating packages
				h2(v-else)
					span(v-if='flag != "--update--"') Finished installing packages
					span(v-else) Finished updating packages
		.row
			.col-sm-12
				template(v-if='!confirmed')
					form(@submit.prevent='startInstall')
						.form-group
							label.control-label Package names (comma separated):
							input.form-control(
								v-model='packages'
								required
							)
						.text-left
							.btn-group(
								data-toggle='buttons'
								v-if='flag != "--update--"'
							)
								<label class="btn btn-default col-sm-6" :class='{active: flag == currentPackageManager.flags.dep}'>
									<input type="radio" :value="currentPackageManager.flags.dep" autocomplete="off" v-model='flag'> Production
								</label>
								<label class="btn btn-default col-sm-6" :class='{active: flag == currentPackageManager.flags.dev}'>
									<input type="radio" :value="currentPackageManager.flags.dep" autocomplete="off" v-model='flag'> Development
								</label>
							.pull-right
								button.btn.btn-default(
									type='submit'
								) Install
								| &nbsp;
								button.btn.btn-default(
									type='button'
									@click='$router.go(-1)'
								) Cancel
				template(v-else)
					pre(v-if='log.length')
						ul.list-unstyled
							li(
								v-for='line in log' :key='line'
							) {{ line }}
					.progress(v-if='!finished')
						.progress-bar.progress-bar-striped.progress-bar-success(
							:class='{active: !finished}'
						)
							span(v-if='finished') Completed
							span(v-else) Please, wait...
					.text-right(v-else)
						template(v-if='from == "search"')
							button.btn.btn-default.pull-left(
								type='button'
								@click='$router.go(-2)'
							)
								i.fa.fa-chevron-left
								|&nbsp;Search
							| &nbsp;
							router-link.btn.btn-default(
								type='button'
								:to='{name: "dependencies"}'
							) Dependencies&nbsp;
								i.fa.fa-chevron-right
						template(v-else)
							button.btn.btn-default(
								type='button'
								@click='$router.go(-2)'
							) Dependencies&nbsp;
								i.fa.fa-chevron-right
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'
	import Utils from '@/modules/Utils.js'

	export default {
		data(){
			return {
				packages: '',
				flag: '--save',
				confirmed: false,
				finished: false,
				log: [],
				exitCode: null,
				from: ''
			}
		},
		computed: {
			...mapGetters([
				'project',
				'currentPackageManager'
			])
		},
		methods: {
			...mapActions([
				'reloadProject'
			]),
			init(){
				this.packages = this.$route.query.packages
				this.confirmed = this.$route.query.confirmed
				this.flag = this.$route.query.flag
				this.from = this.$route.query.from

				if(this.confirmed == true) this.install()
			},
			install(){
				let packages = this.packages.split(',')
				let norm = [this.currentPackageManager.commands.install]

				if(this.flag != '--update--' && this.flag != ''){
					norm.push(this.flag)
				}
				let params = [...norm, ...packages]

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
			startInstall(){
				if(this.packages.trim() != ''){
					this.$router.push({
						name: 'install',
						query: {
							flag: this.$route.query.flag,
							confirmed: true,
							packages: this.packages,
							from: this.from
						}
					})
				}else{
					this.packages = ''
				}
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
