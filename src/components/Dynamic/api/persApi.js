const routes = {
    big: '/data/t50PersChannelsBig.json',
    involved: '/data/t50PersChannelsInvolved.json',
    cited: '/data/t50PersChannelsCitited.json'
}


async function getPersBigCannels() {
    const response = await fetch(routes.big)
    const data = await response.json()
    return data
}


async function getPersInvolvedCannels() {
    const response = await fetch(routes.involved)
    const data = await response.json()
    return data
}


async function getPersCitedCannels() {
    const response = await fetch(routes.cited)
    const data = await response.json()
    return data
}



export { getPersBigCannels, getPersInvolvedCannels, getPersCitedCannels }