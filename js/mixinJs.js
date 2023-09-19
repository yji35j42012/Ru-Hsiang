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
	"https://script.google.com/macros/s/AKfycbz1xKlG9CXA1gI1oX3WZ4Izg0Wa5UaaHzASwd-IsD7g4il1aGS4ANiGq9wk7gY3M2ZK/exec";
// var msg = {
//     methods:{
//         msgHandler(str){
//             store.dispatch("MSG", str);
//         }
//     }
// }
