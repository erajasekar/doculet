<template>

    <b-navbar toggleable="md" variant="info" class="navbar-custom"> <!--TODO navbar-custom not used -->
 
        <div><button class="toggle-button"><icon :name="menuIconName" scale="2" :color="iconColor"></icon></button></div>

        <b-navbar-brand to="/">

          <!--  <b-img  width="200" height="30" src="https://www.dropbox.com/s/63hwbzo196p0vlh/Screen%20Shot%202018-09-19%20at%2010.50.47%20PM.png?raw=1" fluid alt="Doculet logo"></b-img> -->
          <!--  <b-img  width="200" height="50" class="logo" src="https://www.dropbox.com/s/6wwkngdis574sss/doculet-logo-transparent.png?raw=1" fluid alt="Doculet logo"></b-img> -->
            <b-img  width="200" height="50" class="logo" src="/static/doculet-logo1.png" fluid alt="Doculet logo"></b-img>
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">
            <b-button-toolbar aria-label="Toolbar with button groups and input groups">
                <b-navbar-nav>
                    <div>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-btn variant="light" size="sm"><icon name="link"></icon></b-btn>
                            </b-input-group-prepend>

                            <b-form-input size="sm" type="url" placeholder="GitHub Gist Id or URL" v-model="importUrl"
                                        @keyup.enter.native="importGist"></b-form-input>

                            <b-input-group-append>
                                <b-btn size="sm" @click="importGist" v-b-tooltip.hover 
                                        title="Import from GitHub">
                                    <icon name="folder-open"></icon>
                                </b-btn>
                            </b-input-group-append>

                        </b-input-group>
                    </div>
                </b-navbar-nav>
                <b-navbar-nav>
                     
                    <b-button-group size="sm" class="mx-1"> 
                        <b-btn @click="openNewDocument" variant="secondary" v-b-tooltip.hover
                            title="New Document" size="sm">
                            <icon name="file-alt" color="iconColor"></icon> New
                        </b-btn>
                        <b-btn @click="saveDoculet" variant="secondary" v-b-tooltip.hover
                                :disabled="isSaveActionDisabled"
                                title="Save to Github" size="sm">
                            <icon name="save" color="iconColor"></icon> Save
                        </b-btn>

                        <b-btn @click="editDoculet" variant="secondary" v-b-tooltip.hover
                            title="Edit Document" :disabled="isEditActionDisabled" size="sm"> 
                            <icon name="pencil-alt" color="iconColor"></icon> Edit
                        </b-btn>
                    </b-button-group>

                    <b-button-group size="sm" class="mx-1">
                        <b-btn @click="publishDoculet" variant="secondary" v-b-tooltip.hover
                            title="Publish Document" :disabled="isPublishActionDisabled" size="sm"> 
                            <icon name="share-square" color="iconColor"></icon> Publish
                        </b-btn>

                        <b-btn @click="shareDoculet" variant="secondary" v-b-tooltip.hover
                            title="Share Document" :disabled="isShareActionDisabled" size="sm">
                            <icon name="share-alt" color="iconColor"></icon> Share
                        </b-btn>
                    </b-button-group>

                    <!-- TODO add confirmation before delete -->
                    <b-btn @click="deleteDoculet" variant="danger" v-b-tooltip.hover
                            :disabled="isDocActionsDisabled"
                            title="Delete Document" size="sm">
                        <icon name="trash" color="iconColor"></icon> Delete
                    </b-btn>

                </b-navbar-nav>
            </b-button-toolbar>

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
                    <b-btn @click="signUserInGithub" v-b-tooltip.hover
                        title="Login using Github" size="sm"  class="login-btn">
                        <icon name="brands/github-square"></icon> Login
                    </b-btn>
                </div>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {gitHubService} from '../services/GitHubService';
    import {s3Service} from '../services/AwsS3Service';
    import {asciiDoc} from '../asciidoc';
    import Constants from '../utils/constants';
    import * as User from '../store/modules/user';

    import {FireStoreService} from '../services/FireStoreService';
    import {logDebug, logError} from '../utils/logger';
    import * as auth from '../utils/auth';
    import {applyHighlightJs, enrichHtml} from '../utils/HtmlEnricher';

    import {
        Getter,
        Action,
    } from 'vuex-class';
    import {staticHostingUrl} from '../config/config';


    @Component({
        props: {
            isMenuOpen: Boolean,
        },
    })
    export default class NavHeader extends Vue {

        @Getter('user') private user!: User.UserType;

        @Getter('docName') private docName!: string;
        @Getter('docOwnerId') private docOwnerId!: string;
        @Getter('docId') private docId!: string;
        @Getter('isDocSaved') private isDocSaved!: boolean;
        @Getter('isDocEdited') private isDocEdited!: boolean;
        @Getter('publishLocation') private publishLocation!: string;
        @Getter('content') private content!: string;
        @Action('updateDocSaved') private updateDocSaved: any;
        @Action('publishDoc') private publishDoc: any;
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

            const gistId = gitHubService.parseUrl(this.importUrl);
            // TODO if doc is adoc, we should automatically save it to firestore.
            if (gistId != null) {
                this.openDocument(gistId);
            }
        }

        private mounted() {
            this.dbService = new FireStoreService();
        }

        get iconColor() {
            return Constants.MENU_ICON_COLOR;
        }

        private saveDoculet() {
            const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
            if (this.user && this.docName && token) {
                if (!this.isDocSaved) {
                    this.dbService.findDocIdByUserAndName(this.user.email, this.docName)
                        .then((querySnapshot) => {
                            if (querySnapshot.size > 0) {
                                this.updateExistingGistInDB(querySnapshot, token);
                            } else {
                                this.createGistAndAddToDB(token);
                            }
                        });
                } else {
                    gitHubService.updateGist(token, this.docId, this.docName, this.content);
                }
            } else {
                logError('User or docName or token is null');
            }
        }

        private editDoculet() {
            if (this.docId) {
                this.openDocument(this.docId);
            }
        }

        private deleteDoculet() {
            const token = localStorage.getItem(Constants.ACCESS_TOKEN_PROPERTY);
            if (this.user && this.docName && token) {
                this.deleteGistAndFromDB(this.docId, token);
            } else {
                logError('User or docName or token is null');
            }
        }

        private openDocument(gistId: string) {
            this.$router.push(`/edit/${gistId}`);
        }

        private openNewDocument() {
            this.openDocument(Constants.NEW_DOC_GIST_ID);
        }

        private publishDoculet() {

            const bucketKey = `doc/${this.docId}/index.html`;
            const docLocation = `${staticHostingUrl}${bucketKey}`;

            gitHubService.importGist(this.docId).then((gistFile) => {

                const html = asciiDoc.convert(gistFile.content);
                const enriched = enrichHtml(html, {docLocation});
                s3Service.publishDoc(bucketKey, enriched);
                this.publishDoc({
                    docId: this.docId,
                    docName: this.docName,
                    publishLocation: docLocation,
                });
                this.shareDoculet();
            });
        }

        private shareDoculet() {
            if (this.docId) {
                this.$router.push(`/share/${this.docId}`);
            }
        }

        private deleteGistAndFromDB(docId: string, token: string) {
            this.deleteFromMyDocs(docId);
            gitHubService.deleteGist(token, docId);
            this.dbService.getPublishLocation(this.docId).then( (location) => {
                this.dbService.deleteDoc(docId);
                if (location) {
                    logDebug(`Deleting published doc: ${location}`);
                    s3Service.deleteDoc(location);
                }
                this.openDocument(Constants.GETTING_STARTED_DOC_GIST_ID);
            });
        }

        private updateExistingGistInDB(querySnapshot: firebase.firestore.QuerySnapshot, token: string) {

            const gistId = querySnapshot.docs[0].id; // We limit result to 1.
            const ownerId = querySnapshot.docs[0].data().ownerId;
            logDebug(`Found gist in FireStore : ${gistId} with ownerId : ${ownerId};
            Imported gist ownerId: ${this.docOwnerId}` );

            gitHubService.updateGist(token, gistId, this.docName, this.content).then( (newGist: any) => {
                this.updateDocSaved(true);
                this.openDocument(gistId);
            });

        }

        private createGistAndAddToDB(token: string) {

            // Create gist and save in firestore.
            gitHubService.saveGist(token, this.docName, this.content).then((newGist: any) => {
                    const gistId = newGist.id;
                    this.dbService.saveDoc(this.user!!.email, {
                        docId: gistId,
                        docName: this.docName,
                        docOwnerId: String(newGist.owner.id),
                        publishLocation: null,
                    });
                    this.addToMyDocs({docId: gistId, docName: this.docName});
                    this.updateDocSaved(true);
                    this.openDocument(gistId);
                });
        }

        get isUserAuthenticated() {
            return auth.isAuthenticated(this.user);
        }

        get isDocActionsDisabled() {
            return !this.isUserAuthenticated || this.docName === null || this.docId === Constants.ON_LOAD_DOC_CONTENT;
        }

        get isShareActionDisabled() {
            return this.isDocActionsDisabled || !this.publishLocation || auth.isSharePage(this.$route.path);
        }

        get isEditActionDisabled() {
            return this.isDocActionsDisabled || auth.isEditPage(this.$route.path);
        }

        get isSaveActionDisabled() {
            return this.isDocActionsDisabled || !this.isDocEdited;
        }

        get isPublishActionDisabled() {
            return this.isDocActionsDisabled || this.isDocEdited;
        }
    }
</script>

<style scoped lang="stylus">
    .logo
        padding-left 30px;
</style>