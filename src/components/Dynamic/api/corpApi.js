const routes = {
    big: '/data/t50CorpChannelsBig.json',
    involved: '/data/t50CorpChannelsInvolved.json',
    cited: '/data/t50CorpChannelsCitited.json'
}


async function getCorpBigCannels() {
    const response = await fetch(routes.big)
    const data = await response.json()
    return data
}


async function getCorpInvolvedCannels() {
    const response = await fetch(routes.involved)
    const data = await response.json()
    return data
}


async function getCorpCitedCannels() {
    const response = await fetch(routes.cited)
    const data = await response.json()
    return data
}



export { getCorpBigCannels, getCorpInvolvedCannels, getCorpCitedCannels }