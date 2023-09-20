<style scoped></style>

<template>
	<header class="head">
		<div @click="menuItem" class="head_title">
			<router-link class to="/">Ru-Hsiang</router-link>
		</div>
		<button @click="menuHandler" :class="['head_menu_btn', menuState?'on':'']">
			<span></span>
		</button>
		<div class="head_menu">
			<ul class="head_menu_group">
				<li @click="menuItem" class="head_menu_item">
					<router-link class="head_menu_link _qa" to="/question">每日問答</router-link>
				</li>
				<li @click="menuItem" class="head_menu_item">
					<router-link class="head_menu_link _plan" to="/plan">未來規劃</router-link>
				</li>
				<li @click="menuItem" class="head_menu_item">
					<router-link class="head_menu_link _member" to="/member">個人資料</router-link>
				</li>
				<li @click="menuItem" class="head_menu_item">
					<router-link class="head_menu_link _logout" to="/logout">登出</router-link>
				</li>
			</ul>
			<div class="head_menu_member">Hsiang</div>
		</div>
	</header>
</template>

<script>
module.exports = {
	data() {
		return {
			menuState: false
		};
	},
	components: {},
	mounted() {},
	computed: {},
	methods: {
		menuHandler() {
			this.menuState = !this.menuState;
		},
		menuItem() {
			this.menuState = false;
		}
	}
};
</script>
