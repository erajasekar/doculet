import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';


export class State {
    public user: any; // todo
}

const getters =  {
    user(state: State): any {
        console.log(state.user); // TODO
        return state.user;
    },
} as GetterTree<State, any>;

const mutations =  {
    setUser(state: State, payload: any) {
        console.log(state.user); // TODO
        state.user = payload;
    },
} as MutationTree<State>;

const actions =  {
    signUserInGithub(store: ActionContext<State, any>) {
        const newUser = {
            id: 'my id',
            name: 'raja',
            email: 'email',
        };
        store.commit('setUser', newUser);
    },
    logout(store: ActionContext<State, any>) {
        // TODO
        store.commit('setUser', null);
    },
} as ActionTree<State, any>;

export const user = {
    state: new State(),
    getters,
    mutations,
    actions,
};
