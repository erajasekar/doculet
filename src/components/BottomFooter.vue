<template>
    <footer class="footer">

        <b-jumbotron id="footer" fluid text-variant="white">

            <b-container fluid class="bv-example-row">
                <b-row>
                    <b-col>&copy; DOCULET by <a href="https://twitter.com/erajasekar">@erajasekar</a>
                    </b-col>
                    <b-col>
                        <b-link to="/about">About</b-link>
                    </b-col>
                </b-row>
            </b-container>

        </b-jumbotron>
    </footer>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class BottomFooter extends Vue {

    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/footer.scss';
</style>