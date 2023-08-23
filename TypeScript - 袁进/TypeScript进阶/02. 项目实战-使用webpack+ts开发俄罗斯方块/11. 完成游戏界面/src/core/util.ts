
/**
 * 根据最小值和最大值得到该范围内的随机数（无法取到最大值）
 * @param min 
 * @param max 
 */
export function getRandom(min: number, max: number) {
    const dec = max - min;
    return Math.floor(Math.random() * dec + min);
}