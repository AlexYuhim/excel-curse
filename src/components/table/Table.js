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
    return createTable(100);
  }

  onMousedown(event) {
    if (event.target.dataset.resizer) {
      const $resizer = $(event.target);
      const typeResizer = event.target.dataset.resizer;
      console.log('typeResizer', typeResizer);

      let valueMove;

      const $parent = $resizer.closest('[data-col]');
      const $coord = $parent.coords();
      const $allCol = this.$root.all(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = (e) => {
        if (typeResizer === 'col') {
          $resizer.$el.classList.add('_move');
          valueMove = e.pageX - $coord.right;

          $parent.css({
            width: $coord.width + valueMove + 'px',
          });
        } else {
          $resizer.$el.classList.add('_move');
          valueMove = e.pageY - $coord.bottom;
          $parent.css({
            height: $coord.height + valueMove + 'px',
          });
        }
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
