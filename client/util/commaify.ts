export function commaify(text: number|undefined) {
    if (!text) return
    const pieces = text.toString().split('.');
    pieces[0] = pieces[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return pieces.join('.');
}