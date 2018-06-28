<template>
    <div class="editor-container" id="editor">

        <editor class="editor-pane" :value="input" @input="update" @init="editorInit" lang="asciidoc" theme="chrome" width="50%"></editor>

        <div class="preview-pane" v-highlightjs="compiledMarkdown"/>


    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Vue} from 'vue-property-decorator';
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

        private input = 'Welcome to AsciiDocLIVE!\n' +
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
            const result = asciidoc.convert(this.input);

            return result;
        }


        private editorInit() {
            require('brace/ext/language_tools'); // language extension prerequsite...
            require('brace/mode/asciidoc') ;   // language
            require('brace/theme/chrome');
        }

        @debounce(300, {leading: true})
        private update(e: any) {
            this.input = e;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  //  @import "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"
  @import "../assets/css/highlightjs/idea.css"
  @import "../assets/css/colony.css"
  borderColor = #e9ecef

    .editor-container
        display: flex
        flex-direction: row
        overflow: hidden
        height: 100%
        padding-top: 20px;
       // border-top 5px solid #4ACE78 //todo
        .editor-pane
            flex: 0 0 auto
            width: 50%
            height: 100%
            border-right 2px solid borderColor
        .preview-pane
            flex: 1 1 auto;
            width: 50%;
            padding: 10px;
            overflow-y: auto
            word-break: break-word

</style>
