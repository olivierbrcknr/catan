import Airtable from "airtable";

import { AIRTABLE_BASE_ID } from "../utils/constants";

const fetchAirTableData = async () => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    AIRTABLE_BASE_ID
  );

  const cards = [];

  const getCards = () =>
    new Promise((resolve) =>
      base("Cards")
        .select()
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record) {
              cards.push({
                ...record.fields,
                id: record.id,
              });
            });

            fetchNextPage();
          },
          function done(err) {
            // callDone();
            resolve(true);
            if (err) {
              console.error(err);
              return;
            }
          }
        )
    );

  return await Promise.all([getCards()])
    .then(() => {
      return cards;
    })
    .catch(console.error);
};

export { fetchAirTableData };
