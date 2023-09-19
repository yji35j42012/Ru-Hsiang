<style scoped></style>

<template>
	<div class="container">
		<bulid></bulid>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {};
	},
		components: {
		bulid: httpVueLoader("../components/Build.vue")
	},
	mounted() {store.dispatch("SET_LOADING", false);},
	computed: {},
	methods: {}
};
</script>
