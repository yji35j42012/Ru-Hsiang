<template>
	<div class="container">
		<div class="home_group">
			<router-link class="home_item _qa" to="/question">每日問答</router-link>
			<router-link class="home_item _plan" to="/plan">未來規劃</router-link>
			<router-link class="home_item _logout" to="/logout">登出</router-link>
		</div>
	</div>
</template>


	<script>
module.exports = {
	data() {
		return {};
	},
	mixins: [loginCheck],
	components: {},
	mounted() {},
	computed: {},
	methods: {}
};
</script>