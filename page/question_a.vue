<style scoped></style>

<template>
	<div class="container">
		<div class="ans">
			<div class="ans_title" v-if="showData !==null">{{showData.qa_title}}</div>
			<div class="ans_date" v-if="showData !==null">{{showData.qa_date}}</div>
			<div class="ans_content" v-if="showData !==null">{{showData.qa_content}}</div>

			<ul class="ans_group" v-if="showData !==null">
				<li class="ans_group_item" v-for="(item,index) in showData.qaAns" :key="index">
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
			qaAns: null,
			qaData: null,
			showData: null,
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
		var qa_id = this.$route.params.qa_id;
		if (store.state.qaData == null) {
			this.finish.max = 2;
			var get_url = url + "?getData=qa";
			axios.get(get_url).then(res => {
				var qaObj = {};
				store.dispatch("qaData", res.data);
				this.qaData = res.data;
				this.finish.count++;
				this.setAns();
			});
			var get_url1 = url + "?getData=ans&qa_id=" + qa_id;
			axios.get(get_url1).then(res => {
				this.qaAns = res.data;
				this.finish.count++;
				this.setAns();
			});
		} else {
			this.finish.max = 1;
			this.qaData = store.state.qaData;
			var get_url1 = url + "?getData=ans&qa_id=" + qa_id;
			axios.get(get_url1).then(res => {
				this.qaAns = res.data;
				this.qaData = store.state.qaData;
				this.finish.count++;
				this.setAns();
			});
		}
	},
	computed: {},
	methods: {
		checkHandler(s) {
			console.log("s", s);
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
					store.dispatch("SET_LOADING", false);
				});
			}
		},
		ansEdit(id, s) {
			console.log(id);
			console.log(s);
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
						this.showData = element;

						store.dispatch("SET_LOADING", false);
						return;
					}
				}
			}
		}
	}
};
</script>
