export function MessagesWeekday (structure: MainStructure[], nameOne: string, nameTwo: string) {

    let totalMessagesOnMonday: number = structure.filter(a => a.day === 1).length;
    let totalMessagesOnTuesday: number= structure.filter(a => a.day === 2).length;
    let totalMessagesOnWednesday: number = structure.filter(a => a.day === 3).length;
    let totalMessagesOnThursday: number = structure.filter(a => a.day === 4).length;
    let totalMessagesOnFriday: number = structure.filter(a => a.day === 5).length;
    let totalMessagesOnSaturday: number = structure.filter(a => a.day === 6).length;
    let totalMessagesOnSunday: number = structure.filter(a => a.day === 0).length;

    let totalMessagesOnMondayByPersonOne: number = structure.filter(a => a.day === 1 && a.from === nameOne).length;
    let totalMessagesOnTuesdayByPersonOne: number = structure.filter(a => a.day === 2 && a.from === nameOne).length;
    let totalMessagesOnWednesdayByPersonOne: number = structure.filter(a => a.day === 3 && a.from === nameOne).length;
    let totalMessagesOnThursdayByPersonOne: number = structure.filter(a => a.day === 4 && a.from === nameOne).length;
    let totalMessagesOnFridayByPersonOne: number = structure.filter(a => a.day === 5 && a.from === nameOne).length;
    let totalMessagesOnSaturdayByPersonOne: number = structure.filter(a => a.day === 6 && a.from === nameOne).length;
    let totalMessagesOnSundayByPersonOne: number = structure.filter(a => a.day === 0 && a.from === nameOne).length;

    let totalMessagesOnMondayByPersonTwo: number = structure.filter(a => a.day === 1 && a.from === nameTwo).length;
    let totalMessagesOnTuesdayByPersonTwo: number = structure.filter(a => a.day === 2 && a.from === nameTwo).length;
    let totalMessagesOnWednesdayByPersonTwo: number = structure.filter(a => a.day === 3 && a.from === nameTwo).length;
    let totalMessagesOnThursdayByPersonTwo: number = structure.filter(a => a.day === 4 && a.from === nameTwo).length;
    let totalMessagesOnFridayByPersonTwo: number = structure.filter(a => a.day === 5 && a.from === nameTwo).length;
    let totalMessagesOnSaturdayByPersonTwo: number = structure.filter(a => a.day === 6 && a.from === nameTwo).length;
    let totalMessagesOnSundayByPersonTwo: number = structure.filter(a => a.day === 0 && a.from === nameTwo).length;

    let totalMessagesByAll: number[] = [totalMessagesOnMonday, totalMessagesOnTuesday, totalMessagesOnWednesday, totalMessagesOnThursday, totalMessagesOnFriday, totalMessagesOnSaturday, totalMessagesOnSunday];
    let totalMessagesByAllOne: number[] = [totalMessagesOnMondayByPersonOne, totalMessagesOnTuesdayByPersonOne, totalMessagesOnWednesdayByPersonOne, totalMessagesOnThursdayByPersonOne, totalMessagesOnFridayByPersonOne, totalMessagesOnSaturdayByPersonOne, totalMessagesOnSundayByPersonOne];
    let totalMessagesByAllTwo: number[] = [totalMessagesOnMondayByPersonTwo, totalMessagesOnTuesdayByPersonTwo, totalMessagesOnWednesdayByPersonTwo, totalMessagesOnThursdayByPersonTwo, totalMessagesOnFridayByPersonTwo, totalMessagesOnSaturdayByPersonTwo, totalMessagesOnSundayByPersonTwo];

    return {
        totalMessagesByAll,
        totalMessagesByAllOne,
        totalMessagesByAllTwo
    }

}
