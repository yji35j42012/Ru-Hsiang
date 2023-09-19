<style scoped></style>

<template>
	<div class="container">
		<ul class="qa_group">
			<li class="qa_item" v-for="(item,index) in qa" :key="index" @click="qaAlert(item.qa_id)">
				<div class="qa_item_date">{{item.qa_date.split('/')[1]+"/"+item.qa_date.split('/')[2]}}</div>
				<div class="qa_item_title">{{item.qa_title}}</div>
				<div class="qa_item_info">{{item.qa_content}}</div>
			</li>
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
			var qData = store.state.qData;
			var newDAta = [];
			if (qData) {
				newDAta = this.timeSort(qData);
			}
			return store.state.qData;
		}
	},
	methods: {
		qaAlert(id) {
			this.$router.push("/question/" + id);
		},
		timeSort(arr) {
			arr.sort(function(a, b) {
				return a.qa_date < b.qa_date ? 1 : -1;
			});
		}
	}
};
</script>
