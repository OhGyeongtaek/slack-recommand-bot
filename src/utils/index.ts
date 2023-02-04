export const shuffle = <T extends Array<any>>(arr: T): T => {
  const newArr = structuredClone(arr);

  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};
