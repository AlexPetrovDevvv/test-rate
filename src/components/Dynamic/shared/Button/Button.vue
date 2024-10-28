<template>
    <button class="button">
        {{ text }}
    </button>
</template>

<script setup>

const props = defineProps({
    text: {
        type: String,
        required: true
    }
})

</script>

<style lang="sass">
    .button
        display: inline-flex
        width: fit-content
        border: none
        background: none
        color: var(--blue)
        border: 1px solid var(--blue)
        padding: 15px 20px
        border-radius: 6px
        font-size: 18px
        font-weight: 500
        cursor: pointer
        transition: 0.3s ease-in-out
        transition-property: background, color
        &:hover
            background: var(--blue)
            color: var(--white)
</style>