<template>
    <div class="tab-list" >
        <div class="tabs" ref="tabsContainer">
            <tab-item v-for="(item, index) in valueList" :key="index" :value="item.value" v-model="model" :label="item.label" ></tab-item>
        </div>
        <div class="tab-list__glider" :style="gliderStyle"></div>
    </div>
</template>

<script setup>
import TabItem from '../TabItem/TabItem.vue';
import { ref, computed, onMounted, nextTick } from 'vue';


const props = defineProps({
  valueList: {
    type: Array,
    required: true,
  },
});

const model = defineModel({
  type: [String, Number, Boolean],
  required: true,
});

const tabsContainer = ref(null);

const activeTabIndex = computed(() => {
  return props.valueList.findIndex((item) => item.value === model.value);
});

const gliderStyle = computed(() => {
  const tabs = tabsContainer.value?.querySelectorAll('.tab');
  if (activeTabIndex.value === -1) {
    return {};
  }
  const activeTab = tabs?.[activeTabIndex.value];
  if (activeTab) {
    const { offsetLeft, offsetWidth } = activeTab;
    return {
      transform: `translateX(${offsetLeft}px)`,
      width: `${offsetWidth}px`,
      transition: 'transform 0.3s ease, width 0.3s ease',
    };
  }
  return {};
});

onMounted(async () => {
  await nextTick();
});

</script>

<style lang="sass">

.tab-list
    width: 100%
    position: relative
    &__glider
        position: absolute
        bottom: 0
        left: 0
        height: 2px
        background: var(--blue)
        z-index: 2

.tabs
    display: flex
    width: 100%
    overflow: hidden

</style>