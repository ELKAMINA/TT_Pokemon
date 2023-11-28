import { v4 as uuidv4 } from "uuid";

const powers = {
 "Poké-Body": "#5FBD58",
 "Poké-Power": "#D3425F",
 "Pokémon Power": "#FA8581",
 Ability: "#CC0000",
};

const pokemonInfo = (card) => {
 if (!card) return;
 if (typeof card === "string") return card;

 const {
  id,
  name,
  supertype,
  subtypes,
  hp,
  types,
  evolvesFrom,
  abilities,
  attacks,
  weaknesses,
  retreatCost,
  convertedRetreatCost,
  set,
  number,
  artist,
  rarity,
  flavorText,
  nationalPokedexNumbers,
  legalities,
  images,
  tcgplayer,
  cardmarket,
 } = card;

 //  console.log("hp ", hp);
 //  console.log("name ", name);
 //  console.log("nationalPokedexNumber ", nationalPokedexNumbers);
 //  console.log("types  ", types);
 //  console.log("subtype ", subtypes);
 //  console.log("supertype ", supertype);
 //  console.log("ability ", abilities);
 //  console.log("weaknesses ", weaknesses);
 let newCard = {
  svgImage:
   nationalPokedexNumbers?.length > 0
    ? `https://veekun.com/dex/media/pokemon/dream-world/${nationalPokedexNumbers[0]}.svg`
    : "",
  title:
   nationalPokedexNumbers?.length > 0
    ? `${name} #${nationalPokedexNumbers[0]}`
    : `${name}`,
  hp: `HP ${hp}` || "Unknown",
  subtitle: `${supertype} - ${subtypes}`,
  image: images.small ? images?.small : images.large,
  types: fnTypes(types, hp),
  ability: fnAbility(abilities, powers),
  // rules: fnRules(rules),
  attacks: fnAttacks(attacks),
  // miscellaneous: fnMiscellaneous({
  weaknesses,
  //  //  resistances,
  //  retreatCost,
  artist,
  rarity,
  //  set,
  // }),
 };

 return newCard;
};

//TYPES
const fnTypes = (data = [], hp) =>
 data.map((name) => {
  return {
   index: uuidv4(),
   name,
   text: `HP ${hp || "Unknown"}`,
   size: "small",
  };
 });

//ABILITY
const fnAbility = (data = null, powers) =>
 data
  ? {
     title: data.name,
     type: data.type,
     color: powers[data.type],
     text: [data.text],
    }
  : null;

//RULES
const fnRules = (data = null) =>
 data
  ? {
     title: "Rules",
     text: data,
    }
  : null;

//ATTACKS
const fnAttacks = (data = null) => {
 let newData = null;
 if (data) {
  const dataAttacks = data.map((attack) => {
   const { cost, damage } = attack;
   const dataCost = cost.map((name) => {
    return { index: uuidv4(), name, size: "small" };
   });

   return {
    ...attack,
    cost: [...dataCost],
    damage: damage && `| ${damage}`,
   };
  });

  newData = {
   title: "Attacks",
   attacks: dataAttacks,
  };
 }

 return newData;
};

//OTHERS
// const fnMiscellaneous = (data) => {
//  const { weaknesses, retreatCost, artist, rarity, set } = data;

//  const others = [
//   { title: "Weakness", data: fnMergeData(weaknesses) },
//   { title: "Retreat Cost", data: fnRetreatCost(retreatCost) },
//   { title: "Artist", data: fnMergeData(artist) },
//   { title: "Rarity", data: fnMergeData(rarity) },
//   { title: "Set", data: fnMergeData(set) },
//  ];

//  return fnFormatBoxes(others);
// };

const fnMergeData = (data) => {
 if (typeof data === "string") {
  return [{ value: data || "N/A" }];
 }

 return data || [{ value: "N/A" }];
};

// const fnRetreatCost = (data) => {
//  let newData = fnMergeData(data);
//  if (data) newData = data.map((type) => ({ type }));
//  return newData;
// };

// const fnFormatBoxes = (data) => {
//  return data?.map(({ title, data }) => {
//   const boxes = data?.map(({ type: name, value: text }) => {
//    return { index: uuidv4(), name, text, size: "xsmall" };
//   });

//   return { title, boxes };
//  });
// };

export default pokemonInfo;
