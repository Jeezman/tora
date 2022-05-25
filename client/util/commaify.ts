export function commaify(text: number) {
    if (!text) return
    const pieces = text.toString().split('.');
    pieces[0] = pieces[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return pieces.join('.');
}