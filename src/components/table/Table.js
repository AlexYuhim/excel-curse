/* eslint-disable indent */
import { ExcelComponent } from '@/core/ExcelComponent';
import { createTable } from './table.template';
import { resizeTable } from './table.resize';
import { shouldResize } from './table.function';

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
    if (shouldResize(event)) {
      resizeTable(this.$root, event);
    }
  }
}
