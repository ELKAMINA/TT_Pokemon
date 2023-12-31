import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
 // detect user language
 // learn more: https://github.com/i18next/i18next-browser-languageDetector
 .use(LanguageDetector)
 // pass the i18n instance to react-i18next.
 .use(initReactI18next)
 // init i18next
 // for all options read: https://www.i18next.com/overview/configuration-options
 .init({
  //   debug: true,
  fallbackLng: "en",
  interpolation: {
   escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
   en: {
    translation: {
     searchbar: {
      label: "Search a pokemon...",
     },
     listcard: {
      loadingData: "Data is loading...",
      loadingEnd: "That's all folks!",
      goTop: "Go to top",
     },
     filters: {
      descendingPrices: "Descending prices",
      ascendingPrices: "Ascending prices",
      choice: "Filters: ",
     },
     card: {
      addCart: "Add",
      price: "Unit price: ",
     },
     cart: {
      title: "Your cart",
      empty: "No items added",
      unitPrice: "Unit price",
      totalPrice: "Total price",
      delete: "Empty cart",
      see: "See cart",
     },
    },
   },
   fr: {
    translation: {
     searchbar: {
      label: "Trouve ton pokemon...",
     },
     listcard: {
      loadingData: "Les données arrivent...",
      loadingEnd: "La fin justifie les moyens ...",
      goTop: "Retour en haut",
     },
     filters: {
      descendingPrices: "Prix descendants",
      ascendingPrices: "Prix ascendants",
      choice: "Filtres: ",
     },
     card: {
      addCart: "Ajouter",
      price: "Prix unitaire: ",
     },
     cart: {
      title: "Votre panier",
      empty: "Aucun article ajouté",
      unitPrice: "Prix unitaire",
      totalPrice: "Prix total",
      delete: "Vider le panier",
      see: "Voir le panier",
     },
    },
   },
  },
 });

export default i18n;
