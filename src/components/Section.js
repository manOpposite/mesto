export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }

  clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this.clear();
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}
