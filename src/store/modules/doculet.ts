import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';

export interface DoculetDoc {
    docName: string;
}

export class State {
    public doc: DoculetDoc = {docName: 'Getting Started.adoc'}; // todo
}

const getters =  {
    doc(state: State): DoculetDoc {
        return state.doc;
    },
} as GetterTree<State, any>;

const mutations =  {
    updateDocName(state: State, docName: string) {
        state.doc.docName = docName;
    },
} as MutationTree<State>;

const actions =  {
    updateDocName(store: ActionContext<State, any>, docName: string) {
        store.commit('updateDocName', docName);
    },
} as ActionTree<State, any>;

export const docStore = {
    state: new State(),
    getters,
    mutations,
    actions,
};
