<template>
    <tab-list :value-list="valueList" v-model="section"/>
</template>

<script setup>
import TabList from '@/components/Dynamic/shared/Tabs/TabList/TabList.vue';
import { ref, watch } from 'vue';
import {usePageStore} from '../../../store/page.js';

const pageStore = usePageStore()

const valueList = [
    {
        value: 'Номинации',
        label: 'Номинации'
    },
    {
        value: 'Опрос',
        label: 'Опрос'
    },
    {
        value: 'Исследование',
        label: 'Исследование'
    },
]

const section = ref('Номинации')

watch(() => pageStore.pageState.pageTitle, () => {
    if(pageStore.pageState.pageTitle === '') {
        section.value = 'Номинации'
    }
})

watch(section, () => {
    pageStore.setPageTitle(section.value)
})



</script>

<style lang="sass">

</style>