<style scoped></style>

<template>
	<div class="login">
		<div class="login_box">
			<div class="login_box_info">
				<label class="login_box_inp _acc">
					<input type="text" placeholder="User Name" v-model="user" />
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
			user: "alex",
			pass: "a1234"
		};
	},
	components: {},
	mounted() {},
	computed: {},
	methods: {
		login() {
			// this.$router.push("/home");
			if (this.user == "") {
				store.dispatch("MSG", "請輸入帳號");
				return;
			}
			if (this.pass == "") {
				store.dispatch("MSG", "請輸入密碼");
				return;
			}
			store.dispatch("SET_LOADING", true);
			var url =
				"https://script.google.com/macros/s/AKfycbzfCpUezp1dOVllAmVimOD8zTUbAiVSAQ2ORZcpwCw0u5VNNpAH1r9ap2mAqbt-tlvu/exec";
			var get_url =
				url +
				"?user=" +
				encodeURIComponent(this.user) +
				"&pass=" +
				encodeURIComponent(this.pass);
			axios.get(get_url).then(res => {
				if (res.data[0].state !== 0) {
					store.dispatch("SET_LOADING", false);
					store.dispatch("MSG", "帳號或密碼輸入錯誤");
					return;
				} else {
					let memObj = JSON.stringify({
						user: this.user
					});
					sessionStorage.setItem("wuhsiang", memObj);
					store.dispatch("USER", { user: this.user });

					this.$router.push("/");
				}
			});
		}
	}
};
</script>
