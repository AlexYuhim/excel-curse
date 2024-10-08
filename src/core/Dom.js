class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.innerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  css(style = {}) {
    Object.keys(style).forEach((key) => (this.$el.style[key] = style[key]));

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  parent(selector) {
    return this.$el.parentNode;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  coords(selector) {
    return this.$el.getBoundingClientRect(selector);
  }

  all(selector) {
    return Array.from(document.querySelectorAll(selector));
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
