<template>
    <div class="editor-container" id="editor">
        <div class="editor-pane" >
            <textarea :value="input" @input="update" />
        </div>

        <div class="preview-pane" v-html="compiledMarkdown"></div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { debounce } from 'typescript-debounce-decorator';
    import { AsciiDoc } from '../asciidoc';

    const asciidoc = new AsciiDoc();

    @Component
    export default class HelloWorld extends Vue {

        private input = '';

        get compiledMarkdown() {
           return asciidoc.convert(this.input);
        }

        @debounce(300, { leading: true })
        private update(e: any) {
            this.input = e.target.value;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
    /*h3
        margin 40px 0 0

    ul
        list-style-type none
        padding 0

    li
        display inline-block
        margin 0 10px

    a
        color #42b983

    #editor
        margin 0
        height 100%
        font-family 'Helvetica Neue', Arial, sans-serif
        color #333

    textarea, #editor div
        display inline-block
        width 49%
        height 100%
        vertical-align top
        box-sizing border-box
        padding 0 20px

    textarea
        border none
        border-right 1px solid #ccc
        resize none
        outline none
        background-color #f6f6f6
        font-size 14px
        font-family 'Monaco', courier, monospace
        padding 20px

    code
        color #f66*/

    textarea
        width 100%
        height 100%

    .editor-container
        display: flex
        flex-direction: row
        overflow: hidden
        height : 100%
        .editor-pane
            flex: 0 0 auto
            width: 50%
            border-style: solid
            border-width: medium
            height :100%
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

</style>
