export const randomNum = (num: number) => {
    const result = Math.floor(Math.random() * (num - 100 + 1)) + num / 2;
    return result;
};
