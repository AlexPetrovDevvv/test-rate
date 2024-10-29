import {getBigCannels, getInvolvedCannels, getCitedCannels} from './topApi'
import { getCorpBigCannels, getCorpInvolvedCannels, getCorpCitedCannels } from './corpApi'
import { getCommonBigCannels, getCommonInvolvedCannels, getCommonCitedCannels } from './commonApi'
import { getPersBigCannels, getPersInvolvedCannels, getPersCitedCannels } from './persApi'
import { searchApi } from './searchApi'

async function nominationApi(params) {
    console.log(params)
    switch (params) {
        case 'Топ-100 каналов: Большие':
            return await getBigCannels()
        case 'Топ-100 каналов: Цитируемые':
            return await getCitedCannels()
        case 'Топ-100 каналов: Вовлеченные':
            return await getInvolvedCannels()
        case 'Топ-50 корпоротивных каналов: Большие':
            return await getCorpBigCannels()
        case 'Топ-50 корпоротивных каналов: Цитируемые':
            return await getCorpCitedCannels()
        case 'Топ-50 корпоротивных каналов: Вовлеченные':
            return await getCorpInvolvedCannels()
        case 'Топ-50 общих каналов: Большие':
            return await getCommonBigCannels()
        case 'Топ-50 общих каналов: Цитируемые':
            return await getCommonCitedCannels()
        case 'Топ-50 общих каналов: Вовлеченные':
            return await getCommonInvolvedCannels()
        case 'Топ-50 личных каналов: Большие':
            return await getPersBigCannels()
        case 'Топ-50 личных каналов: Цитируемые':
            return await getPersCitedCannels()
        case 'Топ-50 личных каналов: Вовлеченные':
            return await getPersInvolvedCannels()
    }
}

export {nominationApi, searchApi}