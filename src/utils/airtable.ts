import Airtable from "airtable";

const fetchAirTableData = async () => {
  console.log("fetching data from airtable");

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );

  let allData = {
    events: [],
    rules: [],
  };

  let doneCounter = 0;

  const callDone = () => {
    doneCounter++;
    if (doneCounter >= 2) {
      console.log("all fetched");
      return allData;
    }
  };

  const getEvents = () =>
    new Promise((resolve, reject) =>
      base("Events")
        .select()
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record) {
              allData.events.push({
                ...record.fields,
                id: record.id,
              });
            });

            fetchNextPage();
          },
          function done(err) {
            callDone();
            resolve(true);
            if (err) {
              console.error(err);
              return;
            }
          }
        )
    );

  const getRules = () =>
    new Promise((resolve, reject) =>
      base("Rules")
        .select()
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record) {
              allData.rules.push({
                ...record.fields,
                id: record.id,
              });
            });

            fetchNextPage();
          },
          function done(err) {
            callDone();
            resolve(true);
            if (err) {
              console.error(err);
              return;
            }
          }
        )
    );

  return await Promise.all([getRules(), getEvents()])
    .then(() => {
      return allData;
    })
    .catch(console.error);
};

export { fetchAirTableData };
