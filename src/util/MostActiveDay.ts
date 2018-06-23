export function MostActiveDay (structure: MessageDateStructure) : MostActiveDay {

    return {
        day: Object.keys(structure).sort((a, b) => structure[b].count - structure[a].count)[0],
        count: structure[Object.keys(structure).sort((a, b) => structure[b].count - structure[a].count)[0]].count || null
    }

}
