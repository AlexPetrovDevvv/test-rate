import { defineStore } from "pinia"
import { ref, reactive, shallowReactive } from "vue"
import { nominationApi } from "@/components/Dynamic/api"

export const useNominationsStore = defineStore('Nominations', () => {
    const NominationsFilterState = reactive({
        category: '',
        nomination: '',
    })

    const fullValueList = ref([]);
    const valueList = ref([]);
    const titleList = ref([]);
    const titleValueList = ref([]);
    const content = ref('');

    const currentIndex = ref(0);
    const pageSize = 20;
    const hasMore = ref(true);
    const isLoading = ref(false);
    const errorMessage = ref('');

    async function getNominations() {
        // Сброс состояния при новом запросе
        fullValueList.value = [];
        valueList.value = [];
        currentIndex.value = 0;
        hasMore.value = true;
        errorMessage.value = '';

        const { category, nomination } = NominationsFilterState;

        const params = `${category}: ${nomination}`

        try {
            isLoading.value = true;
            const data = await nominationApi(params);
            if (data) {
                // Устанавливаем заголовки и содержимое
                titleList.value = data.columns || [];
                titleValueList.value = data.titleList || [];
                content.value = data.content || '';

                if (data.participants && data.participants.length > 0) {
                    fullValueList.value = data.participants;
                    loadMoreItems(); // Загружаем первую порцию данных
                } else {
                    hasMore.value = false;
                }
            } else {
                hasMore.value = false;
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            errorMessage.value = 'Не удалось загрузить данные.';
            hasMore.value = false;
        } finally {
            isLoading.value = false;
        }
    }

    function loadMoreItems() {
        // Загружаем следующую порцию данных

        if (!hasMore.value) return;
        console.log("load")
        const nextIndex = currentIndex.value + pageSize;
        const items = fullValueList.value.slice(currentIndex.value, nextIndex);
        valueList.value.push(...items);
        console.log('valueList:', valueList.value)
        currentIndex.value = nextIndex;

        // Проверяем, есть ли еще данные для загрузки
        if (currentIndex.value >= fullValueList.value.length) {
            hasMore.value = false;
        }
    }

    return {
        NominationsFilterState,
        valueList,
        titleList,
        titleValueList,
        content,
        hasMore,
        isLoading,
        errorMessage,
        getNominations,
        loadMoreItems
    }
})