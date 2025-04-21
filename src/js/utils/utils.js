export const concatStateInitials = function (searchedLocation) {
  let stateInitials = "";
  let wordsArr = [];

  wordsArr = searchedLocation?.state?.split(" ");

  if (wordsArr.length > 1)
    stateInitials = wordsArr
      .map((name) => (name.length > 2 ? name[0] : ""))
      .join("");
  else stateInitials = wordsArr[0][0] + wordsArr[0][1];

  return stateInitials;
};
