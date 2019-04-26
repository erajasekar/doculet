import {GetterTree, MutationTree, ActionTree, ActionContext} from 'vuex';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Constants from '../../utils/constants';

interface IUser {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
}

export type UserType = IUser | null;

export class State {
    public user: UserType = null;
}

const getters =  {
    user(state: State): UserType {
        return state.user;
    },
} as GetterTree<State, UserType>;

const mutations =  {
    setUser(state: State, payload: UserType) {
        state.user = payload;
    },
} as MutationTree<State>;

const actions =  {
    signUserInGithub(store: ActionContext<State, UserType>) {

        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('gist');
        firebase.auth().signInWithPopup(provider).then((result) => {

            // Store token in local storage
            if (result.credential && result.credential.hasOwnProperty(Constants.ACCESS_TOKEN_PROPERTY)) {

                const token  =  (result.credential as any)[Constants.ACCESS_TOKEN_PROPERTY];
                localStorage.setItem(Constants.ACCESS_TOKEN_PROPERTY, token);
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
    autoSignIn(store: ActionContext<State, firebase.User>, payload: firebase.User) {
        store.commit('setUser', {
            id: payload.uid,
            name: payload.displayName,
            email: payload.email,
            photoUrl: payload.photoURL,
        });
        store.dispatch('loadMyDocs', payload);
    },
    logout(store: ActionContext<State, any>) {

        firebase.auth().signOut().then(() => {
            store.commit('setUser', null);
            store.commit('deleteAllMyDocs');
        });
    },
} as ActionTree<State, any>;

export const userStore = {
    state: new State(),
    getters,
    mutations,
    actions,
};
