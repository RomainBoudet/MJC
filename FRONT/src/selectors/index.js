/**
 * fonction qui recherche l'id dans le tableau reçu
 * @param {Array} array
 * @param {string} slug
 * @return{object | undefined}
 */
 export const findIdBySlug = (array, id) => array.find((item) => item.id == id);
 /**
  * fonction qui choisit 2 id au hasard et renvoie les données du tableau reçu
  * @param {object} array
  */
 export const randomArray = (array) => {
   // on choisit 2 id au hasard
   const newArray = [];
   if (array[0].id !== 0) {
     do {
       const id = Math.floor(Math.random() * array.length);
       const same = newArray.find((element) => element.id === array[id].id);
       if (!same) {
         newArray.push(array[id]);
       }
     } while (newArray.length < 2);
     return newArray;
   }
   return array;
 };
 /**
  * fonction qui renvoi l'id le plus grand
  * @param {array} array
  */
 export const getHighestId = (array) => {
   const ids = array.map((item) => item.id);
   const maxID = ids.length === 0 ? 0 : Math.max(...ids);
   return maxID;
 };
 /**
  * fonction qui choisit dans le tableau l'id max et renvoie les données associées
  * @param {array} array 
  * @returns array
  */
 export const lastArray = (array) => {
   const newLastArray = [];
   const maxId = getHighestId(array);
   // on trouve les données correspondant à l'id
   newLastArray.push(array.find((item) => item.id == maxId));
   return newLastArray;
 };
 /**
  * fonction qui donne le label de l'article
  * @param {string} TagId
  */
  export const nameTagId = (tagId) => {
   let tag = '';
   if (tagId === '1') {
     tag = 'News';
   }
   else if (tagId === '2') {
     tag = 'Évenement';
   }
   else if (tagId === '3') {
     tag = 'Salons';
   }
   return tag;
 };
 