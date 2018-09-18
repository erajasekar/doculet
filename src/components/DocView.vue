<template>
    <div >
        <div class="view-pane" v-highlightjs="compiledHtml"/>
    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {AsciiDoc} from '../asciidoc';
    import ghs from '../services/GitHubService';
    import {
        Getter,
        Action,
    } from 'vuex-class';
    import {DoculetDoc} from '../store/modules/doculet';
    import {FireStoreService} from '../services/FireStoreService';
    import * as User from '../store/modules/user';
    import {logWarn, logInfo} from '../utils/logger';
    import Constants from '@/utils/constants';
    import {asciiDoc} from '../main';

    @Component({
        props: {
            gistId: String,
        },
    })
    export default class DocView extends Vue {

        private gistId: string = this.gistId;
        private content: string = 'Loading...';

        private mounted() {
            this.loadGist(this.gistId, '');
        }

        @Watch('gistId')
        private loadGist(gistId: string, oldValue: string) {

            logInfo(`New gistId ${gistId} , Old value : ${oldValue}`);

            ghs.importGist(gistId).then((gistFile) => {
                this.content = gistFile.content;
            });
            // TODO: content doesn't refresh if we import same gist again.
          /*  ghs.importGist(gistId).then((gistFile) => {
                const language = gistFile.language.toLowerCase();
                let content;
                let filename;
                if (ghs.isAsciiDoc(language)) {
                    content = gistFile.content;
                    filename = gistFile.filename;

                    if (gistId !== Constants.NEW_DOC_GIST_ID && gistId !== Constants.GETTING_STARTED_DOC_GIST_ID) {
                        this.saveDocInDB(gistId, filename);
                    }
                } else {
                    content = ghs.enrichSourceType(gistFile.content, language);
                    filename = ghs.updateExtenstionToAsciiDoc(gistFile.filename);
                }
                this.updateDocName(filename);
                this.update(content);
                this.updateDocId(gistId);
            }).catch((error) => {
                this.updateDocName('Not Found.adoc');
                this.update(this.createErrorMessage(gistId, error.message));
            });*/
        }

        get compiledHtml() {
            // TODO add file name as title
            return asciiDoc.convert(this.content);
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/css/highlightjs/idea.css"
    @import "../assets/css/colony.css"
   
    .view-pane
        height 100%
        width 100%
        
</style>
