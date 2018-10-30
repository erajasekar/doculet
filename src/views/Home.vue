<template>
    <div class="home">

        <vue-headful
                :title="title"
                :description="description"
                :keywords="keywords"
                url="https://doculet.net"
        />

        <b-jumbotron id="home-container1" fluid
                     lead="Easily share and embed code examples in your blog, medium articles or on any website.">

            <template slot="header">
                <h1> DOCULET (Beta) </h1>
            </template>

            <p align="center">
                <b-btn @click="scrollTo('what-is-doculet')" variant="warning"
                                   title="Learn more" size="lg">Learn more
                </b-btn> 
            </p>
            <p align="center">
                <b-img class="logo"
                               src="https://www.dropbox.com/s/hd5swk7veg9su6f/CodeExample.png?raw=1" fluid
                               alt="Code Example">
                </b-img>
            </p>

           <!--  <b-container class="bv-example-row">
                <b-row>
                    <b-col cols="9">
                        <b-img class="logo"
                               src="https://www.dropbox.com/s/hd5swk7veg9su6f/CodeExample.png?raw=1" fluid
                               alt="Code Example"></b-img>
                    </b-col>
                   <b-col>
                       <p>
                            Doculet is currently in beta. If you would like to be notified when it is GA, 
                            you can subscribe to <a href="http://eepurl.com/dI-8Ur" target="_blank"> email list. </a>
                        </p> 
                        <p>
                            <b-btn @click="scrollTo('what-is-doculet')" variant="warning"
                                   title="Learn more" size="lg">Learn more
                            </b-btn>
                        </p>

                    </b-col>
                </b-row>
            </b-container>-->

        </b-jumbotron>

       <b-jumbotron ref="what-is-doculet" id="home-container2" header="What is Doculet?" fluid>

            <p>
                Doculet is a free open source project to easily create, share and embed code examples in your blog,
                medium articles or any of your website.
            </p>
          <!--  <p> To embed in Medium, simply type URL and hit enter.  </p>
            <p>
                <b-img 
                       src="https://www.dropbox.com/s/52kcrh91qrdsuuj/embed-demo.gif?raw=1" fluid
                       alt="Medium Embed Example"></b-img>
            </p> -->
            <p>
                It’s beautiful alternative to embedding code using GitHub Gists.
            </p>

            <b-btn @click="openGettingStarted" variant="primary" size="lg" title="Get Started">
                Get Started
            </b-btn>
        </b-jumbotron>

        <b-jumbotron id="home-container3" header="Easily Embed in Medium" fluid>

            <p> To embed in Medium, simply type URL and hit enter. It will automatically expand into embeded iframe. </p>
            <p align="center">
                <b-img width="800" height="800"
                       src="https://www.dropbox.com/s/52kcrh91qrdsuuj/embed-demo.gif?raw=1" fluid
                       alt="Medium Embed Example"></b-img>
            </p>
        </b-jumbotron>

        <b-jumbotron id="home-container4" header="Quickly copy code or switch themes" fluid>

            <p> Readers can easily copy code by clicking copy 
                <span class="icon">
                    <i class="fa fa-copy"></i>
                </span> button. They can also quickly switch between dark or light theme mode.
            </p>
            <p>
                <b-img 
                       src="https://www.dropbox.com/s/m39wgvi8dagjl7u/theme-select-demo.gif?raw=1" fluid
                       alt="Switch theme Example"></b-img>
            </p>
        </b-jumbotron>

        <b-jumbotron id="home-container5" header="Comment your code with callouts" fluid>
            <p>
                Doculet uses human readable and easy to use <a href="https://asciidoctor.org/docs/asciidoc-syntax-quick-reference/#source-code">AsciiDoc</a>
                document markup which provides builtin support for code callouts.
            </p>

            <p>
                <!--  src="https://www.dropbox.com/s/yjjjkudul7yo4uc/CodeExampleRuby.png?raw=1" fluid -->
                <b-img class="logo"
                       src="https://www.dropbox.com/s/blausi7qycv0lh7/CalloutExample2.png?raw=1" fluid
                       alt="Code Callout Example"></b-img>
            </p>

        </b-jumbotron>

        <b-jumbotron id="home-container6" header="Features and Roadmap" fluid>
            <h3>Beta Version 0.4.0 </h3>
            <ul class="features-done">
                <li>Login using Github.
                </li>
                <li>Import Github Gist.
                </li>
                <li>Edit documents in editor with preview.
                </li>
                <li>Save documents.
                </li>
                <li>Publish documents.
                </li>
                <li>Share in any website using iframe.</li>
                <li>Embed documents in Medium</li>
                <li>Delete documents.
                </li>
                <li>See list of your documents and navigate between them.
                </li>
            </ul>
            <hr>
            <h3>GA Version 1.0</h3>
            <ul>
                <li>Fix bugs identified in Beta.</li>
            </ul>
            <hr>
            <h3>Version 1.1</h3>
            <br>
            <ul>
                <li>More themes and ability switch between themes.
                </li>
                <li>Better user experience.
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
    import BottomFooter from '@/components/BottomFooter.vue';

    @Component({
        components: {
            BottomFooter,
        },
    })
    export default class Home extends Vue {

        private title = Constants.DOCULET_TITLE;
        private description = Constants.DOCULET_DESCRIPTION;
        private keywords = Constants.DOCULET_SEO_KEYWORDS;

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

    @import '../assets/scss/view';

</style>
