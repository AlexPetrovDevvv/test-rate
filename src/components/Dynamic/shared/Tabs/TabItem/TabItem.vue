<template>
    <label class="tab" :class="{'tab_active': model === value}">
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

.tab
    display: block
    width: 100%
    height: 100%
    padding: 20px 25px
    font-size: 18px
    font-weight: 500
    color: var(--blue)
    cursor: pointer
    position: relative
    border-bottom: 2px solid rgba(0, 0, 0, 0)
    z-index: 1
    transition: 0.3s ease-in-out
    transition-property: border-bottom, color, background-color
    & input
        display: none
    &::before
        display: block
        content: ''
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0
        z-index: -1
        background: var(--black)
        opacity: 0
        transition: 0.3s ease-in-out
        transition-property: opacity
    &:hover
        border-bottom: 2px solid rgba(0, 0, 0, 0.5)
        &::before
            opacity: 0.3
    &.tab_active
        background-color: var(--text-blue)
        &:hover
            &::before
                opacity: 0

</style>