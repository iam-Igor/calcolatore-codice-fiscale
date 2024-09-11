export const calculate = (
  cognome,
  nome,
  sesso,
  luogo,
  provincia,
  giorno,
  mese,
  anno,
  api
) => {
  return fetch(
    `https://api.miocodicefiscale.com/calculate?lname=${cognome}&fname=${nome}&gender=${sesso}&city=${luogo}&state=${provincia}&abolished=${false}&day=${giorno}&month=${mese}&year=${anno}&omocodia_level=${1}&access_token=${api}`
  )
    .then((res) => {
      if (res.ok) {
        return res.json;
      } else {
        throw new Error("error fetching data");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
