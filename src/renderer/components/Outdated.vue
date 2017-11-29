<template lang="pug">
	.page-outdated
		.row
			.col-sm-12
				h2
					span Outdated packages
		.row
			.col-sm-12
				outdated-table(
					flag='--save'
				)
</template>

<script>
	import OutdatedTable from '@/components/OutdatedTable'

	export default {
		components: {
			OutdatedTable
		}
	}
</script>
