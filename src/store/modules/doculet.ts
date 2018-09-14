import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import Constants from '../../utils/constants';
import firebase from 'firebase';
import {FireStoreService} from '../../services/FireStoreService';
import {logInfo} from '../../utils/logger';


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
    public myDocs: DoculetFile[] = [];
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

    myDocs(state: State): DoculetFile[] {
        return state.myDocs;
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

    addToMyDocs(state: State, doc: DoculetFile) {
        state.myDocs.unshift(doc);
    },

    deleteAllMyDocs(state: State) {
        state.myDocs = [];
    },

    deleteFromMyDocs(state: State, docId: string) {
        state.myDocs.forEach( (doc, index) => {
            if (doc.docId === docId) {
                state.myDocs.splice(index, 1);
            }
        });
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
    addToMyDocs(store: ActionContext<State, any>, doc: DoculetFile): boolean {

        const existing = store.state.myDocs.findIndex( (value) => value.docId === doc.docId) >= 0;
        if (!existing) {
            store.commit('addToMyDocs', doc);
        }
        return existing;
    },
    deleteFromMyDocs(store: ActionContext<State, any>, docId: string) {
        store.commit('deleteFromMyDocs', docId);
    },

    loadMyDocs(store: ActionContext<State, firebase.User>, payload: firebase.User) {

        const dbService = new FireStoreService();

        if (payload.email) {
            dbService.getMyDocs(payload.email).then((querySnapshot) => {
                logInfo(`Added ${querySnapshot.size} docs`);
                querySnapshot.forEach((doc) => {
                    store.commit('addToMyDocs', {docId: doc.id, docName: doc.data().name});
                });
            });
        }
    },

} as ActionTree<State, any>;

export const docStore = {
    state: new State(),
    getters,
    mutations,
    actions,
};
