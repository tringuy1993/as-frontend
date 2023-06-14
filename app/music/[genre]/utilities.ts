export const createRandomChoices = (songsNames, songObj) => {
  const removeSelected = songsNames.filter(function (obj) {
    return (
      obj.index !== songObj.index &&
      obj.artist !== songObj.artist &&
      obj.song !== songObj.song
    );
  });
  var shuffledList = removeSelected.sort(function () {
    return 0.5 - Math.random();
  });
  const randomValues = shuffledList.slice(0, 3);
  randomValues.push(songObj);
  randomValues.sort(function () {
    return 0.5 - Math.random();
  });

  return randomValues;
};
