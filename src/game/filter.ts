import type { GameSettings, CardFilter, AirtableData, Card } from "./types";

export const filterData = (
  airTableData: AirtableData,
  filter: CardFilter,
  settings: GameSettings
) => {
  let filteredData: Card[] = [];

  const filterFn = (v: Card) => {
    let shouldUse = true;

    // filter by expansion packs
    if (v?.["Expansion Packs"]) {
      let expansionsNum = v["Expansion Packs"].length;

      v?.["Expansion Packs"].forEach((exp) => {
        filter?.expansionPacks?.has(exp) && expansionsNum--;
      });

      shouldUse = expansionsNum === 0;
    }

    // remove wrong funk
    if (v.Funk > settings.funkLevel) return false;

    // remove wrong evil
    if (v.Evil > settings.evilLevel) return false;

    if (!shouldUse) return false;

    return shouldUse;
  };

  filteredData = airTableData.filter(filterFn);

  return filteredData;
};
