const tableList = [
    {
        title: 'Топ-100 каналов: Большие',
        path: '/data/Top100BigChannels.json'
    },
    {
        title: 'Топ-100 каналов: Цитируемые',
        path: '/data/top100CitedChannels.json'
    },
    {
        title: 'Топ-100 каналов: Вовлеченные',
        path: '/data/Top100ChannelsInvolved.json'
    },
    {
        title: 'Топ-50 корпоротивных каналов: Большие',
        path: '/data/t50CorpChannelsBig.json'
    },
    {
        title: 'Топ-50 корпоротивных каналов: Цитируемые',
        path: '/data/t50CorpChannelsCitited.json'
    },
    {
        title: 'Топ-50 корпоротивных каналов: Вовлеченные',
        path: '/data/t50CorpChannelsInvolved.json'
    },
    {
        title: 'Топ-50 общих каналов: Большие',
        path: '/data/t50CommonChannelsBig.json'
    },
    {
        title: 'Топ-50 общих каналов: Цитируемые',
        path: '/data/t50CommonChannelsCitited.json'
    },
    {
        title: 'Топ-50 общих каналов: Вовлеченные',
        path: '/data/t50CommonChannelsInvolved.json'
    },
    {
        title: 'Топ-50 личных каналов: Большие',
        path: '/data/t50PersChannelsBig.json'
    },
    {
        title: 'Топ-50 личных каналов: Цитируемые',
        path: '/data/t50PersChannelsCitited.json'
    },
    {
        title: 'Топ-50 личных каналов: Вовлеченные',
        path: '/data/t50PersChannelsInvolved.json'
    }
]

async function searchApi(participantName) {
    const results = [];

    for (const file of tableList) {
        try {
            const response = await fetch(file.path);
            const data = await response.json();
            // Проверяем каждого участника в номинации
            const participant = data.participants.find(p => p.link === participantName);
            if (participant) {
                results.push({
                    title: file.title,
                    columns: data.columns,
                    titleList: data.titleList,
                    participant: [participant]
                });
            }
        } catch (error) {
            console.error(`Ошибка при загрузке файла ${file.path}: ${error}`);
        }
    }

  return results;
}

export {searchApi}