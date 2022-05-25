export function ellipsisSandwich(text:string, charsPerSide:number) {
    if (text.length <= charsPerSide * 2 + 3) {
        return text;
    }
    return `${text.slice(0, charsPerSide)}...${text.slice(
        text.length - charsPerSide,
        text.length,
    )}`;
}
