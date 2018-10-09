<template>
    <div class="share-pane">
        <vue-headful
                :title="htmlTitle"
                :description="htmlDescription"
                :keywords="keywords"
        />

        <b-jumbotron id="share-container" header="Share Options" >

            <div>
                <b-form-group horizontal :label-cols="1" breakpoint="md" label="URL" label-for="urlText">
                    <b-input-group>
                        <b-input-group-prepend>
                             <b-btn><icon name="link"></icon></b-btn>
                         </b-input-group-prepend>
                        <b-form-input id="urlText" type="url" :value="shareUrl" readonly></b-form-input>
                        <b-input-group-append>
                            <b-btn v-b-tooltip.hover 
                                    title="Copy to clipboard" v-clipboard:copy="shareUrl">
                                    <icon name="clone"></icon>
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                
            </div>
            <div>
                <b-form-group horizontal :label-cols="1" breakpoint="md" label="Embed" label-for="embedText">
                    <b-input-group>
                        <b-input-group-prepend>
                                <b-btn><icon name="code"></icon></b-btn>
                            </b-input-group-prepend>
                        <b-form-input id="embedText" type="url" :value="iframeHtml" readonly></b-form-input>
                        <b-input-group-append>
                            <b-btn v-b-tooltip.hover 
                                    title="Copy to clipboard" v-clipboard:copy="iframeHtml">
                                    <icon name="clone"></icon>
                            </b-btn>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
                
            </div>
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
    import { Getter, Action } from 'vuex-class';

    @Component({
        props: {
            docId: String,
        },
    })
    export default class DocShare extends Vue {

        @Getter('publishLocation') private publishLocation = '';
        @Action('updateDocId') private updateDocId: any;
        private title: string = 'Doculet';
        private htmlDescription = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;
        private docId: string = this.docId;

        private mounted() {
            this.loadDoc(this.docId, '');
        }

        get htmlTitle() {
            return this.title;
        }

        @Watch('docId')
        private loadDoc(docId: string, oldValue: string) {

            logDebug(`DocId to share ${docId}`);
            this.updateDocId(docId);

            if (!this.publishLocation){
                dbService.getPublishLocation(docId).then( (location: string) => {
                    console.log(location);
                    this.publishLocation = location;
                });
                // TODO
                //this.publishLocation = 'http://localhost:8080/embed/index.html';
            }
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