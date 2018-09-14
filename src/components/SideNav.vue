<template>
    <nav id="menu">
        <div>
            <h4>Documents</h4>
        </div>
        <ul>
            <li v-for="doc in myDocs" :key="doc.docId"><a @click="openDocument(doc.docId)">{{doc.docName}}</a></li>
        </ul>
    </nav>
</template>

<script lang="ts">
    import {
        Getter,
        Action,
    } from 'vuex-class';
    import {Component, Vue} from 'vue-property-decorator';
    import {DoculetFile} from '../store/modules/doculet';
    import {FireStoreService} from '../services/FireStoreService';
    import {logInfo, logError} from '../utils/logger';

    @Component
    export default class SideNav extends Vue {
        @Getter('myDocs') private myDocs!: DoculetFile[];
        @Action('addToMyDocs') private addToMyDocs: any;

        private dbService!: FireStoreService;

        public mounted() {
            // todo think about moving this to doculet store.
            this.dbService = new FireStoreService();
            this.dbService.getMyDocs().then((querySnapshot) => {
                logInfo(`Added ${querySnapshot.size} docs`);
                querySnapshot.forEach((doc) => {
                    this.addToMyDocs({docId: doc.id, docName: doc.data().name});
                });
            });

        }

        public openDocument(docId: string) {
            // TODO if we switch doc after saving, it takes some time for content to refresh.
            this.$router.push(`/edit/${docId}`);
        }
    }
</script>

<style scoped lang="stylus">

    #menu
        padding-top 100px

    //TODO remove border at right to page

</style>