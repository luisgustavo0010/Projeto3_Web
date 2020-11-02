module.exports.getAnime = (anime) => {
  return {
    img: anime.info[0]._attributes.src,
    title: anime._attributes.name,
    creditos:
      (anime.credit.task ? anime.credit.task._text : null) +
      ": " +
      (anime.credit.company ? anime.credit.company._text : null),
    staff0:
      (anime.staff.length >= 1 ? anime.staff[0].task._text : null) +
      ": " +
      (anime.staff.length >= 1 ? anime.staff[0].person._text : null),
    staff1:
      (anime.staff.length >= 2 ? anime.staff[1].task._text : null) +
      ": " +
      (anime.staff.length >= 2 ? anime.staff[1].person._text : null),
    staff2:
      (anime.staff.length >= 3 ? anime.staff[2].task._text : null) +
      ": " +
      (anime.staff.length >= 3 ? anime.staff[2].person._text : null),
  };
};
