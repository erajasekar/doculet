<template>
    <div class="home" >
        <doc-editor/>
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
