<template lang="pug">
	.c-drop-here.text-center(
		@dragover.prevent='dragOver'
		@dragleave.prevent='dragEnd'
		@dragend.prevent='dragEnd'
		@drop.prevent='dropFile'
		:class='{dragover: draggingOver}'
	)
		i.fa.fa-file-text-o.fa-5x.c-drop-here__icon(
			:class='{"animate-icon": animate}'
			ref='icon'
		)
		p.text-center.c-drop-here__text
			<slot>Drop here your dependencies file</slot>
			p &nbsp;
</template>

<style lang="scss">
	.c-drop-here{
		display: block;
		border: dashed 2px transparent;
		border-radius: 3px;
		margin: 1em 0;

		&:hover, &.dragover{
			border-color: rgba(255, 0, 0, .3)
		}

		&__icon{
			font-size: 13em;
			color: #ccc;
			display: block;
			margin: .2em 0;

			&.animate-icon{
				animation: drag 1s infinite 0s;
			}
		}
		&__text{
			font-size: .85em;
			color: #000;
			border-radius: 10em;
			display: inline-block;
			margin: 0;
			transition: all ease .3s;
			pointer-events: none;
		}

		@keyframes drag{
			0%{
				transform: scale(1)
			}
			50%{
				transform: scale(.8)
			}
			100%{
				transform: scale(1)
			}
		}
	}
</style>


<script>
	export default {
		props: {
			animate: {
				required: false
			}
		},
		data(){
			return {
				draggingOver: false
			}
		},
		methods: {
			dropFile(e){
				this.$emit('dropped', e.dataTransfer.files)
			},
			dragOver(){
				this.draggingOver = true
			},
			dragEnd(){
				this.draggingOver = false
			}
		}
	}
</script>
