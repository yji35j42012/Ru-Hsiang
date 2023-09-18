<style scoped></style>

<template>
	<div class="container">
		<ul class="qa_group">
			<li class="qa_item" v-for="(item,index) in qa" :key="index" @click="qaAlert(item.qa_id)">
				<div class="qa_item_date">{{item.qa_date}}</div>
				<div class="qa_item_title">{{item.qa_title}}</div>
				<div class="qa_item_info">{{item.qa_content}}</div>
			</li>
			<!-- <li class="qa_item">
				<div class="qa_item_date">08/25</div>
				<div class="qa_item_title">該如何紓解壓力？</div>
				<div class="qa_item_info">
					壓力往往在不知不覺間堆疊。
					如果是很小的壓力，
					通常只需要一天就能消除。
					但若是長期累積的壓力，可就沒這麼簡單了。
					你需要花點時間，讓自己放鬆。
					讓身心好好休息，什麼都不做，靜靜發呆就好。
					當身心清出一塊空白後，你的壓力也將逐漸消失。
				</div>

								<div class="qa_item_date">08/26</div>
				<div class="qa_item_title"></div>
				<div class="qa_item_info">

				</div>

			</li>-->
		</ul>
	</div>
</template>


<script>
module.exports = {
	data() {
		return {
			qaAlertShow: false,
			qaData: []
		};
	},
	components: {},
	mounted() {
		if (store.state.qData == null) {
			store.dispatch("GET_Q_DATA");
		} else {
			store.dispatch("SET_LOADING", false);
		}
	},
	computed: {
		qa() {
			return store.state.qData;
		}
	},
	methods: {
		qaAlert(id) {
			this.$router.push("/question/" + id);
		}
	}
};
</script>
