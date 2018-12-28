__resources__["/dataApi.js"] = {
  meta: {
    mimetype: "application/javascript",
  },

  data: function(exports, require, module, __filename, __dirname) {
    class Data {
      constructor(key) {
        this.key = key
        this.data = null
      }
      set(data) {
        this.data = data
        var self = this
        setTimeout(function() {
          localStorage.setItem(self.key, JSON.stringify(data))
        }, 300)
      }
      findById(id) {
        var data = this.all()
        return data[id]
      }
      all() {
        if (!this.data) {
          this.data = JSON.parse(localStorage.getItem(this.key)) || {}
        }
        return this.data
      }
    }

    // animation data
    class AnimationData {
      constructor() {
        this.data = {}
      }
      set(data) {
        data || (data = {})
        this.data = data
        setTimeout(function() {
          for (var k in data) {
            localStorage.setItem("ani_" + k, JSON.stringify(data[k]))
          }
        }, 600)
      }
      get(id) {
        var ani = this.data[id]
        if (!ani) {
          ani = JSON.parse(localStorage.getItem("ani_" + id)) || {}
        }
        return ani
      }
    }

    class Effect {
      constructor(data) {
        this.key = "effect"
      }
      set(data) {
        localStorage.setItem(this.key, JSON.stringify(data))
      }
      all(id) {
        return JSON.parse(localStorage.getItem(this.key)) || {}
      }
      findById(id) {
        var data = this.all()
        var i, result
        for (i in data) {
          if (data[i].id == id) {
            result = data[i]
            break
          }
        }
        return result
      }
    }

    exports.getVersion = function() {
      return JSON.parse(localStorage.getItem("version")) || {}
    }

    exports.setVersion = function(version) {
      localStorage.setItem("version", JSON.stringify(version))
    }

    exports.fightskill = new Data("fightskill")
    exports.equipment = new Data("equipment")
    exports.item = new Data("item")
    exports.character = new Data("character")
    exports.npc = new Data("npc")
    exports.animation = new AnimationData()
    exports.effect = new Effect()

    exports.setData = function(data) {
      if (data) {
        var obj
        for (var i in data) {
          obj = exports[i]
          if (obj && obj.set) {
            obj.set(data[i])
          }
        }
      }
    }
  },
}
