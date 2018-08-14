import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';


export class State {
    public count: number = 0;
}

const getters =  {
    count(state: State): number {
        return state.count;
    },
} as GetterTree<State, any>;

const mutations =  {
    inc(state: State, amount: number) {
        state.count += amount;
    },
    dec(state: State) {
        state.count -= 1;
    },
} as MutationTree<State>;

const actions =  {
    inc(store: ActionContext<State, any>, amount: number) {
        store.commit('inc', 1);
    },
    dec(store: ActionContext<State, any>) {
        store.commit('dec', 1);
    },
} as ActionTree<State, any>;

export const counter = {
    state: new State(),
    getters,
    mutations,
    actions,
};
