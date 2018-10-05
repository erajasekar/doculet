<template>
    <div class="share-pane">
        <vue-headful
                :title="htmlTitle"
                :description="htmlDescription"
                :keywords="keywords"
        />
        <h2>Share links</h2>
        <div>
            {{shareUrl}}
        </div>
        <div>
            {{iframeHtml}}
        </div>
        <h2>Preview of your embed</h2>
        <div v-html="iframeHtml"></div>
    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {logDebug, logInfo} from '../utils/logger';
    import Constants from '../utils/constants';
    import {dbService} from '../services/FireStoreService';
    import {createIframeHtml} from '../utils/SharePreview'

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

            dbService.getPublishLocation(docId).then( (location: string) => {
                console.log(location);
                this.publishLocation = location;
            });

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
