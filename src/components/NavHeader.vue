<template>

    <b-navbar toggleable="md" type="dark" variant="info" class="navbar-custom"> <!--TODO navbar-custom not used -->

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <div><button class="toggle-button"><icon :name="menuIconName" scale="2" color="black"></icon></button></div>

        <b-navbar-brand to="/">

            <b>DOCULET</b>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>

                <div>
                    <b-input-group>
                         <b-input-group-prepend>
                             <b-btn  variant="light"><icon name="link"></icon></b-btn>
                         </b-input-group-prepend>

                        <b-form-input type="url" placeholder="GitHub Gist Id or URL" v-model="importUrl"
                                      @keyup.enter.native="importGist"></b-form-input>

                        <b-input-group-append>
                            <b-btn @click="importGist" v-b-tooltip.hover 
                                    title="Import from GitHub">
                                <icon name="folder-open"></icon>
                            </b-btn>
                        </b-input-group-append>

                    </b-input-group>
                </div>

            </b-navbar-nav>

            <b-navbar-nav>

                <b-btn @click="openNewDocument" variant="info" v-b-tooltip.hover
                       title="New Document">
                    <icon name="file-alt"></icon>
                </b-btn>

                <b-btn @click="saveDoculet" variant="info" v-b-tooltip.hover
                        :disabled="isDocActionsDisabled"
                        title="Save to Github">
                    <icon name="save"></icon>
                </b-btn>

                <!-- TODO add confirmation before delete -->
                <b-btn @click="deleteDoculet" variant="info" v-b-tooltip.hover
                        :disabled="isDocActionsDisabled"
                        title="Delete Document">
                    <icon name="trash"></icon>
                </b-btn>

            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <div v-if="isUserAuthenticated">
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
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import ghs, {default as GitHubService} from '../services/GitHubService';
    import Constants from '../utils/constants';
    import * as User from '../store/modules/user';

    import {FireStoreService} from '../services/FireStoreService';
    import {logInfo, logError} from '../utils/logger';
    import * as auth from '../utils/auth';

    import {
        Getter,
        Action,
    } from 'vuex-class';
    const gitService = new GitHubService();

    @Component({
        props: {
            isMenuOpen: Boolean,
        },
    })
    export default class NavHeader extends Vue {

        @Getter('user') private user!: User.UserType;

        @Getter('docName') private docName!: string;
        @Getter('docId') private docId!: string;
        @Getter('content') private content!: string;
        @Action('updateDocId') private updateDocId: any;
        @Action('addToMyDocs') private addToMyDocs: any;
        @Action('deleteFromMyDocs') private deleteFromMyDocs: any;
        @Action('signUserInGithub') private signUserInGithub: any;
        @Action('logout') private logout: any;

        private dbService!: FireStoreService;

        private importUrl: string = '';
        private menuIconName: string = 'bars';


        @Watch('isMenuOpen')
        private updateMenuIcon(isMenuOpen: boolean, oldValue: boolean) {
            if (isMenuOpen) {
                this.menuIconName = 'times';
            } else {
                this.menuIconName = 'bars';
            }
        }

        private importGist() {

            const gistId = ghs.parseUrl(this.importUrl);
            // TODO if doc is adoc, we should automatically save it to firestore.
            if (gistId != null) {
                this.openDocument(gistId);
            }
        }

        private mounted() {
            this.dbService = new FireStoreService();
        }

        private saveDoculet() {
            const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
            if (this.user && this.docName && token) {
                if (!this.docId) {
                    this.dbService.findDocIdByUserAndName(this.user.email, this.docName)
                        .then((querySnapshot) => {
                            if (querySnapshot.size > 0) {
                                this.updateExistingGistInDB(querySnapshot, token);
                            } else {
                                this.createGistAndAddToDB(token);
                            }
                        });
                } else {
                    gitService.updateGist(token, this.docId, this.docName, this.content);
                }
            } else {
                logError('User or docName or token is null');
            }
        }

        private deleteDoculet() {

            const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
            if (this.user && this.docName && token) {
                if (!this.docId) {
                    this.dbService.findDocIdByUserAndName(this.user.email, this.docName)
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                this.deleteGistAndFromDB(doc.id, token);
                            });
                        });
                } else {
                    this.deleteGistAndFromDB(this.docId, token);
                }
            } else {
                logError('User or docName or token is null');
            }
            this.openDocument(Constants.GETTING_STARTED_DOC_GIST_ID);
        }

        private openDocument(gistId: string) {
            this.$router.push(`/edit/${gistId}`);
        }

        private openNewDocument() {
            this.openDocument(Constants.NEW_DOC_GIST_ID);
        }

        private deleteGistAndFromDB(docId: string, token: string) {
            this.deleteFromMyDocs(docId);
            this.dbService.deleteDoc(docId);
            gitService.deleteGist(token, docId);

        }

        private updateExistingGistInDB(querySnapshot: firebase.firestore.QuerySnapshot, token: string) {
            querySnapshot.forEach((doc) => {
                const gistId = doc.id;
                this.updateDocId(gistId);
                logInfo(`Found gist in FireStore : ${gistId}`);
                gitService.updateGist(token, gistId, this.docName, this.content);
            });
        }

        private createGistAndAddToDB(token: string) {
            // Create gist and save in firestore.
            gitService.saveGist(token, this.docName, this.content)
                .then((newGist: any) => {
                    const gistId = newGist.id;
                    this.addToMyDocs({docId: gistId, docName: this.docName});
                    this.dbService.saveDoc(gistId, this.docName, this.user!!.email);
                });
        }

        get isUserAuthenticated() {
            return auth.isAuthenticated(this.user);
        }

        get isDocActionsDisabled() {
            return !this.isUserAuthenticated || this.docName === null;
        }

    }
</script>

<style scoped>

</style>