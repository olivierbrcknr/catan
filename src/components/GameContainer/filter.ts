import type {
  GameSettings,
  CardID,
  CardFilter,
  AirtableData,
  Event,
  Rule,
} from "./types";

const filterData = (
  airTableData: AirtableData,
  filter: CardFilter,
  settings: GameSettings
) => {
  let filteredData: AirtableData = {
    events: [],
    rules: [],
  };

  const filterFn = (v: Event | Rule) => {
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

  filteredData.events = airTableData.events.filter(filterFn);

  filteredData.rules = airTableData.rules.filter(filterFn);

  return filteredData;
};

export default filterData;
