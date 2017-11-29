<template lang="pug">
	.c-dynamic-table
		template(v-if='!filteredDependencies')
			p &nbsp;
			p.text-center()
				small
					span  No packages
			.text-center
				router-link.btn.btn-default(
					:to='{name: "install", query: {flag, packages: "", confirmed: false}}'
					data-toggle='tooltip'
					title='Add new packages'
				)
					i.fa.fa-plus
			p &nbsp;
		.responsive-table(v-else)
			table.table.table-hover.table-condensed
				thead
					tr
						th &nbsp;
						th Package
						th Version
						th &nbsp;
				tbody
					tr(
						v-for='(version, name) in filteredDependencies'
					)
						td
							input(
								type='checkbox'
								v-model='selectedDependencies'
								:value='name'
							)
						td {{ name }}
						td {{ version }}
						td.text-right
							button.btn.btn-xs.btn-default(
								type='button'
								@click='uninstall(name, version, flag)'
								data-toggle='tooltip'
								title='Uninstall'
							)
								i.fa.fa-trash
				tfoot
					tr
						td(colspan='2').text-left
							div
								.input-group.col-xs-12
									span.input-group-addon
										i.fa.fa-filter
									input.form-control(
										type='text'
										placeholder='Filter results'
										v-model="searchTerm"
									)
						td(colspan='2').text-right
							router-link.btn.btn-default(
								:to='{name: "install", query: {from: "dependencies", flag, packages: "", confirmed: false}}'
								data-toggle='tooltip'
								title='Add new packages'
							): i.fa.fa-plus
							|&nbsp;
							button.btn.btn-default(
								type='button'
								data-toggle='tooltip'
								title='Uninstall selected'
								@click='uninstallSelected(flag)'
							)
								i.fa.fa-trash
</template>

<script>
	export default {
		props: {
			flag: {
				required: true,
				type: String
			},
			dependencies: {
				required: false,
				type: Object
			}
		},
		data(){
			return {
				selectedDependencies: [],
				searchTerm: ''
			}
		},
		computed: {
			filteredDependencies(){
				if(this.searchTerm.trim() == ''){
					return this.dependencies
				}else{
					let filtered = {}

					for(let el in this.dependencies){
						if(el.includes(this.searchTerm)){
							filtered[el] = el
						}
					}

					return filtered
				}
			}
		},
		methods: {
			uninstallSelected(flag){
				if(this.selectedDependencies.length){
					this.uninstall(this.selectedDependencies.join(','), '', flag)
				}
			},
			uninstall(packageName, packageVersion, flag){
				this.$router.push({
					name: 'uninstall',
					query: {
						packageName,
						confirmed: false,
						flag,
						from: 'dependencies'
					}
				})
			}
		}
	}
</script>
