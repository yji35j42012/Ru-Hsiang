<template>
	<div class="alert">
		<div class="alert_box">
			<div class="alert_title">{{msg}}</div>
			<div class="alert_func">
				<button @click="close" class="normal_btn _primary">確認</button>
			</div>
		</div>
	</div>
</template>


<script>
module.exports = {
	data() {
		return {};
	},
	props: ["msg"],
	methods: {
		close() {
			store.dispatch("MSG", "");
		}
	}
};
</script>
