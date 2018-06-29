<template>
    <div class="editor-container" id="editor">

        <div class="editor-header">
            <b-form-input id="doc-name-input" v-model="docName"
                          type="text">
            </b-form-input>
        </div>
        <div class="editor-main">
            <editor class="editor-pane" :value="content" @input="update" @init="editorInit" lang="asciidoc" theme="chrome" width="50%"></editor>

            <div class="preview-pane" v-highlightjs="compiledMarkdown"/>
        </div>


    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {debounce} from 'typescript-debounce-decorator';
    import {AsciiDoc} from '../asciidoc';

    const editor = require('vue2-ace-editor');

    const asciidoc = new AsciiDoc();

    @Component({
        components: {
            editor,
        },
    })
    export default class DocEditor extends Vue {

        @Prop()
        private docName: string = 'Getting Started.adoc';

        private content = 'Welcome to AsciiDocLIVE!\n' +
            '------------------------\n' +
            '\n' +
            'AsciiDocLIVE is a *free online http://www.methods.co.nz/asciidoc/[AsciiDoc^]\n' +
            'editor*.\n' +
            '\n' +
            '* Just type AsciiDoc source text into the *left* pane,\n' +
            '* ...and the live preview appears in the *right* pane!\n' +
            '\n' +
            'What\'s AsciiDoc?\n' +
            '~~~~~~~~~~~~~~~~~\n' +
            '\n' +
            '[source,ruby]\n' +
            '.app.rb\n' +
            '----\n' +
            'require \'sinatra\'\n' +
            'get \'/hi\' do\n' +
            ' "Hello World!"\n' +
            'end\n' +
            '----';

       // private input= '';

        get compiledMarkdown() {
            const result = asciidoc.convert(this.content);

            return result;
        }


        private editorInit() {
            require('brace/ext/language_tools'); // language extension prerequsite...
            require('brace/mode/asciidoc') ;   // language
            require('brace/theme/chrome');
        }

        @debounce(300, {leading: true})
        private update(e: string) {
            this.content = e;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

    @import "../assets/css/highlightjs/idea.css"
    @import "../assets/css/colony.css"
    borderColor = #e9ecef

    .editor-container
        display: flex
        flex-direction: column
        overflow: hidden
        height: 100%
       // border-top 5px solid grey //todo

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
