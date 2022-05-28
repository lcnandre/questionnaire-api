class Collection {
  constructor(_, items) {
    this.items = new Set();
    if (items) {
      let i = 0;
      this.items = new Set(items);
      this.items.forEach(item => this[i++] = item);
    }
  }

  getItems() {
    return Array.from(this.items);
  };

  set(items) {
    this.items = new Set();
    if (items) {
      let i = 0;
      this.items = new Set(items);
      this.items.forEach(item => this[i++] = item);
    }
  }

  count() {
    return this.items.size;
  }
}

module.exports = { Collection };
