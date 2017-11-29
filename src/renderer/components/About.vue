<template lang="pug">
	.c-about-page
		.row
			.col-sm-12
				h2 About {{ app.name }}
				p.
					Universal GUI for Node.js Dependencies Management, compatible with Yarn
					and npm. Use it to install, uninstall, search and
					visualize dependencies in your package.json. Works with local packages.

				h3 Built with
				ul
					li Node.js
					li Bootstrap
					li Vue.js / Vuex
					li Pug
					li Webpack
					li Electron
					li ES6

				h3 About the author
				p.
					Developed by Cali Rojas. Costa Rica. Follow me!

				.text-center.footer-links
					a(
						href='https://github.com/calirojas506'
						target='_blank'
					)
						i.fa.fa-github.fa-2x
					a(
						href='https://www.linkedin.com/in/cali-rojas-17403334/'
						target='_blank'
					)
						i.fa.fa-linkedin.fa-2x
					a(
						href='http://youtube.com/calirojas506'
						target='_blank'
					)
						i.fa.fa-youtube.fa-2x
					a(
						href='https://twitter.com/calirojas506'
						target='_blank'
					)
						i.fa.fa-twitter.fa-2x
					a(
						href='https://www.facebook.com/calirojas506/'
						target='_blank'
					)
						i.fa.fa-facebook.fa-2x
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


<style scoped lang="scss">
	.c-about-page{
		.footer-links{
			margin-top: 3em;

			a{
				margin: 10px 1.5em;
				color: #000;
				transition: all ease .3s;
				display: inline-block;

				&:hover{
					transform: scale(1.5);
				}
			}
		}
	}
</style>
