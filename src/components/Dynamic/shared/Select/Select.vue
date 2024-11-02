<template>
    <div class="multi-select__wrapper">
        <div class="multi__select">
            <button class="multi__select-button">
                <span>{{ selectValue }}</span>
                <svg viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.8" d="M17 1.46973L9.23486 9.23486L1.46973 1.46973" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        </div>
        <ul class="multi-select__list-general">
            <li class="multi-select__item-general" v-for="(item, index) in props.valueList" :key="index">
                <span>{{ item.title }}</span>
                <ul class="multi-select__list">
                    <li class="multi-select__item" v-for="(v, i) in item.value" :key="i">
                        <input type="radio" :value=v v-model="selectValue">
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>


const props = defineProps({
    valueList: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const selectValue = defineModel({
    type: [String, Number, Boolean],
    required: true,
    default: props.title
})

</script>

<style lang="sass">

</style>