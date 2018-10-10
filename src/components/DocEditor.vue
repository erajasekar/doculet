<template>
    <div class="editor-container" id="editor">

        <vue-headful
                :title="htmlTitle"
                :description="htmlDescription"
                :keywords="keywords"
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
        @Action('updateDoc') private updateDoc: any;
        @Action('updateDocSaved') private updateDocSaved: any;
        @Action('updateDocContent') private updateDocContent: any;
        @Action('addToMyDocs') private addToMyDocs: any;

        private dbService!: FireStoreService;

        private gistId: string = this.gistId;

        private mounted() {
            this.dbService = new FireStoreService();
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

                this.updateDoc({
                    docName: gistFile.fileName, 
                    docId: gistId, 
                    docOwnerId: gistFile.ownerId,
                    publishLocation: null,
                    });
                this.update(gistFile.content);
            });
        }

       /* TODO REMOVE private saveDocInDB(gistId: string, filename: string) {
            if (this.user) {
                const existing = this.addToMyDocs({docId: gistId, docName: filename});
                if (!existing) {
                    this.updateDocSaved(true);
                    this.dbService.saveDoc(this.user.email,
                        {
                            docId: gistId,
                            docName: filename,
                            docOwnerId: this.docOwnerId,
                        });
                }
            }
        }*/
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/css/highlightjs/idea.css"
    @import "../assets/css/colony.css"
    borderColor = #e9ecef
    monospaceFont = 'Share Tech Mono', monospace;

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

    div.ace_content
        padding-top  50px

</style>
