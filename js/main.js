// 1 - Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomInteger = (minNumber, maxNumber) => {
  if (maxNumber > minNumber) {
    return minNumber + Math.floor(Math.random() * (maxNumber + 1 - minNumber));
  }

  return maxNumber +  Math.floor(Math.random() * (minNumber + 1 - maxNumber));
};

getRandomInteger(15, 999);
getRandomInteger(3, 1);
getRandomInteger(1, 3);
getRandomInteger(0, 1);
getRandomInteger(0, 0);

// 2 - Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFloat = (minNumber, maxNumber, decimals) => {
  let random;

  if (maxNumber > minNumber) {
    random = minNumber + Math.random() * (maxNumber - minNumber);
  } else {
    random = maxNumber +  Math.random() * (minNumber - maxNumber);
  }

  return +random.toFixed(decimals);
};

getRandomFloat(7.777, 7.778, 3);
getRandomFloat(0.777, 4.478, 4);
getRandomFloat(1.2, 1.19, 4);
