export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  clear() {
    this._container.innerHTML = "";
  }

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }


  renderItems(items) {
    this.clear();
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
