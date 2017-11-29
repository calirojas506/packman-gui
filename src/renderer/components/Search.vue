<template lang="pug">
	.c-search
		.row
			.col-sm-12
				h2 Search packages

				form(@submit.prevent='search')
					.form-group
						label.control-label Package name:
						.input-group
							input.form-control(
								v-model='searchTerm'
								placeholder='Type your search'
							)
							span.input-group-btn
								button.btn.btn-default(
									type='submit'
								)
									i.fa.fa-search
		.row
			.col-sm-12
				.progress(v-if='loading')
					.progress-bar.progress-bar-striped.progress-bar-danger(
						:class='{active: loading}'
					)
						span(v-if='!loading') Completed
						span(v-else) Querying <strong>npms.io</strong> <small>A better and open source search for node packages</small>
				.table-responsive(v-if='searchResults.length')
					table.table.table-striped.table-condensed.table-hover
						thead
							tr
								th &nbsp;
								th Package
								th Version
								th &nbsp;
						tbody
							tr(
								v-for='pack in searchResults'
							)
								td: input(type='checkbox')
								td {{ pack.package.name }}
								td {{ pack.package.version }}
								td.text-right
									button.btn.btn-xs.btn-default(
										type='button'
										data-toggle='popover'
										:data-package='pack.package.name'
										:data-version='pack.package.version'
										:data-description='pack.package.description'
										@click='installPackage({name: "install", query: {from: "search", flag: currentPackageManager.flags.dep, packages: pack.package.name, confirmed: false}})'
									)
										i.fa.fa-check
						tfoot
							tr
								td(colspan='2').text-left
									.c-paginator
										ul.list-inline(
											v-if='currentPage != 0'
										)
											li
												button.btn.btn-default(
													:disabled='currentPage <= 1'
													type='button'
													@click.prevent='getData(currentPage - 1)'
												)
													.fa.fa-chevron-left
											li {{ currentPage }} of {{ totalPages }}
											li
												button.btn.btn-default(
													:disabled='currentPage >= totalPages'
													type='button'
													@click.prevent='getData(currentPage + 1)'
												)
													.fa.fa-chevron-right
								td(colspan='2').text-right
									router-link.btn.btn-default(
										:to='{name: "install", query: {from: "search", flag: currentPackageManager.flags.dep, packages: "", confirmed: false}}'
										data-toggle='tooltip'
										title='Install selected packages'
									): i.fa.fa-check
									|&nbsp;
									button.btn.btn-default(
										type='button'
										data-toggle='tooltip'
										title='Uninstall selected'
									)
										i.fa.fa-trash
</template>

<script>
	import $ from 'jquery'
	import axios from 'axios'
	import Utils from '@/modules/Utils'
	import {mapGetters} from 'vuex'

	export default {
		data(){
			return {
				currentPage: 0,
				totalRecords: 0,
				searchTerm: '',
				searchResults: [],
				loading: false,
				perpage: 25,
				firstSearchPerformed: false
			}
		},
		computed: {
			...mapGetters([
				'currentPackageManager'
			]),
			totalPages(){
				return Math.ceil(this.totalRecords / this.perpage)
			},
			from(){
				return (this.currentPage * this.perpage) - this.perpage
			}
		},
		methods: {
			installPackage(data){
				this.$router.push(data)
			},
			search(){
				this.getData(1)
			},
			getData(pageNumber){
				this.firstSearchPerformed = true

				if(this.searchTerm.trim() == ''){
					this.totalRecords = 0
					this.searchResults = []
				}else{
					this.currentPage = parseInt(pageNumber)
					this.loading = true

					axios.get(`https://api.npms.io/v2/search?q=${this.searchTerm}&from=${this.from}`)
					.then(response => {
						this.totalRecords = response.data.total
						this.searchResults = response.data.results
						this.loading = false
					}).catch(e => {
						console.log(e)
						this.loading = false
					})
				}
			},
			jQueryCode(){
				$('body').popover('destroy')
				$('body').popover({
					selector: '[data-toggle="popover"]',
					placement: 'left',
					content(){
						return `
							<p>
								<span class="label label-danger">` + $(this).data('package') + `</span>
							</p>
							<p>
								<strong>Version </strong>` + $(this).data('version') + `
							</p>
							<p>` + $(this).data('description') + `</p>
						`
					},
					trigger: 'hover',
					html: true
				});
			}
		},
		created(){
			this.getData(1)
			this.jQueryCode()
		}
	}
</script>

<style lang="scss" scoped>
	.c-paginator{
		.list-inline{
			margin: 0;
		}
	}
</style>
