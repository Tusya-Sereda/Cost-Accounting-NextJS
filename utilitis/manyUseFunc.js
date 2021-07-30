// export const validationWhere = (value) => {
//   const flag = !!value.match(/(^[a-zA-Z0-9]+$)/);
//   return flag;
// }

// export const validationHowMuch = (value) => {
//   const flag = !!value.match(/(^[1-9]+$)/);
//   return flag;
// }

function validationWhere(value) {
  const flag = !!value.match(/(^[a-zA-Z0-9]+$)/);
  return flag;
}

function validationHowMuch(value) {
  const flag = !!value.match(/(^[1-9]+$)/);
  return flag;
}

module.exports = { validationWhere, validationHowMuch };
