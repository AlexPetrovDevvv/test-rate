<template>
    <tab-list :value-list="valueList" v-model="section"/>
</template>

<script setup>
import TabList from '@/components/Dynamic/shared/Tabs/TabList/TabList.vue';
import { ref } from 'vue';

const valueList = [
    {
        value: 'nominations',
        label: 'Номинации'
    },
    {
        value: 'survey',
        label: 'Опрос'
    },
    {
        value: 'research',
        label: 'Исследование'
    },
]

const section = ref('nominations')


</script>

<style lang="sass">

</style>