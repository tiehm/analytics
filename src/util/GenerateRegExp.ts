export function GenerateRegExp (nameOne: string, nameTwo: string) : {
    NameOneRegex: RegExp;
    NameTwoRegex: RegExp;
} {
    return {
        NameOneRegex: new RegExp('\\s-\\s' + nameOne + ':\\s', 'g'),
        NameTwoRegex: new RegExp('\\s-\\s' + nameTwo + ':\\s', 'g')
    }
}
