<template lang="pug">
	.c-start-page
		.row
			.col-xs-12
				h1.text-center.title
					i.fa.fa-asterisk.icon
					span.name {{ app.name }}
				h2.subtitle.text-center {{ app.description }}
		.row
			.col-xs-12
				drop-here(
					@dropped='fileDropped'
				)
</template>

<script>
	import DropHere from '@/components/DropHere'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		components: {DropHere},
		computed: {
			...mapGetters([
				'app'
			])
		},
		methods: {
			...mapActions([
				'openProject'
			]),
			fileDropped(files){
				this.openProject({
					f: files[0]
				})
				this.$router.push({
					name: 'dependencies'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.c-start-page{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		width: 90%;

		.title{
			font-weight: normal;
			color: #000;
			padding: 0;
			margin: 0;
		}
		.subtitle{
			margin: 0;
			padding: 0;
			font-size: .7em;
			font-weight: bold;
			text-indent: 15px;
		}
		.icon{
			color: #f00;
		}
	}
</style>