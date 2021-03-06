<template>
    <div class="editor-container" id="editor">

        <vue-headful
                :title="htmlTitle"
                :description="htmlDescription"
                :keywords="keywords"
                :url="canonicalUrl"
        />

        <div class="editor-header">
           <b-form-input size="lg" id="doc-name-input"
                          type="text" :value="docName" @change="updateDocName">
           </b-form-input>
        </div>
        <div class="editor-main">
            <editor class="editor-pane" :value="content" @input="update" @init="editorInit" lang="asciidoc" theme="chrome" width="50%"></editor>
            <!-- TODO load home on delete works greate with textarea but not with editor -->
            <!-- TODO remove <textarea class="editor-pane" :value="content" @input="update" width="50%"></textarea> -->
            
            <div class="preview-pane" v-highlightjs="compiledHtml"/>
        </div>
        <bottom-footer></bottom-footer>

    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {debounce} from 'typescript-debounce-decorator';
    import {asciiDoc} from '../asciidoc';
    import editor from 'vue2-ace-editor';
    import {gitHubService} from '../services/GitHubService';
    import {
        Getter,
        Action,
    } from 'vuex-class';
    import {FireStoreService} from '../services/FireStoreService';
    import * as User from '../store/modules/user';
    import {logWarn, logDebug} from '../utils/logger';
    import Constants from '@/utils/constants';
    import {DoculetDocBase} from '../store/modules/doculet';
    import BottomFooter from '@/components/BottomFooter.vue';
    import * as auth from '../utils/auth';

    @Component({
        components: {
            editor,
            BottomFooter,
        },
        props: {
            gistId: String,
        },
    })
    export default class DocEditor extends Vue {

        private htmlDescription = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;

        @Getter('user') private user!: User.UserType;

        @Getter('docName') private docName!: string;
        @Getter('docOwnerId') private docOwnerId!: string;

        @Getter('content') private content!: string;

        @Action('updateDocName') private updateDocName: any;
        @Action('importDoc') private importDoc: any;
        @Action('updateDocContent') private updateDocContent: any;
        @Action('addToMyDocs') private addToMyDocs: any;

        private dbService!: FireStoreService;

        private gistId: string = this.gistId;

        private mounted() {
            // Don't load firebase for guide path to make spa-pre-render plugin to work.
            if (!auth.isGuidePage(this.$route.path)) {
                this.dbService = new FireStoreService();
            }
            if (this.gistId) {
                this.importGist(this.gistId, '');
            }
        }

        get compiledHtml() {
            const result = asciiDoc.convert(this.content);
            return result;
        }

        get htmlTitle() {
            return `Doculet Editor - ${this.docName}`;
        }

        get canonicalUrl() {
            const path = this.$route.path;
            const url = `${Constants.DOCULET_URL}${path.substring(1, path.length)}`;
            return url;
        }

        private editorInit() {
            require('brace/ext/language_tools'); // language extension prerequsite...
            require('brace/mode/asciidoc') ;   // language
            require('brace/theme/chrome');
        }

        @debounce(10, {leading: true})
        private update(e: string) {
            this.updateDocContent(e);
        }

        @Watch('gistId')
        private importGist(gistId: string, oldValue: string) {

            logDebug(`New gistId ${gistId} , Old value : ${oldValue}`);

            if (!gistId) {
                gistId = Constants.GETTING_STARTED_DOC_GIST_ID;
            }
            // TODO: content doesn't refresh if we import same gist again. because doesn't trigger.

            gitHubService.importGist(gistId).then((gistFile) => {
                // Content has to be updated before imported to correctly set docEdited flag
                this.update(gistFile.content);
                this.importDoc({
                    docName: gistFile.fileName,
                    docId: gistId,
                    docOwnerId: gistFile.ownerId,
                    });
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/css/highlightjs/idea.css"
    @import "../assets/css/colony.css"
    borderColor = #e9ecef
    monospaceFont = 'Share Tech Mono', monospace;
    previewBackgroundColor = #F7F7F7;

    #editor 
        height 100%
        width 100%

    .editor-container
        display: flex
        flex-direction: column
        overflow: hidden
        height: 100%
        border-right 5px solid black //todo

        .editor-header
            border-bottom 1px solid borderColor

            input
                border none
                font-family: monospaceFont;
                font-size: x-large 
         
        .editor-main
            display flex
            flex-direction : row
            flex: 1
            width: 100%
            height: 100%
     
        .editor-pane
            flex: 0 0 auto
            width: 50%
            height: 100%
            border-right 3px solid borderColor

            .ace_content
                border 5px solid black
                padding-top  50px

        .preview-pane
            flex: 0 0 auto;
            width: 50%;
            padding: 10px;
            overflow-y: auto
            word-break: break-word
            color :black
            background-color :previewBackgroundColor 

    div.ace_content
        padding-top  50px

</style>
