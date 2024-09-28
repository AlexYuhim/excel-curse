/* eslint-disable indent */
import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@/core/Dom';

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
    console.log($resizer.data.resize);

    let valueMove;
    if ($resizer.data.resize === 'row') {
      const $parent = $resizer.closest('.row');
      const $coord = $parent.coords();
      document.onmousemove = (e) => {
        console.log('onmousemove');

        $resizer.$el.classList.add('_move');
        valueMove = e.pageY - $coord.bottom;
        $parent.$el.style.height = $coord.height + valueMove + 'px';
      };

      document.onmouseup = () => {
        $resizer.$el.classList.remove('_move');
        document.onmousemove = null;
      };
    }

    if ($resizer.data.resize === 'col') {
      const $parent = $resizer.closest('[data-col]');
      const $coord = $parent.coords();
      const $nameCol = `[data-col="${$parent.data.col}"]`;
      const $allCol = this.$root.all($nameCol);

      document.onmousemove = (e) => {
        $resizer.$el.classList.add('_move');
        valueMove = e.pageX - $coord.right;
        $parent.$el.style.width = $coord.width + valueMove + 'px';
      };

      document.onmouseup = () => {
        $resizer.$el.classList.remove('_move');
        $allCol.forEach((col) => {
          col.style.width =
            $coord.width + valueMove < 0
              ? '40px'
              : $coord.width + valueMove + 'px';
        });
        document.onmousemove = null;
      };
    }
  }
}
