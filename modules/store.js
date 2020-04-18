
const searchStoreName = (model, searchText, limit, cb) => {
  return model.fuzzySearch(searchText).limit(limit).exec(cb)
}

module.exports.searchStoreName = searchStoreName