export function MessagesHour (structure: MainStructure[], nameOne: string, nameTwo: string) : MessagesHour {

    function hour (hour: number, name?: string) {
        if (name) {
            return structure.filter(_ => _.hour === hour && _.from === name).length;
        } else {
            return structure.filter(_ => _.hour === hour).length;
        }
    }

    const totalMessagesByAll = [...Array(24).keys()].map(i => hour(i));
    const totalMessagesByOne = [...Array(24).keys()].map(i => hour(i, nameOne));
    const totalMessagesByTwo = [...Array(24).keys()].map(i => hour(i, nameTwo));

    return {
        totalMessagesByAll,
        totalMessagesByOne,
        totalMessagesByTwo
    }

}
