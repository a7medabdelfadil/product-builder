/**
 * Returns a sliced version of the input text if it exceeds the maximum length.
 * If the text length is less than or equal to the maximum length, returns the original text.
 * @param {string} txt - The input text to be sliced.
 * @param {number} [max=50] - The maximum length of the sliced text. Defaults to 50.
 * @returns {string} The sliced version of the input text, followed by ellipsis if it exceeds the maximum length.
 */
export function txtSlicer(txt: string, max: number = 50): string {
    if (txt.length >= max) return `${txt.slice(0, max)}...`;
    return txt;
}