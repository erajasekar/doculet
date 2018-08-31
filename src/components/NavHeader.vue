<template>

    <b-navbar toggleable="md" type="dark" variant="info" class="navbar-custom"> <!--TODO navbar-custom not used -->

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">

            <b>DOCULET</b>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>

                <div>
                    <b-input-group prepend="Import">
                        <!-- <b-input-group-prepend>
                             <b-btn  variant="light"><icon name="link"></icon></b-btn>
                         </b-input-group-prepend>-->

                        <b-form-input type="url" placeholder="GitHub Gist Id or URL" v-model="importUrl"
                                      @keyup.enter.native="importGist"></b-form-input>

                        <b-input-group-append>
                            <b-btn @click="importGist" v-b-tooltip.hover title="Import from GitHub">
                                <icon name="link"></icon>
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </div>

            </b-navbar-nav>

            <b-navbar-nav>

                <b-btn to="/gist/bc5886868012a678eed572c4aa19a2b8" variant="info" v-b-tooltip.hover
                       title="New Document">
                    <icon name="file-alt"></icon>
                </b-btn>

                <b-dropdown variant="info">
                    <template slot="button-content">
                        <icon name="save"></icon>
                    </template>
                    <b-dropdown-item @click="saveGist">
                        <icon name="brands/github-square"></icon>
                        Save to Github
                    </b-dropdown-item>
                </b-dropdown>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <div v-if="userIsAuthenticated">
                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <b-img rounded="circle" width="30" height="30" :src="user.photoUrl" fluid
                                   alt="Profile pic"></b-img>
                        </template>
                        <b-dropdown-header>{{ user.name }}</b-dropdown-header>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>

                </div>

                <div v-else>
                    <b-nav-item active @click="signUserInGithub" v-b-tooltip.hover title="Login using Github">Login
                    </b-nav-item>
                </div>

                <b-nav-item right>
                    <router-link to="/about">About</router-link>
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import ghs, {default as GitHubService} from '../services/GitHubService';
    import Constants from '../utils/constants';
    import * as User from '../store/modules/user';
    import {db} from '../main';

    import {
        Getter,
        Action,
    } from 'vuex-class';

    const gitService = new GitHubService();

    @Component
    export default class NavHeader extends Vue {

        @Getter('user') private user!: User.UserType;

        @Getter('docName') private docName!: string;
        @Getter('docId') private docId!: string;
        @Getter('content') private content!: string;
        @Action('updateDocId') private updateDocId: any;

        @Action('signUserInGithub') private signUserInGithub: any;
        @Action('logout') private logout: any;

        private doculets!: firebase.firestore.CollectionReference;

        private importUrl: string = '';

        private importGist() {

            const gistId = ghs.parseUrl(this.importUrl);

            if (gistId != null) {
                this.$router.push('/gist/' + gistId);
            }

        }

        private mounted() {
            this.doculets = db.collection('doculets'); // TODO CONSTANTS


            /*  doculets.get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      console.log(`${doc.id} => ${doc.data()}`);
                  });
              });
              console.log(doculets);

              doculets.doc('36euBUZbUhGdIf2EUOrl').set({name :'update name' , id: 'updated id'});*/
        }

        private saveGist() {

            console.log("Raja " + this.docId);

            if (this.user && this.docName) {
                const results = this.doculets
                    .where('userId', '==', this.user.email)
                    .where('name', '==', this.docName)
                    .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const gistId = doc.data().id;
                        this.updateDocId(gistId);
                        const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
                        if (token) {
                            gitService.updateGist(token, gistId, this.docName, this.content).then((newGist: any) => {
                                console.log('Gist updated');
                            });
                        }
                        console.log(doc.data());
                    });
                });
            }
           /* const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
            if (token) {
                gitService.saveGist(token, this.docName, this.content)
                    .then((newGist: any) => {
                        // Save GIST TO firebase.
                        const gistId = newGist.id;
                        if (this.user) {
                            this.doculets.add({
                                name: this.docName,
                                id: newGist.id,
                                userId: this.user.email,
                            }).then((docRef) => {
                                console.log('Document written with ID: ', docRef.id);
                            }).catch((error) => {
                                console.error('Error adding document: ', error);
                            });
                        } else {
                            // TODO should redirect to login
                        }

                    });
            } else {
                // TODO should redirect to login
            }*/

        }

        // TODO refreshing page clears user store, need to use local store.
        get userIsAuthenticated() {
            // TODO Should also check for expiration of FB accessToken
            return this.user != null &&
                this.user !== undefined &&
                localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
        }

    }
</script>

<style scoped>

</style>