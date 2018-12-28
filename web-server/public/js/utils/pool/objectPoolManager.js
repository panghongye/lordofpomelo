__resources__["/objectPoolManager.js"] = {
  meta: { mimetype: "application/javascript" },
  data: function(exports, require, module, __filename, __dirname) {
    /**
     * Module dependencies
     */
    class ObjectPoolManager {
      constructor() {
        this.pools = {}
      }
      //Add pool named name to pools
      addPool(name, pool) {
        this.pools[name] = pool
      }
      //get pool named name from pools
      getPool(name) {
        return this.pools[name]
      }
    }

    module.exports = ObjectPoolManager
  },
}
