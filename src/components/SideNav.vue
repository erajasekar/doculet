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
    import {DoculetFile} from '../store/modules/doculet'; // todo format in intellij

    @Component
    export default class SideNav extends Vue {
        @Getter('myDocs') private myDocs!: DoculetFile[];

        public mounted() {
            console.log('Side nav mounted');
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