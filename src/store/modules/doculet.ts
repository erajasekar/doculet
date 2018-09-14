import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import Constants from '../../utils/constants';

export interface DoculetDoc { // TODO make it extend DoculentFile
    docName: string;
    content: string;
    docId: string | null;
}

export interface DoculetFile {
    docName: string;
    docId: string;
}

const homeDoc = {
    docName: Constants.ON_LOAD_DOC_NAME,
    content: Constants.ON_LOAD_DOC_CONTENT,
    docId: null,
};

export class State {
    public doc: DoculetDoc =  homeDoc;
    public myDocs: DoculetFile[] = [
        {
            docId: '959f28f5590f7f5183e7516038275737',
            docName: 'Getting Started2.adoc',
        },
        {
            docId: 'e29e9a0e3a3b1ae43e26b7f776522ba2',
            docName: 'New Document.adoc',
        },
    ];
}

const getters =  {
    doc(state: State): DoculetDoc {
        return state.doc;
    },

    docName(state: State): string {
        return state.doc.docName;
    },

    docId(state: State): string | null {
        return state.doc.docId;
    },

    content(state: State): string {
        return state.doc.content;
    },
} as GetterTree<State, any>;

const mutations =  {
    updateDocName(state: State, docName: string) {
        state.doc.docName = docName;
    },

    updateDocId(state: State, docId: string) {
        state.doc.docId = docId;
    },

    updateDocContent(state: State, content: string) {
       state.doc.content = content;
    },
} as MutationTree<State>;

const actions =  {
    updateDocName(store: ActionContext<State, any>, docName: string) {
        store.commit('updateDocName', docName);
        store.commit('updateDocId', null); // Whenever docName changes, reset docId.
    },
    updateDocId(store: ActionContext<State, any>, docId: string) {
        store.commit('updateDocId', docId);
    },
    updateDocContent(store: ActionContext<State, any>, content: string) {
        store.commit('updateDocContent', content);
    },
    /* TODO remove if not used
    loadHomeDoc(store: ActionContext<State, any>) {
        store.commit('updateDocName', "new name");
        store.commit('updateDocContent', "`new content`");
        store.commit('updateDocId', homeDoc.docId);
    },*/
} as ActionTree<State, any>;

export const docStore = {
    state: new State(),
    getters,
    mutations,
    actions,
};
