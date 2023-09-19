<template>
	<div class="confirm">
		<div class="confirm_box">
			<div
				class="confirm_msg"
				style="overflow-x: hidden; overflow-y: auto; max-height: 700px"
			>{{ msg }}</div>
			<button class="normal_btn _primary" @click="checkAns('y')">確認</button>
			<button class="normal_btn _secondary" @click="checkAns('n')">取消</button>
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
		checkAns(str) {
			this.$emit("checkans", str);
		}
	}
};
</script>