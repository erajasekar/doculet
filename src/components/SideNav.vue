<template>
    <nav id="menu">

        <ul v-if="isUserAuthenticated">
            <h3>Documents</h3>
            <li v-for="doc in myDocs" :key="doc.docId">
                <a @click="openDocument(doc)" :class="{ active: isSelected(doc.docId) }">{{doc.docName}}</a>
            </li>
        </ul>
      <!--  <div v-else> -->
            <b-alert  v-else variant="warning" show>Login to see save, publish and share your documents.</b-alert>
       <!-- </div> -->
    </nav>
</template>

<script lang="ts">
    import {Getter, Action} from 'vuex-class';
    import {Component, Vue} from 'vue-property-decorator';
    import {DoculetFile} from '../store/modules/doculet';
    import * as User from '../store/modules/user';
    import * as auth from '../utils/auth';

    @Component
    export default class SideNav extends Vue {

        @Getter('user') private user!: User.UserType;
        @Getter('docId') private docId!: string;
        @Getter('myDocs') private myDocs!: DoculetFile[];
        @Action('updatePublishLocation') private updatePublishLocation: any;

        public openDocument(doc: DoculetFile) {
            // TODO test in office if we switch doc after saving, it takes some time for content to refresh.
            if (doc.publishLocation) {
                this.updatePublishLocation(doc.publishLocation);
                this.$router.push(`/share/${doc.docId}`);
            } else {
                this.updatePublishLocation(null);
                this.$router.push(`/edit/${doc.docId}`);
            }
        }

        get isUserAuthenticated() {
            return auth.isAuthenticated(this.user);
        }

        public isSelected(docId: string): boolean {
            if (this.docId && this.docId === docId) {
                return true;
            } else {
                return false;
            }
        }
    }
</script>

<style scoped lang="stylus">

    // TODO remove border at right to page

</style>