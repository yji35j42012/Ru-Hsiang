var loginCheck = {
	created: function() {
		let getUser = JSON.parse(sessionStorage.getItem("wuhsiang"));
		if (!getUser) {
			this.$router.push("/login");
			return;
		}

		// if (getUser.acc !== "" && getUser.pass !== "") {
		// 	this.$router.push("/");
		// } else {
		// 	this.$router.push("/login");
		// }
	}
};
var load = {
	mounted() {
		window.onload = function() {
			store.dispatch("SET_LOADING", false);
		};
	}
};

var url =
	"https://script.google.com/macros/s/AKfycbxTcJXs8101AOaUMRzWmANAe6sWHY-hu8691n4s9Rz7ZT6homm6ZkCiAaSnBqU9tZRc/exec";
// var msg = {
//     methods:{
//         msgHandler(str){
//             store.dispatch("MSG", str);
//         }
//     }
// }
