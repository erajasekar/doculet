<template>
    <div class="home">
        <b-jumbotron id="home-block1" fluid
                     lead="Easily share and embed code examples in your blog, medium articles or in any website.">

            <template slot="header">
                <h1> DOCULET </h1>
               <!-- <b-img width="300" height="100" class="logo"
                       src="https://www.dropbox.com/s/ynub19s42d400a9/Screen%20Shot%202018-09-24%20at%2011.05.46%20PM.png?raw=1"
                       fluid alt="Doculet logo"></b-img> -->
            </template>

            <b-container fluid class="bv-example-row">
                <b-row>
                    <b-col>
                        <b-img width="600" height="500" class="logo"
                               src="https://www.dropbox.com/s/4q4t736idoumpvj/CodeExampleJava.png?raw=1" fluid
                               alt="Code Example"></b-img>
                    </b-col>
                    <b-col>
                        <p>
                            The project is currently in development. You can subscribe to <a href="4"> email list </a>
                            to stay tuned.
                        </p>
                        <p>
                            <b-btn @click="scrollTo('what-is-doculet')" variant="warning"
                                   title="Learn more" size="lg">Learn more
                            </b-btn>
                        </p>

                    </b-col>
                </b-row>
            </b-container>

        </b-jumbotron>

       <b-jumbotron ref="what-is-doculet" id="home-block2" header="What is Doculet?" fluid>

            <p>
                Doculet is a free open source project to easily create, share and embed code examples in your blog,
                medium articles or any of your website.
            </p>
            <p>
                It’s beautiful alternative to embedding code using GitHub Gists.
            </p>

        <!--   <p>
               Doculet uses human readable and easy to use Asciidoc document markup.
               Asciidoc provides builtin support for code callouts.
           </p>

           <h3>
                Comment your code with callouts
            </h3>

           <b-img width="600" height="400" class="logo"
                  src="https://www.dropbox.com/s/yjjjkudul7yo4uc/CodeExampleRuby.png?raw=1" fluid
                  alt="Code Example"></b-img>

           <p>
               Github gists are automatically convert to Asciidoc format during import.
           </p>

           <p>
               To learn more see <a href="https://asciidoctor.org/docs/asciidoc-syntax-quick-reference/#source-code">AsciiDoc
               Syntax Quick Reference</a>.
           </p> -->
            <b-btn @click="openGettingStarted" variant="primary" size="lg" title="Get Started">
                Get Started
            </b-btn>
        </b-jumbotron>

        <!-- <b-jumbotron id="home-block3" header="How to Use?" fluid>

            <ul>
                <li>
                    You can create import a existing gist or directly edit in doculet editor.
                </li>
                <li>
                    You can save your work by clicking save button.
                </li>
                <li>
                    Once your are done, hit publish to share. Click on share button to copy link to share.
                </li>
            </ul>

        </b-jumbotron> -->

        <b-jumbotron id="home-block3" header="Comment your code with callouts" fluid>
            <p>
                Doculet uses human readable and easy to use <a href="https://asciidoctor.org/docs/asciidoc-syntax-quick-reference/#source-code">AsciiDoc</a>
                document markup which provides builtin support for code callouts.
            </p>

            <p>
                <b-img width="600" height="400" class="logo"
                       src="https://www.dropbox.com/s/yjjjkudul7yo4uc/CodeExampleRuby.png?raw=1" fluid
                       alt="Code Example"></b-img>
            <p>
                Github gists are automatically convert to Asciidoc format during import.
            </p>

        </b-jumbotron>

        <b-jumbotron id="home-block4" header="Features and Roadmap" fluid>
            <h3>Prerelease Version 0.1 (Currently available)</h3>
            <br>
            <ul>
                <li>Login using Github.
                </li>
                <li>Import Github Gist.
                </li>
                <li>Edit documents in editor with preview.
                </li>
                <li>Save documents.
                </li>
                <li>See list of your documents.
                </li>
            </ul>
            <br>
            <h3>Version 1.0</h3>
            <br>
            <ul>
                <li>Publish documents for sharing.
                </li>
                <li>Share and embed documents in any website.
                </li>
                <li>Better user experience.
                </li>
            </ul>
            <br>
            <h3>Version 1.1</h3>
            <br>
            <ul>
                <li>More themes and ability switch between themes.
                </li>
                <li>Search your document list.
                </li>
            </ul>
        </b-jumbotron>

        <bottom-footer></bottom-footer>


    </div>


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Constants from '../utils/constants';
    import BottomFooter from '../components/BottomFooter';

    @Component({
        components: {
            BottomFooter,
        },
    })
    export default class Home extends Vue {
        private openGettingStarted() {
            this.$router.push(`/edit/${Constants.GETTING_STARTED_DOC_GIST_ID}`);
        }

        private scrollTo(refName: any) {
            const offsetTopProperty = 'offsetTop';
            const top = (this.$refs[refName] as any)[offsetTopProperty];
            window.scrollTo(0, top);
        }
    }
</script>

<style scoped lang="scss">

    @import '../assets/scss/home.scss';

</style>
