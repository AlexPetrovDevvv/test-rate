import { defineStore } from "pinia"
import { ref, reactive, computed } from "vue"

export const usePageStore = defineStore('page', () => {
    const pageState = reactive({
        year: '',
        pageTitle: 'Номинации',
        feauters: 'table'
    })

    function clearPage() {
        pageState.year = ''
        pageState.pageTitle = ''
        pageState.feauters = 'table'
    }

    function setPageYear(year) {
        pageState.year = year
    }

    function setPageTitle(title) {
        pageState.pageTitle = title
    }

    function setPageFeauters(feauters) {
        pageState.feauters = feauters
    }

    return { pageState, clearPage, setPageYear, setPageTitle, setPageFeauters }
  })