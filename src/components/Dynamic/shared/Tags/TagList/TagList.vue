<template>
    <div class="tag-list">
        <Tag class="tag-item" v-for="item in valueList" :value="item.value" v-model="model" :label="item.label"></Tag>
    </div>
</template>

<script setup>
import Tag from '../Tag/Tag.vue';

const props = defineProps({
    valueList: {
        type: Array,
        required: true
    }
})

const model = defineModel({
    type: [String, Number, Boolean],
    required: true
})

</script>

<style lang="sass">

.tag-list
    display: flex
    width: 100%
    flex-wrap: wrap
    gap: 35px
    align-items: center

</style>