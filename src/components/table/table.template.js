/* eslint-disable indent */
const CODES = {
  A: 65,
  Z: 90,
};
// String.fromCharCode(65)
function toCol(el) {
  return `
     <div class="column">${el}</div>
    `;
}
function toCell(el) {
  return `
      <div class="cell"contenteditable>${el}</div>
    `;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
function createRow(content, num = '') {
  return `
    <div class="row">
    <div class="row-info">${num}</div>
    <div class="row-data">${content}</div>
    </div>
    `;
}
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('');
  const cell = new Array(colsCount).fill('').map(toCell).join('');
  console.log(cell);

  const rows = [];
  rows.push(createRow(cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cell, i + 1));
  }
  return rows.join('');
}
