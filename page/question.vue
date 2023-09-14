<style scoped></style>

<template>
	<div class="container">
		<ul class="qa_group">
			<li class="qa_item">
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
			</li>
			<li class="qa_item">
				<div class="qa_item_date">08/26</div>
				<div class="qa_item_title">你有藝術天份嗎？</div>
				<div class="qa_item_info">
					所謂的藝術，是指所有表現出個人想法的作品。
					假設你要進行藝術創作，你會選擇哪個領域呢？
					你可以畫一幅畫、寫一首歌，甚至做出一件陶製品。
					不管選擇如何，在創作的世界裡，沒有規則也沒有章程，
					只要將感受及想法，真切地表達出來就好。或許參與活動，能為你帶來新的體會。
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
module.exports = {
	data() {
		return {};
	},
	components: {},
	mounted() {
		var get_url = url + "?getData=qa";

		axios.get(get_url).then(res => {
			console.log(res.data);

			// if (res.data[0].state !== 0) {
			// 	store.dispatch("SET_LOADING", false);
			// 	store.dispatch("MSG", "帳號或密碼輸入錯誤");
			// 	return;
			// } else {
			// 	let memObj = JSON.stringify({
			// 		user: this.user
			// 	});
			// 	sessionStorage.setItem("wuhsiang", memObj);
			// 	store.dispatch("USER", { user: this.user });

			// 	this.$router.push("/");
			// }
		});
	},
	computed: {},
	methods: {}
};
</script>
