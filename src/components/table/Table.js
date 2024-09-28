/* eslint-disable indent */
import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@/core/Dom';
// import { $ } from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'table',
      listener: ['mousedown'],
    });
  }
  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    const $resizer = $(event.target);
    console.log($resizer.$el);
    if (Object.values($resizer.$el.dataset).join('') === 'row') {
      const $parent = $resizer.closest('.row');
      const $coord = $parent.coords();

      document.onmousemove = (e) => {
        $resizer.$el.classList.add('_move');
        const $delta = e.pageY - $coord.bottom;
        $parent.$el.style.height = $coord.height + $delta + 'px';
      };
      document.onmouseup = () => {
        $resizer.$el.classList.remove('_move');
        document.onmousemove = null;
      };
    }

    if (Object.values($resizer.$el.dataset).join('') === 'col') {
      const $parent = $resizer.closest('[data-col]');
      const $coord = $parent.coords();
      const $nameCol = `[data-col="${$parent.$el.dataset.col}"]`;
      const $allCol = $().all($nameCol);
      document.onmousemove = (e) => {
        $resizer.$el.classList.add('_move');
        const $delta = e.pageX - $coord.right;
        $allCol.forEach((col) => {
          col.style.width = $coord.width + $delta + 'px';
        });
      };
      document.onmouseup = () => {
        $resizer.$el.classList.remove('_move');
        document.onmousemove = null;
      };
    }
  }
}
