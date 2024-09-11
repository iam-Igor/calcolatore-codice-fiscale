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
    `https://api.miocodicefiscale.com/calculate?lname=${cognome}
    &fname=${nome}&gender=${sesso}&city=${luogo}
    &state=${provincia}&day=${giorno}&month=${mese}
    &year=${anno}&access_token=${api}`
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
