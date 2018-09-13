<template>
    <div class="editor-container" id="editor">

        <div class="editor-header">
           <b-form-input id="doc-name-input"
                          type="text" :value="docName" @change="updateDocName">
           </b-form-input>
        </div>
        <div class="editor-main">
            <editor class="editor-pane" :value="content" @input="update" @init="editorInit" lang="asciidoc" theme="chrome" width="50%"></editor>
            <!-- TODO load home on delete works greate with textarea but not with editor -->
            <!-- TODO remove <textarea class="editor-pane" :value="content" @input="update" width="50%"></textarea> -->

            <div class="preview-pane" v-highlightjs="compiledMarkdown"/>
        </div>


    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {debounce} from 'typescript-debounce-decorator';
    import {AsciiDoc} from '../asciidoc';
    import editor from 'vue2-ace-editor';
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

    const asciidoc = new AsciiDoc();

    @Component({
        components: {
            editor,
        },
        props: {
            gistId: String,
        },
    })
    export default class DocEditor extends Vue {

        @Getter('user') private user!: User.UserType;

        @Getter('docName') private docName!: string;

        @Getter('content') private content!: string;

        @Action('updateDocName') private updateDocName: any;
        @Action('updateDocContent') private updateDocContent: any;

        private dbService!: FireStoreService;

        private mounted() {
            this.dbService = new FireStoreService();
        }

        get compiledMarkdown() {
            const result = asciidoc.convert(this.content);
            return result;
        }

        private editorInit() {
            require('brace/ext/language_tools'); // language extension prerequsite...
            require('brace/mode/asciidoc') ;   // language
            require('brace/theme/chrome');
        }

        @debounce(100, {leading: true})
        private update(e: string) {
            this.updateDocContent(e);
        }

        @Watch('gistId')
        private importGist(gistId: string, oldValue: string) {

            logInfo(`New gistId ${gistId} , Old value : ${oldValue}`);
            // TODO: content doesn't refresh if we import same gist again.
            ghs.importGist(gistId).then((gistFile) => {
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
           }).catch((error) => {
                this.updateDocName('Not Found.adoc');
                this.update(this.createErrorMessage(gistId, error.message));
            });
        }

        private saveDocInDB(gistId: string, filename: string) {
            if (this.user) {
                this.dbService.saveDoc(gistId, filename, this.user.email);
            } else {
                logWarn('Anonymous user. Saving aciidoc will duplicate gist');
            }
        }

        private createErrorMessage(gistId: string, errorMessage: string) {
            return `CAUTION: The gistId '${gistId}' is Not Found.\n\nError: ${errorMessage}`;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/css/highlightjs/idea.css"
    @import "../assets/css/colony.css"
    borderColor = #e9ecef

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
                font-family Consolas, "Liberation Mono", Courier, monospace

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

    div.ace_content
        padding-top  50px

</style>
