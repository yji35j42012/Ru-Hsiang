<style scoped></style>

<template>
	<div class="container">
		<ul class="qa_group">
			<li class="qa_item" v-for="(item, index) in qa" :key="index" @click="qaAlert(item.qa_id)">
				<div class="qa_item_date">{{ item.qa_date.split('/')[1] + "/" + item.qa_date.split('/')[2] }}</div>
				<div class="qa_item_title">{{ item.qa_title }}</div>
				<div class="qa_item_info">{{ item.qa_content }}</div>
			</li>
		</ul>

		<div class="normal_func">
			<button class="normal_btn _primary" @click="back">上一頁</button>
			<button class="normal_btn _third" @click="addQ">新增問題</button>
		</div>

		<div :class="['ans_alert', alertShow ? 'show' : '']">
			<div class="ans_alert_box">
				<input class="ans_alert_inp" type="text" v-model="alert_edit.title" />
				<input class="ans_alert_date" type="text" v-model="alert_edit.date" />
				<textarea class="ans_alert_text" rows="10" v-model="alert_edit.txt"></textarea>
				<div class="ans_alert_func">
					<button @click="editHandler" class="normal_btn _primary">新增</button>
					<button @click="closeAlert" class="normal_btn _secondary">取消</button>
				</div>
			</div>
		</div>

		<confirm v-if="checkMsg !== ''" :msg="checkMsg" @checkans="checkHandler"></confirm>
	</div>
</template>


<script>
module.exports = {
	data() {
		return {
			qaAlertShow: false,
			qaData: [],
			alertShow: false,
			alert_edit: { title: "", txt: "", date: "" },
			checkMsg: ""
		};
	},
	components: {
		confirm: httpVueLoader("../components/Confirm.vue")
	},
	mounted() {
		if (store.state.qData == null) {
			store.dispatch("GET_Q_DATA");
		} else {
			store.dispatch("SET_LOADING", false);
		}
	},
	computed: {
		qa() {
			var qData = store.state.qData;
			var newDAta = [];
			if (qData) {
				newDAta = this.timeSort(qData);
			}
			return store.state.qData;
		}
	},
	methods: {
		addQ() {
			this.alertShow = true;
			this.alert_edit.title = "";
			this.alert_edit.txt = "";
			var date = new Date();
			y = date.getFullYear();
			m = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
			d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			var now = y + "/" + m + "/" + d;
			this.alert_edit.date = now;
		},
		back() {
			this.$router.go(-1);
		},
		editHandler() {
			if (this.alert_edit.title == "") {
				store.dispatch("MSG", "請輸入標題");
				return;
			}
			if (this.alert_edit.date == "") {
				store.dispatch("MSG", "請輸入日期");
				return;
			}
			if (this.alert_edit.txt == "") {
				store.dispatch("MSG", "請輸入內容");
				return;
			}
			this.checkMsg = "確定新增？";
		},
		checkHandler(s) {
			this.checkMsg = "";
			var get_url =
				url +
				"?getData=addQ&title=" +
				this.alert_edit.title +
				"&date=" +
				this.alert_edit.date +
				"&content=" +
				this.alert_edit.txt;
			if (s == "y") {
				store.dispatch("SET_LOADING", true);
				this.alertShow = false;
				axios.get(get_url).then(res => {
					store.dispatch("RESET_Q_DATA", res.data);
				});
			}
		},
		closeAlert() {
			this.alertShow = false;
		},
		qaAlert(id) {
			this.$router.push("/question/" + id);
		},
		timeSort(arr) {
			arr.sort(function (a, b) {
				return a.qa_date < b.qa_date ? 1 : -1;
			});
		}
	}
};
</script>
