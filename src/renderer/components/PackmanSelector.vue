<template lang="pug">
	.c-packman-selector
		.row
			.col-sm-12
				.dropdown
					button.btn.btn-default.dropdown-toggle(
						type='button'
						id='packmans'
						data-toggle='dropdown'
					)
						img(
							:src='packmanInfo.image'
						)
						span.caret
					ul.dropdown-menu(
						role='menu'
						tabindex='-1'
					)
						li(
							v-for='packman in packageManagers'
						)
							a(
								role='menuitem'
								tabindex='-1',
								href='#'
								@click.prevent='changePackman(packman.id)'
							)
								img(
									:src='packman.image'
								)
								span {{ packman.name }}
									small(
										v-show='packman.id == packageManagerId'
									)
										i.fa.fa-check
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		computed: {
			...mapGetters([
				'project',
				'packageManagers',
				'packageManagerId'
			]),
			packmanInfo() {
				let _this = this;

				return this.packageManagers.find(el => {
					if (el.id == _this.packageManagerId) {
						return el
					}
				})
			}
		},
		methods: {
			...mapActions([
				'switchPackageManager'
			]),
			changePackman(packmanId) {
				this.switchPackageManager({
					id: packmanId
				})
			}
		}
	}
</script>

<style lang="scss">
	.c-packman-selector {
		button {
			&.dropdown-toggle {
				padding: 0;
				border: 0;

				img {
					height: 2.4em;
					display: inline-block;
					margin-right: 0.5em;
				}

				&:hover, &:active, &:focus {
					background: #fff !important;
					box-shadow: none;
				}
			}
		}

		.dropdown-menu {
			padding: 0;
			min-width: 0;
			max-width: none;

			li{
				padding: 0;

				&:first-child a{
					padding-top: 1em;
				}
				&:last-child a{
					padding-bottom: 1em;
				}

				a{
					padding: 0.5em 1em;

					img {
						width: 5em;
						display: inline-block;
					}

					span{
						display: inline-block;
						margin-left: 2em;
						font-weight: bold;
					}

					small {
						color: #f00;
						font-size: 0.8em;
						border-radius: 10px;
						margin-left: 1em;
						display: inline-block;
					}
				}
			}
		}
	}
</style>
