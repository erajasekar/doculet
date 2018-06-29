<template>
    <div class="home" >
        <doc-editor docName='Test 2'/>
    </div>


</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DocEditor from '@/components/DocEditor.vue'; // @ is an alias to /src

    @Component({
        components: {
            DocEditor,
        },
    })
    export default class Home extends Vue {
    }
</script>

<style scoped lang="stylus">
    .home
        height: 100%
        width: 100%
</style>
