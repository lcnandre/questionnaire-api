function wrap(entity) {
  entity['assign'] = function(obj) {
    Object.assign(entity, obj);
  };

  return entity;
}

module.exports = { wrap };
