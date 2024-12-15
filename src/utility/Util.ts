export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  if (obj == null || obj == '') {
    return true;
  }
  let str = JSON.stringify(obj);
  return str == '{}' || str == '[]' ? true : false;
};

export const randomCharacter = (length = 1) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const cleanObjectEmptyStr = (object: any) => {
  let cleanObject: any = {};
  for (const i in object) {
    if (!isEmpty(object[i])) {
      cleanObject[i] = object[i];
    }
  }
  return cleanObject;
};
