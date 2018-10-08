<template>
    <div class="share-pane">
        <vue-headful
                :title="htmlTitle"
                :description="htmlDescription"
                :keywords="keywords"
        />

        <b-jumbotron id="share-container" header="Share Options" >

            <b-container fluid class="bv-example-row">
                <b-row><b-col>
                        <b-input-group prepend="URL ">
                            <b-form-input type="url" :value="shareUrl" readonly></b-form-input>
                            <b-input-group-append>
                                <b-btn variant="info">Copy</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                </b-col></b-row>
                <b-row><b-col>
                    <b-input-group prepend="Embed ">
                        <b-form-input type="url" :value="iframeHtml" readonly></b-form-input>
                        <b-input-group-append>
                            <b-btn variant="info">Copy</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-col></b-row>
            </b-container>
        </b-jumbotron>
        <b-jumbotron id="preview-container" header="Preview" >
            <div v-html="iframeHtml"></div>
        </b-jumbotron>
        
    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {logDebug, logInfo} from '../utils/logger';
    import Constants from '../utils/constants';
    import {dbService} from '../services/FireStoreService';
    import {createIframeHtml} from '../utils/SharePreview';

    @Component({
        props: {
            docId: String,
        },
    })
    export default class DocShare extends Vue {

        private title: string = 'Doculet';
        private htmlDescription = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;
        private docId: string = this.docId;

        private publishLocation: string = '';

        private mounted() {
            this.loadDoc(this.docId, '');
        }

        get htmlTitle() {
            return this.title;
        }

        @Watch('docId')
        private loadDoc(docId: string, oldValue: string) {

            logDebug(`DocId to share ${docId}`);

            /*dbService.getPublishLocation(docId).then( (location: string) => {
                console.log(location);
                this.publishLocation = location;
            });*/
            // TODO
            this.publishLocation = 'http://localhost:8080/embed/index.html';
        }

        get shareUrl() {
            return this.publishLocation;
        }
        get iframeHtml() {
            return createIframeHtml(this.publishLocation);
        }



    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    @import '../assets/scss/share.scss';

</style>
