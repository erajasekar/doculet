import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';


export class State {
    public user: any; // todo
}

const getters =  {
    loggedUser(state: State): any {
        return state.user;
    },
} as GetterTree<State, any>;

const mutations =  {
    setUser(state: State, payload: any) {
        state.user = payload;
        console.log(state.user);
    },
} as MutationTree<State>;

const actions =  {
    signUserInGithub(store: ActionContext<State, any>) {

        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            //todo STORE TOKEN
            const token = result.credential;
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
