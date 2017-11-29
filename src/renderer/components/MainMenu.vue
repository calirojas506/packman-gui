<template lang="pug">
	.c-main-menu
		nav.navbar.navbar-inverse.navbar-fixed-top
			.container-fluid
				.navbar-header
					router-link.navbar-toggle.c-main-menu__icon(
						:to='{name: "about"}'
						data-toggle='tooltip'
						title='Built with love'
						data-placement='left'
					)
						i.fa.fa-heart.fa-2x
					router-link.navbar-brand(
						:to='{name: (this.$route.name == "dependencies" ? "start" : "dependencies")}'
					)
						i.fa.fa-asterisk(style='color: red')
						|  {{ app.name }}
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		computed: {
			...mapGetters([
				'app'
			])
		}
	}
</script>

<style lang="scss">
	.c-main-menu{
		.navbar{
			border-bottom: solid 1px #fff;
			box-shadow: 0 1px 10px #f1f1f1;

			&-nav{
				margin-top: 0;
				background: #333;
				margin-bottom: 0;
			}
			&-header{
				background: #fff;
			}
			&-inverse{
				background: #fff;

				.navbar-brand{
					color: #000;

					&:hover, &:focus, &:active{
						color: #000;
					}
				}

				.navbar-toggle{
					padding: 0;
					border: 0;
					color: rgba(255, 0, 0, .5);
					transition: all ease .5s;

					&:hover, &:focus{
						color: rgba(255, 0, 0, 1);
						background: #fff;
					}
				}
			}
		}
	}
</style>
