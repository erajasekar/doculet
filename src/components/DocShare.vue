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
                        <b-form-input id="urlText" type="url" :value="publishLocation" readonly></b-form-input>
                        <b-input-group-append>
                            <b-btn v-b-tooltip.hover 
                                    title="Copy to clipboard" v-clipboard:copy="publishLocation">
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
        <b-jumbotron id="preview-container" >
            <template slot="header">
                Preview
                <span>
                    <b-btn variant="default" @click="reloadIframe" 
                            title="Reload iframe">
                            <icon color="black" name="redo-alt"></icon>
                    </b-btn>
                </span>
            </template>
            <div class="responsive-iframe" v-html="iframeHtml"></div>
        </b-jumbotron>
        <bottom-footer></bottom-footer>
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
    import BottomFooter from '@/components/BottomFooter.vue';

    @Component({
        components: {
            BottomFooter,
        },
        props: {
            docId: String,
        },
    })
    export default class DocShare extends Vue {

        @Getter('publishLocation') private publishLocation!: string;
        @Action('updateDocId') private updateDocId: any;
        @Action('updatePublishLocation') private updatePublishLocation: any;
        @Action('updateDocEdited') private updateDocEdited: any;
        private htmlDescription = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;
        private docId: string = this.docId;
        private iframeElement: HTMLIFrameElement | null = null;

        private mounted() {
            this.loadDoc(this.docId, '');
            window.addEventListener('message', this.receiveMessage, false);
            this.iframeElement = document.getElementById(Constants.PREVIEW_IFRAME_ID) as HTMLIFrameElement;
        }

        get htmlTitle() {
            // TODO if I make docName value to set correctly for share, update title too
            return 'Doculet Share';
        }

        @Watch('docId')
        private loadDoc(docId: string, oldValue: string) {

            logDebug(`DocId to share ${docId}, oldValue: ${oldValue} , docId in store ${this.docId}`);
            this.updateDocId(docId);
            this.updateDocEdited(false);
           // this.updatePublishLocation('http://localhost:8080/embed/twocode.html');
            if (!this.publishLocation) {
                dbService.getPublishLocation(docId).then( (location: string) => {
                    this.updatePublishLocation(location);
                });
            }
        }

        get iframeHtml() {
            return createIframeHtml(this.publishLocation);
        }
        private reloadIframe() {
            if (this.iframeElement) {
                this.iframeElement.src += '';
            }
        }

        private receiveMessage(event: any) {
            if (this.iframeElement) {
                const data = event.data;
                if (data && typeof data === 'string' && data.includes('iframe.resize')) {
                    const jsonData = JSON.parse(data);
                    if (jsonData.context === 'iframe.resize') {
                        this.iframeElement.height = jsonData.height + 20;
                        console.log("Set iframe new ", this.iframeElement.height , this.iframeElement.width);
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    @import '../assets/scss/share.scss';

</style>
