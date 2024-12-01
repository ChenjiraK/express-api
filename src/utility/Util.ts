export const isEmpty = (obj: any): boolean => {
    if (obj === null || obj === undefined || obj === '') {
        return true;
    }
    if (obj == null || obj == '') {
        return true;
    }
    let str = JSON.stringify(obj);
    return (str == '{}' || str == '[]') ? true : false;
}