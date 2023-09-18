<style scoped></style>

<template>
	<div class="container">
		<div class="ans">
			<div class="ans_title" v-if="showQ !==null">{{showQ.qa_title}}</div>
			<div class="ans_date" v-if="showQ !==null">{{showQ.qa_date}}</div>
			<div class="ans_content" v-if="showQ !==null">{{showQ.qa_content}}</div>
			<ul class="ans_group" v-if="showA !==null">
				<li class="ans_group_item" v-for="(item,index) in showA" :key="index">
					<div class="ans_group_title">{{userNameArr[item.ans_userId]}}</div>
					<div class="ans_group_date">{{item.ans_date}}</div>
					<div class="ans_group_content">{{item.ans_content}}</div>
					<div class="ans_group_func" v-if="item.ans_userId == mem">
						<button class="normal_btn" @click="ansEdit(item.ans_id,item)">編輯</button>
						<button class="normal_btn">刪除</button>
					</div>
				</li>
			</ul>
		</div>

		<div :class="['ans_alert',alertShow?'show':'']">
			<div class="ans_alert_box">
				<textarea class="ans_alert_text" rows="10" v-model="alert_edit.txt"></textarea>
				<div class="ans_alert_func">
					<button @click="editHandler" class="normal_btn">修改</button>
					<button @click="closeAlert" class="normal_btn">取消</button>
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
			finish: {
				max: 0,
				count: 0
			},
			// qaAns: null,
			// qaData: null,
			// showQ: null,
			userNameArr: [],
			mem: null,
			alert_edit: { edit_row: null, txt: "" },
			alertShow: false,
			checkMsg: ""
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
		checkHandler(s) {
			this.checkMsg = "";
			if (s == "y") {
				this.alertShow = false;
				var get_url =
					url +
					"?getData=editAns&ans_row=" +
					this.alert_edit.edit_row +
					"&ans_content=" +
					this.alert_edit.txt;
				store.dispatch("SET_LOADING", true);
				axios.get(get_url).then(res => {
					setTimeout(() => {
						store.dispatch("GET_A_DATA");
					}, 200);
					// store.dispatch("SET_LOADING", false);
				});
			}
		},
		ansEdit(id, s) {
			this.alert_edit.txt = s.ans_content;
			this.alert_edit.edit_row = id;
			this.alertShow = true;
		},
		editHandler() {
			this.checkMsg = "確定要修改嗎？";
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
