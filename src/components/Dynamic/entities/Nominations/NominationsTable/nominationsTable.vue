<template>
    <Table class="nominations-table">
        <template #head>
            <Row class="nominations-table__row nominations-table__row_head">
                <template #content>
                    <Cell v-for="(title, index) in titleList" :key="index" :tag="'th'" class="nominations-table__cell nominations-table__cell_head">
                        <template #content>{{ title }}</template>
                    </Cell>
                </template>
            </Row>
        </template>
        <template #body>
            <Row v-for="(value, index) in valueList" :key="index" class="nominations-table__row">
                <template #content>
                    <Cell v-for="(title, index) in titleValueList" :key="index"  :tag="'td'" class="nominations-table__cell">
                        <template #content>{{ value[title] }}</template>
                    </Cell>
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

</script>

<style lang="sass">

.nominations-table
    border-collapse: collapse
    border-spacing: 0
    width: fit-content
    margin-top: 20px
    &__cell
        color: var(--black)
        padding: 10px 5px
        text-align: left
        font-size: 13px
        font-style: normal
        font-weight: 400
        line-height: 130%
        &_head
            color: var(--blue)
            font-weight: 600
    &__row
        border-bottom: 1px solid var(--black)
        &__head
            border-bottom: 1px solid var(--blue)

</style>