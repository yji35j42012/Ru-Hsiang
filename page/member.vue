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
			newPass: ""
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
	computed: {},
	methods: {
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
			var get_url = "";
			var getData = "";
			if (this.newPass !== "" && this.oldPass !== "") {
				// getData = editMP;
				get_url =
					url +
					"?getData=editMP&id=" +
					this.id +
					"&name=" +
					this.name +
					"&acc=" +
					this.acc +
					"&pass=" +
					this.newPass;
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
			console.log(store.state.member);
		},
		back() {
			this.$router.go(-1);
		}
	}
};
</script>
