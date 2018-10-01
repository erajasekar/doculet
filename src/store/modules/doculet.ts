import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import Constants from '../../utils/constants';
import firebase from 'firebase';
import {FireStoreService} from '../../services/FireStoreService';
import {logDebug} from '../../utils/logger';


export interface DoculetDoc extends DoculetDocBase {
    content: string;
    docSaved: boolean;
}

export interface DoculetDocBase extends DoculetFile {
    docOwnerId: string;
}

export interface DoculetFile {
    docName: string;
    docId: string;
}

const homeDoc = {
    docName: Constants.ON_LOAD_DOC_CONTENT,
    content: Constants.ON_LOAD_DOC_CONTENT,
    docId: Constants.ON_LOAD_DOC_CONTENT,
    docSaved: false,
    docOwnerId: Constants.ON_LOAD_DOC_CONTENT,
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

    docOwnerId(state: State): string | null {
        return state.doc.docOwnerId;
    },

    content(state: State): string {
        return state.doc.content;
    },

    docSaved(state: State): boolean {
        return state.doc.docSaved;
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

    updateOwnerId(state: State, docOwnerId: string) {
        state.doc.docOwnerId = docOwnerId;
    },

    updateDocContent(state: State, content: string) {
       state.doc.content = content;
    },

    updateDocSaved(state: State, docSaved: boolean) {
        state.doc.docSaved = docSaved;
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
        store.commit('updateDocSaved', false); // Whenever docName changes, reset docSaved.
    },

    updateDocId(store: ActionContext<State, any>, docId: string) {
        store.commit('updateDocId', docId);
    },

    updateDocContent(store: ActionContext<State, any>, content: string) {
        store.commit('updateDocContent', content);
    },

    updateDoc(store: ActionContext<State, any>, doc: DoculetDocBase) {
        store.commit('updateDocId', doc.docId);
        store.commit('updateDocName', doc.docName);
        store.commit('updateOwnerId', doc.docOwnerId);
        store.commit('updateDocSaved', false); // TODO if it creates problems, make it parameterize.
    },

    updateDocSaved(store: ActionContext<State, any>, docSaved: boolean) {
        store.commit('updateDocSaved', docSaved);
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
                logDebug(`Added ${querySnapshot.size} docs`);
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
