<template lang="pug">
	.dependencies-page(v-cloak)
		.row
			.col-xs-6.text-left
				packman-selector
			.col-xs-6
				.text-right
						button.btn.btn-default(
							type='button'
							data-toggle='tooltip'
							title='Open'
							data-placement='bottom'
							:class='{"active": showOpenFile}'
							@click='toggleOpenFile'
							@dragover.prevent='showOpenFile = true'
							v-if='project.filePath != ""'
						)
							i.fa.fa-folder-open-o
						|&nbsp;
						router-link.btn.btn-default(
							data-toggle='tooltip'
							title='Search'
							:to='{name: "search"}'
							data-placement='bottom'
						)
							i.fa.fa-search
		.row
			.col-xs-12 &nbsp;
		.row
			.col-sm-12
				drop-here(
					:animate='true'
					@dropped='fileDropped'
					v-if='showOpenFile || project.filePath == ""'
				)
		.row
			.col-sm-12
				.panel-group#accordion
					.panel.panel-default
						.panel-heading
							h4.panel-title
								a.accordion-toggle(
									data-toggle='collapse'
									data-parent='#accordion'
									href='#collapseDependencies'
								) Dependencies
						#collapseDependencies.panel-collapse.collapse.in
							.panel-body
								dependencies-table(
									:dependencies='project.fileContents.dependencies'
									:flag='currentPackageManager.flags.dep'
								)
					.panel.panel-default
						.panel-heading
							h4.panel-title
								a.accordion-toggle.collapsed(
									data-toggle='collapse'
									data-parent='#accordion'
									href='#collapseDevDependencies'
								) Development dependencies
						#collapseDevDependencies.panel-collapse.collapse
							.panel-body
								dependencies-table(
									:dependencies='project.fileContents.devDependencies'
									:flag='currentPackageManager.flags.dev'
								)
</template>

<script>
	import fs from 'fs'
	import DependenciesTable from '@/components/DependenciesTable'
	import DropHere from '@/components/DropHere'
	import PackmanSelector from '@/components/PackmanSelector'
	import {mapGetters, mapActions} from 'vuex'
	import Utils from '@/modules/Utils.js'
	import $ from 'jquery'

	global.jQuery = $

	require('bootstrap/dist/js/bootstrap.min.js')

	export default {
		components: {DependenciesTable, DropHere, PackmanSelector},
		data() {
			return {
				showOpenFile: false,
				selected: {
					devDependencies: [],
					dependencies: []
				}
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
				'openProject'
			]),
			fileDropped(files){
				this.openProject({f: files[0]})
				this.showOpenFile = false
			},
			toggleOpenFile(){
				this.showOpenFile = !this.showOpenFile
			},
			uninstallSelected(flag){
				if(this.selected.dependencies.length){
					this.uninstall(this.selected.dependencies.join(','), '', flag)
				}
			},
			uninstall(packageName, packageVersion, flag){
				this.$router.push({
					name: 'uninstall',
					query: {
						packageName,
						confirmed: 'false',
						flag
					}
				})
			},
			jQueryCode(){
				$('body').tooltip({
					selector: '[data-toggle="tooltip"]'
				})
			}
		},
		created(){
			this.jQueryCode()
		}
	}
</script>