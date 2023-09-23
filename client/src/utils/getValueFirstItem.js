export const getValueFirstItem = (arrs) => {
    var firstValue = "";
    for (var key in arrs) {
        firstValue = arrs[key];
        break;
    }
    return firstValue;
}