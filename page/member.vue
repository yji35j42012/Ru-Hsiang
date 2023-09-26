<style scoped></style>

<template>
	<div class="container">
		<div class="member_title">個人資料</div>
		<ul class="member_group">
			<li class="member_item" data-txt="姓名">
				<input type="text" class="normal_inp" v-model="name" />
			</li>
			<li class="member_item" data-txt="帳號">
				<input type="text" class="normal_inp" v-model="acc" />
			</li>
			<li class="member_item" data-txt="舊密碼">
				<input type="text" class="normal_inp" v-model="oldPass" />
			</li>
			<li class="member_item" data-txt="新密碼">
				<input type="text" class="normal_inp" v-model="newPass" />
			</li>
		</ul>
		<div class="normal_func">
			<button class="normal_btn _primary" @click="back">上一頁</button>
			<button class="normal_btn _third" @click="editMem">修改</button>
		</div>
		<confirm v-if="checkMsg !== ''" :msg="checkMsg" @checkans="checkHandler"></confirm>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {
			id: 0,
			name: "",
			acc: "",
			oldPass: "",
			newPass: "",
			checkMsg: ""
		};
	},
	components: {},
	mounted() {
		var info = store.state.member;
		this.name = info.user_name;
		this.acc = info.user;
		this.id = info.user_id;
		store.dispatch("SET_LOADING", false);
	},
	components: {
		confirm: httpVueLoader("../components/Confirm.vue")
	},
	computed: {},
	methods: {
		checkHandler(s) {
			store.dispatch("SET_LOADING", true);
			this.checkMsg = "";
			var get_url = "";
			var getData = "";
			if (s == "y") {
				if (this.newPass !== "" && this.oldPass !== "") {
					get_url =
						url +
						"?getData=editMP&id=" +
						this.id +
						"&name=" +
						this.name +
						"&acc=" +
						this.acc +
						"&pass=" +
						this.newPass + "&oPass=" + this.oldPass;
				} else {
					get_url =
						url +
						"?getData=editM&id=" +
						this.id +
						"&name=" +
						this.name +
						"&acc=" +
						this.acc;
				}
				axios.get(get_url).then(res => {
					store.dispatch("SET_LOADING", false);
					if (res.data == 'ok' && this.newPass !== "" && this.oldPass !== "") {
						store.dispatch("MSG", '修改成功，需要重新登入');

						this.$router.push("/logout");
					} else if (res.data == 'ok') {
						store.dispatch("MSG", '修改成功');
					} else {
						store.dispatch("MSG", '修改失敗，可能舊密碼錯誤');
					}
				})
				let memObj = JSON.stringify({
					user: this.acc,
					user_id: store.state.member.user_id,
					user_name: this.name,
					other: store.state.member.other,
				});
				sessionStorage.setItem("wuhsiang", memObj);
				store.dispatch("USER", {
					user: this.acc,
					user_id: store.state.member.user_id,
					user_name: this.name,
					other: store.state.member.other,
				});
				// this.alertShow = false;
				// if (this.alert_confirm == "修改") {
				// 	var get_url =
				// 		url +
				// 		"?getData=editAns&ans_row=" +
				// 		this.alert_edit.edit_row +
				// 		"&ans_content=" +
				// 		this.alert_edit.txt;
				// 	axios.get(get_url).then(res => {
				// 		setTimeout(() => {
				// 			store.dispatch("RESET_A_DATA", res.data);
				// 		}, 200);
				// 	});
				// } else if (this.alert_confirm == "新增") {
				// 	var qaId = this.$route.params.qa_id;
				// 	var userId = store.state.member.user_id;
				// 	var content = this.alert_edit.txt;
				// 	var date = new Date();
				// 	y = date.getFullYear();
				// 	m = date.getMonth() + 1;
				// 	d = date.getDate();
				// 	var now = y + "/" + m + "/" + d;
				// 	var get_url =
				// 		url +
				// 		"?getData=addAns&userId=" +
				// 		userId +
				// 		"&date=" +
				// 		now +
				// 		"&content=" +
				// 		content +
				// 		"&qaId=" +
				// 		qaId;
				// 	axios.get(get_url).then(res => {
				// 		store.dispatch("RESET_A_DATA", res.data);
				// 	});
				// } else if (this.alert_confirm == "刪除") {
				// 	var get_url =
				// 		url + "?getData=delAns&delId=" + this.delAnsId;
				// 	axios.get(get_url).then(res => {
				// 		setTimeout(() => {
				// 			store.dispatch("RESET_A_DATA", res.data);
				// 		}, 200);
				// 	});
				// }
			}
		},
		editMem() {
			if (this.name == "") {
				store.dispatch("MSG", "名稱不能為空");
				return;
			}
			if (this.acc == "") {
				store.dispatch("MSG", "帳號不能為空");
				return;
			}
			if (this.newPass !== "" && this.oldPass == "") {
				store.dispatch("MSG", "要改密碼要先輸入就密碼");
				return;
			}

			this.checkMsg = "確定要修改嗎？";
			// if (this.newPass !== "" && this.oldPass !== "") {
			// getData = editMP;
			// get_url =
			// 	url +
			// 	"?getData=editMP&id=" +
			// 	this.id +
			// 	"&name=" +
			// 	this.name +
			// 	"&acc=" +
			// 	this.acc +
			// 	"&pass=" +
			// 	this.newPass;
			// } else {

			// }
			// console.log("store", store.state.member);
			// console.log('cookie', JSON.parse(sessionStorage.getItem("wuhsiang")));
		},
		back() {
			this.$router.go(-1);
		}
	}
};
</script>
