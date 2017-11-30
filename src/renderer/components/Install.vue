<template lang="pug">
	.c-install-page
		.row
			.col-sm-12
				h2(v-if='!finished')
					span Install<span v-if='confirmed'>ing</span> packages
				h2(v-else)
					span Finished installing packages
		.row
			.col-sm-12
				template(v-if='!confirmed')
					form(@submit.prevent='startInstall')
						.form-group
							label.control-label Package names (comma separated):
							input-tag.form-control(
								:tags='tagsInput'
								:class='{"height-fix": tagsInput.length}'
							)
						.text-left
							.btn-group(
								data-toggle='buttons'
							)
								label.btn.btn-default.col-sm-6(
									:class='{active: flag == currentPackageManager.flags.dep}'
								)
									input(
										type='radio'
										:value="currentPackageManager.flags.dep"
										autocomplete='off'
										v-model='flag'
									)
									| Production
								label.btn.btn-default.col-sm-6(
									:class='{active: flag == currentPackageManager.flags.dev}'
								)
									input(
										type='radio'
										:value="currentPackageManager.flags.dep"
										autocomplete='off'
										v-model='flag'
									)
									| Development
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
							) Search
							| &nbsp;
							router-link.btn.btn-default(
								type='button'
								:to='{name: "dependencies"}'
							) Dependencies
						template(v-else)
							button.btn.btn-default(
								type='button'
								@click='$router.go(-2)'
							) Dependencies
</template>

<script>
	import InputTag from 'vue-input-tag'
	import {mapGetters, mapActions} from 'vuex'
	import Utils from '@/modules/Utils.js'

	export default {
		components: { InputTag },
		data(){
			return {
				flag: '--save',
				confirmed: false,
				finished: false,
				log: [],
				exitCode: null,
				from: '',
				tagsInput: []
			}
		},
		computed: {
			...mapGetters([
				'project',
				'currentPackageManager'
			]),
			packages: () => this.tagsInput.join(',')
		},
		methods: {
			...mapActions([
				'reloadProject'
			]),
			init(){
				let tags = this.$route.query.packages.split(',')
				if(tags.length == 1 && tags[0] == ''){
					tags = []
				}

				this.tagsInput = tags
				this.confirmed = this.$route.query.confirmed
				this.flag = this.$route.query.flag
				this.from = this.$route.query.from

				if(this.confirmed == true) this.install()
			},
			install(){
				let packages = this.tagsInput
				let norm = [this.currentPackageManager.commands.install]

				if(this.flag != ''){
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

<style lang="scss" scoped>
	.c-install-page{
		.height-fix{
			height: auto;
		}

		.vue-input-tag-wrapper{
			.input-tag{

			}
		}
	}
</style>