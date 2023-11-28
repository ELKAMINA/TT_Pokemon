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
  name,
  supertype,
  subtypes,
  hp,
  types,
  abilities,
  attacks,
  weaknesses,
  artist,
  rarity,
  nationalPokedexNumbers,
  images,
 } = card;

 let im;
 if (nationalPokedexNumbers?.length > 0) {
  if (nationalPokedexNumbers[0] >= 649) {
   im =
    "https://www.freeiconspng.com/thumbs/error-icon/orange-error-icon-0.png";
  } else
   im = `https://veekun.com/dex/media/pokemon/dream-world/${nationalPokedexNumbers[0]}.svg`;
 }
 let newCard = {
  svgImage: im,
  title:
   nationalPokedexNumbers?.length > 0
    ? `${name} #${nationalPokedexNumbers[0]}`
    : `${name}`,
  hp: `HP ${hp}` || "Unknown",
  subtitle: `${supertype} - ${subtypes}`,
  image: images.small ? images?.small : images.large,
  types: fnTypes(types, hp),
  ability: fnAbility(abilities, powers),
  attacks: fnAttacks(attacks),
  weaknesses,
  artist,
  rarity,
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

export default pokemonInfo;
