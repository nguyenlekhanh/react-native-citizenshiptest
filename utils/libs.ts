function getRandomNumbersArray(numberOfItems: number): number[] {
  const randomNumbers: number[] = [];

  for (let i = 0; i < numberOfItems; i++) {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

export { getRandomNumbersArray }