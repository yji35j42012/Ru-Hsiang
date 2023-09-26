<style scoped></style>

<template>
	<div class="login">
		<div class="login_box">
			<div class="login_box_info">
				<label class="login_box_inp _acc">
					<input type="text" autocapitalize="off" placeholder="User Name" v-model="user" />
				</label>
				<label class="login_box_inp _pass">
					<input type="text" autocapitalize="off" placeholder="Password" v-model="pass" />
				</label>

				<button @click="login" class="login_box_btn">LOGIN</button>
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
			user: "",
			pass: ""
		};
	},
	components: {},
	mounted() {
		store.dispatch("SET_LOADING", false);
	},
	computed: {},
	methods: {
		login() {
			if (this.user == "") {
				store.dispatch("MSG", "請輸入帳號");
				return;
			}
			if (this.pass == "") {
				store.dispatch("MSG", "請輸入密碼");
				return;
			}
			store.dispatch("SET_LOADING", true);
			var date = new Date();
			y = date.getFullYear();
			m = date.getMonth() + 1;
			d = date.getDate();
			h = date.getHours();
			min = date.getMinutes();
			s = date.getSeconds();
			var now = y + "/" + m + "/" + d + h + ":" + min + ":" + s;
			var get_url =
				url +
				"?getData=login&user=" +
				encodeURIComponent(this.user) +
				"&pass=" +
				encodeURIComponent(this.pass) +
				"&date=" +
				now;
			axios.get(get_url).then(res => {
				if (res.data[0].state !== 0) {
					store.dispatch("SET_LOADING", false);
					store.dispatch("MSG", "帳號或密碼輸入錯誤");
					return;
				} else {
					var newarr = [];
					var marr = res.data[0].other;
					newarr[res.data[0].user_id] = res.data[0].user_name;
					marr.forEach(item => {
						newarr[item.user_id] = item.user_name;
					});

					let memObj = JSON.stringify({
						user: this.user,
						user_id: res.data[0].user_id,
						user_name: res.data[0].user_name,
						other: newarr
					});
					sessionStorage.setItem("wuhsiang", memObj);
					store.dispatch("USER", {
						user: this.user,
						user_id: res.data[0].user_id,
						user_name: res.data[0].user_name,
						other: newarr
					});

					this.$router.push("/");
				}
			});
		}
	}
};
</script>
