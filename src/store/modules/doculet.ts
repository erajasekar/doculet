import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import Constants from '../../utils/constants';
import firebase from 'firebase';
import {FireStoreService, dbService} from '../../services/FireStoreService';
import {logDebug} from '../../utils/logger';

export interface DoculetDoc extends DoculetDocBase {
    content: string;
    docSaved: boolean;
    docEdited: boolean;
}

export interface DoculetDocBase extends DoculetFile {
    docOwnerId: string;
}

export interface DoculetFile {
    docName: string;
    docId: string;
    publishLocation: string | null;
}

const homeDoc = {
    docName: Constants.ON_LOAD_DOC_CONTENT,
    content: Constants.ON_LOAD_DOC_CONTENT,
    docId: Constants.ON_LOAD_DOC_CONTENT,
    docSaved: false,
    docEdited: false,
    docOwnerId: Constants.ON_LOAD_DOC_CONTENT,
    publishLocation: null,
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

    isDocSaved(state: State): boolean {
        return state.doc.docSaved;
    },

    isDocEdited(state: State): boolean {
        return state.doc.docEdited;
    },

    publishLocation(state: State): string | null {
        return state.doc.publishLocation;
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

    updatePublishLocation(state: State, location: string | null) {
        state.doc.publishLocation = location;
     },

    updateDocSaved(state: State, docSaved: boolean) {
        state.doc.docSaved = docSaved;
    },

    updateDocEdited(state: State, docEdited: boolean) {
        state.doc.docEdited = docEdited;
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

    updatePublishLocationInMyDocs(state: State, newDoc: DoculetFile) {
        state.myDocs.forEach( (doc, index) => {
            if (doc.docId === newDoc.docId) {
                doc.publishLocation = newDoc.publishLocation;
            }
        });
    },
} as MutationTree<State>;

const actions =  {
    updateDocName(store: ActionContext<State, any>, docName: string) {
        store.commit('updateDocName', docName);
        store.commit('updateDocSaved', false); // Whenever docName changes, reset docSaved.
        store.commit('updateDocEdited', true); // Whenever docName changed, updateDocEdited to true.
    },

    updateDocId(store: ActionContext<State, any>, docId: string) {
        store.commit('updateDocId', docId);
    },

    updateDocContent(store: ActionContext<State, any>, content: string) {
        store.commit('updateDocContent', content);
        store.commit('updateDocEdited', true); // Whenever content changed, updateDocEdited to true.
    },

    importDoc(store: ActionContext<State, any>, doc: DoculetDocBase) {
        store.commit('updateDocId', doc.docId);
        store.commit('updateDocName', doc.docName);
        store.commit('updateOwnerId', doc.docOwnerId);
        store.commit('updateDocSaved', false); // TODO if it creates problems, make it parameterize.
        store.commit('updateDocEdited', false); // this method is called during import, so set docEdited to false
    },

    updateDocSaved(store: ActionContext<State, any>, docSaved: boolean) {
        store.commit('updateDocSaved', docSaved);
        store.commit('updateDocEdited', !docSaved); // Whenever docSaved updated to true, update docEdited to false.
    },

    updateDocEdited(store: ActionContext<State, any>, docEdited: boolean) {
        store.commit('updateDocEdited', docEdited);
    },

    updatePublishLocation(store: ActionContext<State, any>, location: string | null) {
        store.commit('updatePublishLocation', location);
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

    publishDoc(store: ActionContext<State, any>, doc: DoculetFile) {
        const docLocation = doc.publishLocation;
        const docId = doc.docId;
        if (docLocation) {
            dbService.updatePublishLocation(docId, docLocation);
            store.commit('updatePublishLocation', docLocation);
            store.commit('updatePublishLocationInMyDocs', doc);
        }
    },

    loadMyDocs(store: ActionContext<State, firebase.User>, payload: firebase.User) {

        if (payload.email) {
            dbService.getMyDocs(payload.email).then((querySnapshot) => {
                logDebug(`Added ${querySnapshot.size} docs`);
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    store.commit('addToMyDocs', {
                        docId: doc.id,
                        docName: data.name,
                        publishLocation: data.publishLocation,
                    });
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
