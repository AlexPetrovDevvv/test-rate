<template>
    <section class="feauters-list">
        <tab-list :value-list="valueList" v-model="feauters"/>
    </section>
</template>

<script setup>
import TabList from '@/components/Dynamic/shared/Tabs/TabList/TabList.vue';
import { usePageStore } from '../../store/page';
import { ref, watch } from 'vue';

const pageStore = usePageStore()

const valueList = [
    {
        value: 'table',
        label: 'Списки участников по номинациям'
    },
    {
        value: 'search',
        label: 'Поиск участника по номинациям'
    },
]

const feauters = ref('table')

watch(() => pageStore.pageState.feauters, () => {
    if(pageStore.pageState.feauters === 'table') {
        feauters.value = 'table'
    }
})

watch(feauters, () => {
    pageStore.setPageFeauters(feauters.value)
})

</script>

<style lang="sass">

.feauters-list
    margin-top: 20px
</style>