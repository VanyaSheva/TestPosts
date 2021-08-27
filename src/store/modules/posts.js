const state = {
    posts: [],
};

const getters = {
    POSTS: state => {
        return state.posts;
    },
};

const mutations = {
    SET_POSTS: (state, items) => {
        state.posts = items;
    },
};

const actions = {
    GET_POSTS: (context) => {
        if(localStorage.getItem("posts")){
            return context.commit('SET_POSTS', JSON.parse(localStorage.getItem("posts")));
        }
        context.commit('SET_POSTS', []);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};