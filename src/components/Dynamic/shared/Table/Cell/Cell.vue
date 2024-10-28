<template>
    <component :is="tag" class="table__cell" :class="{'table__cell_head': tag === 'th'}">
        <slot name="content"></slot>
    </component>
</template>

<script setup>

const props = defineProps({
    tag: {
        type: String,
        required: true
    }
})

</script>

<style lang="sass">

</style>