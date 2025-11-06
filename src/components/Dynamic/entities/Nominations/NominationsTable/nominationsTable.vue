<template>
  <Table
    class="nominations-table table-wrap"
    v-magnifier="{ scale, size }"
    ref="wrap"
  >
    <template #head>
      <Row class="nominations-table__row nominations-table__row_head">
        <template #content>
          <Cell
            v-for="(title, i) in titleList"
            :key="'h'+i"
            :tag="'th'"
            class="nominations-table__cell nominations-table__cell_head"
          >
            <template #content>{{ title }}</template>
          </Cell>
        </template>
      </Row>
    </template>

    <template #body>
      <Row
        v-for="(row, rowIdx) in valueList"
        :key="'r'+rowIdx"
        class="nominations-table__row"
      >
        <template #content>
          <Cell
            v-for="(key, colIdx) in titleValueList"
            :key="'c'+rowIdx+'-'+colIdx"
            :tag="'td'"
            class="nominations-table__cell"
          >
            <template #content>
              <span class="cell-text">{{ row[key] }}</span>
              <Paw
              :magnifer="magnifer"
              :row-idx="rowIdx"
              :col-idx="colIdx"
              :is-paw-at="isPawAt"
              />
            </template>
          </Cell>
        </template>
      </Row>
    </template>
  </Table>
</template>

<script setup>
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue'
import Cell from '@/components/Dynamic/shared/Table/Cell/Cell.vue'
import Row from '@/components/Dynamic/shared/Table/Row/Row.vue'
import Table from '@/components/Dynamic/shared/Table/Table/Table.vue'
import Paw from '@/components/Dynamic/shared/Paw/Paw.vue'

const props = defineProps({
  titleList: { type: Array, required: true },
  valueList: { type: Array, required: true },
  titleValueList: { type: Array, required: true },
  magnifer: { type: Boolean, required: true },
  magnifierScale: { type: Number, default: 2 },
  magnifierSize: { type: Number, default: 10 }
})

/* ====== magnifier wiring ====== */
const wrap = ref(null)
let ctrl = null
const scale = props.magnifierScale
const size  = props.magnifierSize

function getHostEl(r) {
  const v = r?.value
  if (Array.isArray(v)) return v[0] instanceof HTMLElement ? v[0] : v[0]?.$el || null
  return v instanceof HTMLElement ? v : v?.$el || null
}

/* ====== лапки: одна на строку ====== */
/* объявляем ДО watcher’ов */
const pawMap = ref(new Map()) 
function isPawAt(i, j) {
  return pawMap.value.get(i) === j
}

function generatePaws() {
  const rows = props.valueList?.length || 0
  const cols = props.titleValueList?.length || 0
  pawMap.value = new Map()
  if (!rows || !cols) return
  
  for (let rIdx = 0; rIdx < rows; rIdx++) {
    const row = props.valueList[rIdx]
    if (!hasPawFlag(row)) continue
    const cIdx = Math.floor(Math.random() * cols)
    pawMap.value.set(rIdx, cIdx)
  }
}

const hasPawFlag = (row) => {
  const v = row?.paw
  if (typeof v === 'boolean') return v
  if (typeof v === 'string') return v.trim().toLowerCase() === 'true'
  if (typeof v === 'number') return v === 1
  return false
}

/* ====== lifecycle ====== */
onMounted(async () => {
  await nextTick()
  const el = getHostEl(wrap)
  if (!el) return

  ctrl = el.__magnifier__ || null
  el.addEventListener(
    'magnifier-ready',
    (e) => {
      ctrl = e.detail
      if (props.magnifer) ctrl?.enable?.()
    },
    { once: true }
  )

  // первичная генерация лапок, если мини-игра уже включена
  if (props.magnifer) generatePaws()
})

onBeforeUnmount(() => { ctrl = null })

/* включение/выключение мини-игры */
watch(() => props.magnifer, (on) => {
  if (ctrl) on ? ctrl.enable?.() : ctrl.disable?.()
  if (on) generatePaws()
  else pawMap.value = new Map()
})




</script>

<style lang="sass">
.nominations-table
  border-collapse: collapse
  border-spacing: 0
  width: fit-content
  margin-top: 20px

  &__row
    border-bottom: 1px solid var(--black)
    &__head
      border-bottom: 1px solid var(--blue)

  &__cell
    position: relative
    color: var(--black)
    padding: 10px 5px
    text-align: left
    font-size: 13px
    font-weight: 400
    line-height: 130%
    overflow: visible
    &_head
      color: var(--blue)
      font-weight: 600

    &.has-paw
      padding-right: 32px 

.table-wrap
  position: relative
</style>
