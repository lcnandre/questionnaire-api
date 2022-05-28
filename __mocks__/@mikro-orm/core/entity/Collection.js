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

  add(items) {
    if (items && items.length) {
      for (const item of items) {
        this.items.add(item);
      }

      let i = 0;
      this.items.forEach(item => this[i++] = item);
    }
  }

  remove(items) {
    if (items && items.length) {
      for (const item of items) {
        this.items.delete(item);
      }
  
      let i = 0;
      this.items.forEach(item => this[i++] = item);
    }
  }

  count() {
    return this.items.size;
  }
}

module.exports = { Collection };
