<template>
    <label class="tag">
        {{ label }}
        <input type="radio" :value="value" v-model="model">
    </label>
</template>

<script setup>
import { ref, defineModel } from 'vue'

const props = defineProps({
  value: [String, Number, Boolean],
  label: String
});

const model = defineModel({
    type: [String, Number, Boolean],
    required: true
})

</script>

<style lang="sass">
.tag
    display: block
    padding: 15px 20px
    border-radius: 6px
    border: 2px solid var(--blue)
    font-size: 18px
    font-weight: 500
    color: var(--blue)
    cursor: pointer
    transition: .3s ease-in-out
    transition-property: background-color, color
    & input
        display: none
    &:hover
        background-color: var(--blue)
        color: var(--text-blue)
</style>