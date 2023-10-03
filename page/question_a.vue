<style scoped></style>

<template>
	<div class="container">
		<div class="ans">
			<div class="ans_title" v-if="showQ !== null">{{ showQ.qa_title }}</div>
			<div class="ans_date" v-if="showQ !== null">{{ showQ.qa_date }}</div>
			<div class="ans_content" v-if="showQ !== null">{{ showQ.qa_content }}</div>
			<ul class="ans_group" v-if="showA !== null">
				<li class="ans_group_item" v-for="(item, index) in showA" :key="index">
					<div class="ans_group_title">{{ userNameArr[item.ans_userId] }}</div>
					<div class="ans_group_date">{{ item.ans_date }}</div>
					<div class="ans_group_content">{{ item.ans_content }}</div>
					<div class="ans_group_func" v-if="item.ans_userId == mem">
						<button class="normal_btn _primary" @click="ansEdit(item.ans_id, item)">編輯</button>
						<button class="normal_btn _danger" @click="ansDel(item.ans_id)">刪除</button>
					</div>
				</li>
			</ul>
		</div>

		<div :class="['ans_alert', alertShow ? 'show' : '']">
			<div class="ans_alert_box">
				<textarea class="ans_alert_text" rows="10" v-model="alert_edit.txt"></textarea>
				<div class="ans_alert_func">
					<button @click="editHandler" class="normal_btn _primary">{{ alert_confirm }}</button>
					<button @click="closeAlert" class="normal_btn _secondary">取消</button>
				</div>
			</div>
		</div>

		<div class="normal_func">
			<button class="normal_btn _primary" @click="back">上一頁</button>
			<button class="normal_btn _third" @click="addAns">新增答案</button>
		</div>

		<confirm v-if="checkMsg !== ''" :msg="checkMsg" @checkans="checkHandler"></confirm>
	</div>
</template>


<script>
module.exports = {
	data() {
		return {
			finish: {
				max: 0,
				count: 0
			},
			userNameArr: [],
			mem: null,
			alert_edit: { edit_row: null, txt: "" },
			alertShow: false,
			checkMsg: "",
			alert_confirm: "",
			delAnsId: null
		};
	},
	components: {
		confirm: httpVueLoader("../components/Confirm.vue")
	},

	mounted() {
		this.userNameArr = store.state.member.other;
		this.mem = store.state.member.user_id;
		if (store.state.qaData == null) {
			store.dispatch("GET_Q_DATA");
		}
		if (store.state.aData == null) {
			store.dispatch("GET_A_DATA");
		}
	},
	computed: {
		showQ() {
			var result = null;
			var q = store.state.qData;
			var qa_id = this.$route.params.qa_id;
			if (q) {
				q.forEach(item => {
					if (qa_id == item.qa_id) {
						result = item;
					}
				});
			}
			return result;
		},
		showA() {
			var reuslt = null;
			var a = store.state.aData;
			var qa_id = this.$route.params.qa_id;
			// var qaAns = [];
			if (a) {
				reuslt = [];
				a.forEach(item => {
					if (qa_id == item.qa_id) {
						reuslt.push(item);
					}
				});
			}
			return reuslt;
		}
	},
	methods: {
		back() {
			this.$router.go(-1);
		},
		ansDel(id) {
			console.log("id", id);
			this.alert_confirm = "刪除";
			this.checkMsg = "確定要刪除嗎？";
			this.delAnsId = id;
		},
		addAns() {
			this.alert_confirm = "新增";
			this.alert_edit.txt = "";
			this.alertShow = true;
		},
		checkHandler(s) {
			this.checkMsg = "";
			if (s == "y") {
				store.dispatch("SET_LOADING", true);
				this.alertShow = false;
				if (this.alert_confirm == "修改") {
					var get_url =
						url +
						"?getData=editAns&ans_row=" +
						this.alert_edit.edit_row +
						"&ans_content=" +
						this.alert_edit.txt;
					axios.get(get_url).then(res => {
						setTimeout(() => {
							store.dispatch("RESET_A_DATA", res.data);
						}, 200);
					});
				} else if (this.alert_confirm == "新增") {
					var qaId = this.$route.params.qa_id;
					var userId = store.state.member.user_id;
					var content = this.alert_edit.txt;
					var date = new Date();
					y = date.getFullYear();
					m = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
					d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
					var now = y + "/" + m + "/" + d;
					var get_url =
						url +
						"?getData=addAns&userId=" +
						userId +
						"&date=" +
						now +
						"&content=" +
						content +
						"&qaId=" +
						qaId;
					axios.get(get_url).then(res => {
						store.dispatch("RESET_A_DATA", res.data);
					});
				} else if (this.alert_confirm == "刪除") {
					var get_url =
						url + "?getData=delAns&delId=" + this.delAnsId;
					axios.get(get_url).then(res => {
						setTimeout(() => {
							store.dispatch("RESET_A_DATA", res.data);
						}, 200);
					});
				}
			}
		},
		ansEdit(id, s) {
			this.alert_confirm = "修改";
			this.alert_edit.txt = s.ans_content;
			this.alert_edit.edit_row = id;
			this.alertShow = true;
		},
		editHandler() {
			if (this.alert_edit.txt == "") {
				store.dispatch("MSG", "請輸入內容");
				return;
			}
			this.checkMsg = "確定要" + this.alert_confirm + "嗎？";
		},
		closeAlert() {
			this.alertShow = false;
		},
		setAns() {
			var qa_id = this.$route.params.qa_id;
			if (this.finish.count == this.finish.max) {
				for (let i = 0; i < this.qaData.length; i++) {
					const element = this.qaData[i];
					if (element.qa_id == qa_id) {
						element["qaAns"] = [];
						for (let a = 0; a < this.qaAns.length; a++) {
							const element1 = this.qaAns[a];
							element["qaAns"].push(element1);
						}
						this.showQ = element;
						store.dispatch("SET_LOADING", false);
						return;
					}
				}
			}
		}
	}
};
</script>
