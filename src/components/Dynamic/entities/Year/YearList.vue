<template>
    <section class="year-list">
        <tag-list :value-list="valueList" v-model="year"/>
    </section>
</template>

<script setup>
import TagList from '../../shared/Tags/TagList/TagList.vue';
import { usePageStore } from '../../store/page';
import { ref, watch } from 'vue';

const pageStore = usePageStore()

const valueList = [
    {
        value: '2023',
        label: '2023'
    },
]

const year = ref('')

watch(() => pageStore.pageState.year, () => {
    if(pageStore.pageState.year === '') {
        year.value = ''
    }
})

watch(year, () => {
    pageStore.setPageYear(year.value)
})

</script>

<style lang="sass">

.year-list
    max-width: 800px
    width: 100%
    margin: 0 auto
    & .tag-list
        justify-content: center
</style>