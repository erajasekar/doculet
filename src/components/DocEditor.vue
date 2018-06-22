<template>
    <div class="editor-container" id="editor">
        <div class="editor-pane">
            <textarea :value="input" @input="update"/>
        </div>

        <div class="preview-pane" v-highlightjs="compiledMarkdown"/>


    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {debounce} from 'typescript-debounce-decorator';
    import {AsciiDoc} from '../asciidoc';

    const asciidoc = new AsciiDoc();

    @Component
    export default class HelloWorld extends Vue {

        /*private input = '[source,ruby]\n' +
            '.app.rb\n' +
            '----\n' +
            'require \'sinatra\'\n' +
            'get \'/hi\' do\n' +
            ' "Hello World!"\n' +
            'end\n' +
            '----';*/
        private input= '';

        get compiledMarkdown() {
            let result = asciidoc.convert(this.input);
          /*  result = " <div v-highlightjs>\n" +
                "                <div class=\"listingblock\">\n" +
                "                    <div class=\"title\">app.rb</div>\n" +
                "                    <div class=\"content\">\n" +
                "      <pre class=\"highlightjs highlight\"><code class=\"language-ruby hljs\" data-lang=\"ruby\">require 'sinatra'\n" +
                "      get '/hi' do <i class=\"conum\" data-value=\"1\"></i><b>(1)</b>\n" +
                "       \"Hello World!\"\n" +
                "      end</code></pre>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"colist arabic\">\n" +
                "                    <table>\n" +
                "                        <tr>\n" +
                "                            <td><i class=\"conum\" data-value=\"1\"></i><b>1</b></td>\n" +
                "                            <td>test comment</td>\n" +
                "                        </tr>\n" +
                "                    </table>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>";
           // console.log(result);*/
            return result;
        }

        @debounce(300, {leading: true})
        private update(e: any) {
            this.input = e.target.value;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  //  @import "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css"
  @import "../assets/css/highlightjs/idea.css"
  @import "../assets/css/colony.css"

    textarea
        width 100%
        height 100%

    .editor-container
        display: flex
        flex-direction: row
        overflow: hidden
        height: 100%
        .editor-pane
            flex: 0 0 auto
            width: 50%
            border-style: solid
            border-width: medium
            height: 100%
        .resize-handle
            flex: 0 0 auto
            width: 7px
            background: $gray-lighter
            cursor: col-resize
        .preview-pane
            flex: 1 1 auto;
            width: 50%;
            padding: 10px;
            overflow-y: auto
            word-break: break-word
            border-style: solid;
            border-width: medium;
            table
            background: #fff
            margin-bottom: 1.25em
            border: solid 1px #dedede

</style>
