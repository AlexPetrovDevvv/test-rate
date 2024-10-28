<template>
    <Table class="nominations-table">
        <template #head>
            <Row>
                <template #content>
                    {{ titleList }}
                    <Cell v-for="(title, index) in titleList" :key="index" :tag="'th'">{{ title }}</Cell>
                </template>
            </Row>
        </template>
        <template #body>
            <Row v-for="(value, index) in valueList" :key="index">
                <template #content>
                    <Cell v-for="(title, index) in titleValueList" :key="index"  :tag="'td'">{{ value[title] }}</Cell>
                </template>
            </Row>
        </template>
    </Table>
</template>

<script setup>
import { onMounted } from 'vue';
import Cell from '@/components/Dynamic/shared/Table/Cell/Cell.vue';
import Row from '@/components/Dynamic/shared/Table/Row/Row.vue';
import Table from '@/components/Dynamic/shared/Table/Table/Table.vue';

const props = defineProps({
    titleList: {
        type: Array,
        required: true
    },
    valueList: {
        type: Array,
        required: true
    },
    titleValueList: {
        type: Array,
        required: true
    }
})

onMounted(() => {
    console.log('titleList:', props.titleList)
    console.log('valueList:', props.valueList)
    console.log('titleValueList:', props.titleValueList)
})

</script>

<style lang="sass">

</style>