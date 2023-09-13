<style scoped></style>

<template>
	<div class="login">
		<div class="login_box">
			<div class="login_box_info">
				<label class="login_box_inp _acc">
					<input type="text" placeholder="User Name" v-model="acc" />
				</label>
				<label class="login_box_inp _pass">
					<input type="text" placeholder="Password" v-model="pass" />
				</label>

				<button @click="login" class="login_box_btn">LOGIN</button>
				<!-- <button @click="getSe" class="login_box_btn">get</button> -->
			</div>
			<div class="login_box_bg">
				<span class="login_box_shape login_box_shape4"></span>
				<span class="login_box_shape login_box_shape3"></span>
				<span class="login_box_shape login_box_shape2"></span>
				<span class="login_box_shape login_box_shape1"></span>
			</div>
		</div>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
			acc: "alex",
			pass: "a1234"
		};
	},
	components: {},
	mounted() {},
	computed: {},
	methods: {
		login() {
			let memObj = JSON.stringify({
				acc: this.acc,
				pass: this.pass
			});
			sessionStorage.setItem("wuhsiang", memObj);

			console.log("memObj", memObj);
			//

			if (this.acc == "") {
			}
			if (this.pass == "") {
			}
			this.$router.push("/");
		}
		// getSe() {
		// 	// let getData = sessionStorage.getItem("wuhsiang");
		// 	let getUser = JSON.parse(sessionStorage.getItem("wuhsiang"));
		// 	console.log("getData", getData);
		// }
	}
};
</script>
