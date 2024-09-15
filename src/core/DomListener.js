import { inUpperCase } from './utils';
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const metod = getMetodName(listener);

      if (!this[metod]) {
        throw new Error(`method ${metod} is not implemented in  ${this.name} `);
      }
      this[metod] = this[metod].bind(this);
      this.$root.on(listener, this[metod]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const metod = getMetodName(listener);

      this.$root.off(listener, this[metod]);
    });
  }
}

function getMetodName(name) {
  return 'on' + inUpperCase(name);
}
