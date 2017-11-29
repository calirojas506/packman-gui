<template lang="pug">
	#app
		main-menu(
			v-if='$route.path != "/"'
		)
		.container-fluid
			transition(
				name='fade'
			)
				router-view
</template>

<script>
	import MainMenu from "@/components/MainMenu";

	export default {
		components: { MainMenu }
	}
</script>

<style lang="scss">
	@import 'assets/scss/main.scss';
</style>
