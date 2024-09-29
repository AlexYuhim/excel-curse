/* eslint-disable indent */
const CODES = {
  A: 65,
  Z: 90,
};
function toCol(el) {
  return `
     <div class="column" data-col='col${el}' >
     ${el}
     <div class="col-resize" data-resizer="col"></div>
     </div>
    `;
}
function toCell(el, index) {
  return `
      <div 
      class="cell
      "contenteditable  data-col="${
        'col' + String.fromCharCode(CODES.A + index)
      }">
      ${el} 
      </div>
    `;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}
function createRow(content, i) {
  const resize = i ? '<div class="row-resize"  data-resizer="row"></div>' : '';
  return `
    <div class="row" data-col >
    <div class="row-info">${i ? i : ''}
    ${resize}
    </div>
    <div class="row-data">${content}</div>
    </div>
    `;
}
export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill('').map(toChar).map(toCol).join('');
  const cell = new Array(colsCount).fill('').map(toCell).join('');

  const rows = [];
  rows.push(createRow(cols));
  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cell, i + 1));
  }
  return rows.join('');
}
