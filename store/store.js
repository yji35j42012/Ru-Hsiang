const store = new Vuex.Store({
	state: {
		member: {
			user: null
		},
		loadingShow: true,
		msg: "",
		qData: null,
		aData: null
	},
	getters: {},
	mutations: {
		SET_LOADING(state, boo) {
			state.loadingShow = boo;
		},
		SET_MSG(state, str) {
			state.msg = str;
		},
		SET_USER(state, obj) {
			state.member = obj;
		},
		SET_QADATA(state, obj) {
			state.qData = obj;
		},
		SET_ANSDATA(state, obj) {
			state.aData = obj;
		}
	},
	actions: {
		SET_LOADING({ commit }, boo) {
			if (boo) {
				commit("SET_LOADING", boo);
			} else {
				setTimeout(() => {
					commit("SET_LOADING", boo);
				}, 500);
			}
		},
		MSG({ commit }, str) {
			commit("SET_MSG", str);
		},
		USER({ commit }, obj) {
			commit("SET_USER", obj);
		},
		GET_Q_DATA({ commit }) {
			commit("SET_ANSDATA", null);
			var get_url = url + "?getData=qa";
			var q_arr = [];
			axios.get(get_url).then(res => {
				console.log('ASDFASDF');
				
				var q_title = res.data[0];
				for (let i = 1; i < res.data.length; i++) {
					const element = res.data[i];
					var q_obj = {};
					for (let j = 0; j < q_title.length; j++) {
						q_obj[q_title[j]] = element[j];
					}
					q_arr.push(q_obj);
				}
				setTimeout(() => {
					commit("SET_LOADING", false);
				}, 500);
			});
			commit("SET_QADATA", q_arr);
		},
		GET_A_DATA({ commit }) {
			var get_url = url + "?getData=ans";
			var a_arr = [];
			axios.get(get_url).then(res => {
				var a_title = res.data[0];
				for (let i = 1; i < res.data.length; i++) {
					const element = res.data[i];
					var a_obj = {};
					for (let j = 0; j < a_title.length; j++) {
						a_obj[a_title[j]] = element[j];
					}
					a_arr.push(a_obj);
				}
				setTimeout(() => {
					commit("SET_LOADING", false);
				}, 500);
			});
			commit("SET_ANSDATA", a_arr);
		},
		RESET_A_DATA({ commit }, obj) {
			var a_title = obj[0];
			var a_arr = [];
			for (let i = 1; i < obj.length; i++) {
				const element = obj[i];
				var a_obj = {};
				for (let j = 0; j < a_title.length; j++) {
					a_obj[a_title[j]] = element[j];
				}
				a_arr.push(a_obj);
			}
			setTimeout(() => {
				commit("SET_LOADING", false);
			}, 500);

			commit("SET_ANSDATA", a_arr);
		}
	}
});
