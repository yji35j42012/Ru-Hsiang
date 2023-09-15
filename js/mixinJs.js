var loginCheck = {
	created: function() {
		let getUser = JSON.parse(sessionStorage.getItem("wuhsiang"));
		if (!getUser) {
			this.$router.push("/login");
			return;
		} else {
			if (store.state.member.user == null) {
				store.dispatch("USER", {
					user: getUser.user,
					user_id: getUser.user_id,
					user_name: getUser.user_name,
					other: getUser.other
				});
			}
		}

		// if (getUser.acc !== "" && getUser.pass !== "") {
		// 	this.$router.push("/");
		// } else {
		// 	this.$router.push("/login");
		// }
	}
};
// var load = {
// 	mounted() {
// 		window.onload = function() {
// 			store.dispatch("SET_LOADING", false);
// 		};
// 	}
// };

var url =
	"https://script.google.com/macros/s/AKfycbyxi_TP--qNkr1EF8wxmlS9cpT_VZrFmfS0xM_dGE1gNdAL0ysnFo4yPfC4srUzxMT-/exec";
// var msg = {
//     methods:{
//         msgHandler(str){
//             store.dispatch("MSG", str);
//         }
//     }
// }
