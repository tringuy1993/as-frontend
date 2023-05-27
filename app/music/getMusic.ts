function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function selectRandomAnswers(list, specificSong) {
  const randomValues = [specificSong];
  const remainingValues = list?.filter(
    (item) => item?.song !== specificSong?.song
  );
  const numRandomValues = 3;

  for (let i = 0; i < numRandomValues; i++) {
    const randomIndex = Math.floor(Math.random() * remainingValues.length);
    randomValues.push(remainingValues[randomIndex]);
  }

  shuffleArray(randomValues);
  return randomValues;
}

export function findSongByIndex(list, index) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].index === index) {
      return list[i];
    }
  }
  return null; // return -1 if index is not found
}

export const buttonUrls = [
  "/MusicGame/1950",
  "/MusicGame/1960",
  "/MusicGame/1970",
  "/MusicGame/1980",
  "/MusicGame/1990",
  "/MusicGame/2000-2004",
  "/MusicGame/2005-2009",
  "/MusicGame/2010-2014",
  "/MusicGame/2015-2019",
  "/MusicGame/2020-2024",
  "/MusicGame/Films",
  "/MusicGame/Gay Icons",
  "/MusicGame/TV",
  "/MusicGame/Classical",
  "/MusicGame/Rock",
  "/MusicGame/Dance",
  "/MusicGame/Hip Hop",
];
