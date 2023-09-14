const store = new Vuex.Store({
	state: {
		member: {
			user: null
		},
		loadingShow: true,
		msg: ""
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
		}
	},
	actions: {
		SET_LOADING({ commit }, boo) {
			if (boo) {
				commit("SET_LOADING", boo);
			} else {
				setTimeout(() => {
					commit("SET_LOADING", boo);
				}, 1000);
			}
		},
		MSG({ commit }, str) {
			commit("SET_MSG", str);
		},
		USER({ commit }, obj) {
			commit("SET_USER", obj);
		}
	}
});
