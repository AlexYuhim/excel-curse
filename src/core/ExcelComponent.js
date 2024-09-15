import { DomListener } from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}, lala = '') {
    super($root, options.listener);
    this.name = options.name || '';
  }

  init() {
    this.initDOMListeners();
  }
  removeInit() {
    this.removeDOMListeners();
  }
  toHTML() {
    return '';
  }
}
