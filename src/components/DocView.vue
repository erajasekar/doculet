<template>
    <div>
        <vue-headful
                :title="htmlTitle"
                :description="htmlDescription"
                :keywords="keywords"
        />
        <div class="view-pane" v-highlightjs="compiledHtml"/>
    </div>
</template>

<script lang="ts">
    // TODO clean up unused dependencies
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {gitHubService} from '../services/GitHubService';
    import {logDebug, logInfo} from '../utils/logger';
    import Constants from '../utils/constants';
    import {startTime} from '../main';
    import {asciiDoc} from '../asciidoc';

    @Component({
        props: {
            gistId: String,
        },
    })
    export default class DocView extends Vue {

        private title: string = 'Doculet';
        private htmlDescription = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;
        private gistId: string = this.gistId;

        private content: string = '';

        private mounted() {
            this.loadGist(this.gistId, '');

            /* Can't read from firestore unauthenticated */

        }

        get htmlTitle() {
            return this.title;
        }

        private updated() {
            const endTime = new Date().getTime();
            logInfo((endTime - startTime).toLocaleString());
        }

        @Watch('gistId')
        private loadGist(gistId: string, oldValue: string) {

            logDebug(`New gistId ${gistId} , Old value : ${oldValue}`);

            if (gistId === Constants.GETTING_STARTED_DOC_GIST_ID) {
                this.content = Constants.ON_LOAD_DOC_CONTENT;
            } else {
                gitHubService.importGist(gistId).then((gistFile) => {
                    this.title = `Doculet - ${gistFile.fileName}`;
                    this.content = gistFile.content;
                });
            }
        }


        get compiledHtml() {
            // TODO add file name as title
            if (this.content === '') {
                return 'Loading...'; // TODO CONSTANT
            } else {
                return asciiDoc.convert(this.content);
                /*return "<div class=\"sect1\">\n" +
                    "<h2 id=\"_welcome_to_asciidoclive\">Welcome to AsciiDocLIVE!</h2>\n" +
                    "<div class=\"sectionbody\">\n" +
                    "<div class=\"paragraph\">\n" +
                    "<p>AsciiDocLIVE is a <strong>free online <a href=\"http://www.methods.co.nz/asciidoc/\"
                        target=\"_blank\" rel=\"noopener\">AsciiDoc</a>\n" +
                    "editor</strong>.</p>\n" +
                    "</div>\n" +
                    "<div class=\"ulist\">\n" +
                    "<ul>\n" +
                    "<li>\n" +
                    "<p>Just type AsciiDoc source text into the <strong>left</strong> pane,</p>\n" +
                    "</li>\n" +
                    "<li>\n" +
                    "<p>&#8230;&#8203;and the live preview appears in the <strong>right</strong> pane!</p>\n" +
                    "</li>\n" +
                    "</ul>\n" +
                    "</div>\n" +
                    "<div class=\"sect2\">\n" +
                    "<h3 id=\"_whats_asciidoc\">What&#8217;s AsciiDoc?</h3>\n" +
                    "<div class=\"listingblock\">\n" +
                    "<div class=\"title\">app.rb</div>\n" +
                    "<div class=\"content\">\n" +
                    "<pre class=\"highlightjs highlight\"><code class=\"language-ruby hljs\"
                        data-lang=\"ruby\">require 'sinatra'\n" +
                    "get '/hi' do\n" +
                    " \"Hello World!\"\n" +
                    "end</code></pre>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>";*/
            }

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
