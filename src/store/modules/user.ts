import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';



export class State {
    public user: any = null; // todo
}

const getters =  {
    user(state: State): any {
        return state.user;
    },
} as GetterTree<State, any>;

const mutations =  {
    setUser(state: State, payload: any) {
        state.user = payload;
    },
} as MutationTree<State>;

const actions =  {
    signUserInGithub(store: ActionContext<State, any>) {

        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {


            const ACCESS_TOKEN_PROPERTY = 'accessToken'; // Move to separate Constants file.

            // Store token in local storage
            if (result.credential && result.credential.hasOwnProperty(ACCESS_TOKEN_PROPERTY)) {

                const token  =  (result.credential as any)[ACCESS_TOKEN_PROPERTY];
                localStorage.setItem(ACCESS_TOKEN_PROPERTY, token);
            }

            const user = result.user;
            const newUser = {
                id: user!.uid,
                name: user!.displayName,
                email: user!.email,
                photoUrl: user!.photoURL,
            };
            store.commit('setUser', newUser);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });


    },
    autoSignIn(store: ActionContext<State, any>, payload: any) {

        store.commit('setUser', {
            id: payload.uid,
            name: payload.displayName,
            email: payload.email,
            photoUrl: payload.photoURL,
        });
    },
    logout(store: ActionContext<State, any>) {

        firebase.auth().signOut().then(() => {
            store.commit('setUser', null);
        });
    },
} as ActionTree<State, any>;

export const userStore = {
    state: new State(),
    getters,
    mutations,
    actions,
};
