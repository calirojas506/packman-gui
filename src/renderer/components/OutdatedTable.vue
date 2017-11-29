<template lang="pug">
	.c-outdated-table
		.progress(v-if='!finished')
			.progress-bar.progress-bar-striped.progress-bar-danger(
				:class='{active: !finished}'
			)
				span(v-if='finished') Completed
				span(v-else) Reading packages list...
		table.table.table-hover.table-condensed(
			v-else
		)
			thead
				tr
					th &nbsp;
					th Package
					th &nbsp;
			tbody
				tr(
					v-if='!filteredOutdatedPackages.length'
				)
					td(
						colspan='3'
					).text-center No packages found
				tr(
					v-for='(data, name) in filteredOutdatedPackages'
				)
					td
						input(
							type='checkbox'
							:value='name'
							v-model='selectedPackages'
						)
					td {{ name }}
					td.text-right
						button.btn.btn-xs.btn-default(
							type='button'
							data-toggle='popover'
							:data-current='data.current'
							:data-wanted='data.wanted'
							:data-latest='data.latest'
							:data-package='name'
							@click='(data.wanted == data.current) ? "" : update(name, flag)'
						)
							i.fa.fa-check(
								:class='{"text-muted": data.wanted == data.current}'
							)
						|&nbsp;
						button.btn.btn-xs.btn-default(
							type='button'
							data-toggle='tooltip'
							title='Update to latest'
							@click='installLatest(name, flag)'
						)
							i.fa.fa-refresh
			tfoot
				tr
					td(colspan='2').text-left
						div
							.input-group.col-xs-12
								span.input-group-addon
									i.fa.fa-search
								input.form-control(
									type='text'
									placeholder='Search...'
									v-model="searchTerm"
								)
					td(colspan='2').text-right
						button.btn.btn-default(
							type='button'
							data-toggle='tooltip'
							title='Update selected packages to wanted version'
							@click='updateSelected(flag)'
						)
							i.fa.fa-check
						| &nbsp;
						button.btn.btn-default(
							type='button'
							data-toggle='tooltip'
							title='Update selected packages to latest version'
							@click='updateSelected(flag)'
						)
							i.fa.fa-refresh
</template>

<script>
	import {mapGetters} from 'vuex'
	import Utils from '@/modules/Utils'
	import $ from 'jquery'

	export default {
		props: {
			flag: {
				type: String,
				required: true
			}
		},
		data(){
			return {
				outdatedPackages: {},
				finished: false,
				log: [],
				exitCode: null,
				searchTerm: '',
				selectedPackages: []
			}
		},
		computed: {
			...mapGetters([
				'project',
				'currentPackageManager'
			]),
			filteredOutdatedPackages(){
				if(this.searchTerm.trim() == ''){
					return this.outdatedPackages
				}else{
					let filtered = {}

					for(let el in this.outdatedPackages){
						if(el.includes(this.searchTerm)){
							filtered[el] = el
						}
					}

					return filtered
				}
			}
		},
		methods: {
			installLatest(packageName, flag){
				this.$router.push({
					name: 'install',
					query: {
						packages: packageName,
						confirmed: true,
						flag: '--update--',
						from: 'outdated'
					}
				})
			},
			update(packageName, flag){
				this.$router.push({
					name: 'update',
					query: {
						packageName,
						confirmed: false,
						flag,
						from: 'outdated'
					}
				})
			},
			updateSelected(flag){
				if(this.selectedPackages.length){
					this.update(this.selectedPackages.join(','), flag)
				}
			},
			readPackages(){
				let params = [
					'outdated',
					'--json=true',
					'--long=true'
				]

				Utils.execute(this.currentPackageManager.command, params, {
					cwd: this.project.fileDirectory
				}, (data) => {
					this.outdatedPackages = JSON.parse(data.toString())
					this.finished = true
				}, (code) => {
					this.exitCode = code
					this.finished = true
				})
			},
			jQueryCode(){
				$('body').popover('destroy')
				$('body').popover({
					selector: '[data-toggle="popover"]',
					placement: 'left',
					content(){
						let message = `
							Click if you want to update to the <strong>wanted</strong> version.
							To get the latest version click
							<button class="btn btn-default btn-xs">
								<i class="fa fa-refresh"></i>
							</button>
						`

						if($(this).data('current') == $(this).data('wanted')){
							message = `
								You have installed the <strong>wanted</strong> version.
								To get the latest version click
								<button class="btn btn-default btn-xs">
									<i class="fa fa-refresh"></i>
								</button>
							`
						}

						return `
							<table class="table">
								<caption><span class="label label-danger">` + $(this).data('package') + `</span></caption>
								<thead>
									<tr>
										<th>Current</th>
										<th>Wanted</th>
										<th>Latest</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><p class="label label-info">` + $(this).data('current') + `</p></td>
										<td><p class="label label-warning">` + $(this).data('wanted') + `</p></td>
										<td><p class="label label-success">` + $(this).data('latest') + `</p></td>
									</tr>
								</tbody>
							</table>
							<div>
								<p class="small">${message}</p>
							</div>
						`
					},
					trigger: 'hover',
					html: true
				});
			}
		},
		created(){
			this.readPackages()
			this.jQueryCode()
		}
	}
</script>

<style scoped lang="scss">
	.c-outdated-table{

	}
</style>
