<style scoped>
.close{
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>

<template>
	<div class="container">
		<div class="close">
			網站已關閉...
			<br>
			掰掰...
		</div>
		<div class="home_group" style="display: none;">
			<router-link class="home_item _qa" to="/question">每日問答</router-link>
			<router-link class="home_item _plan" to="/plan">未來規劃</router-link>
			<router-link class="home_item _member" to="/member">個人資料</router-link>
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
	mounted() {
		store.dispatch("SET_LOADING", false);
	},
	computed: {},
	methods: {}
};
</script>