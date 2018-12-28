__resources__["/animation.js"] = {
  meta: { mimetype: "application/javascript" },
  data: function(exports, require, module, __filename, __dirname) {
    /**
     * Module dependencies
     */

    var FrameAnimation = require("frameanimation").FrameAnimation,
      imgAndJsonUrl = require("config").IMAGE_URL,
      dataApi = require("dataApi"),
      app = require("app")

    /**
     * Initialize a new 'Animation' with the given 'opts'
     *
     * @param {Object} opts
     * @api public
     */
    class Animation {
      constructor(opts) {
        this.kindId = opts.kindId
        this.type = opts.type
        this.name = opts.name
      }
      /**
       * Create animation, each node owns four basic animations
       * standAnimation, walkAnimation, diedAnimation and attackAnimation
       *
       * @api public
       */
      create() {
        var animationData = this.getJsonData()
        var width = parseInt(animationData.width)
        var height = parseInt(animationData.height)
        var totalFrames = parseInt(animationData.totalFrame)
        var img = this.getImage(),
          ani
        ani = new FrameAnimation({
          image: img,
          w: width - 5,
          h: height - 5,
          totalTime: totalFrames * 80,
          interval: 80,
          HSpan: width,
          VSpan: height,
        })
        ani.name = this.name
        return ani
      }
      /**
       * Get animation's jsonData.
       *
       * @api public
       */
      getJsonData() {
        var id = this.kindId,
          type = this.type,
          name = this.name,
          data
        data = dataApi.animation.get(id)[name]
        if (!!data) {
          return data
        } else {
          console.error("the jsonData :" + id + "/" + name + ".json is not exist!")
        }
      }
      /**
       * Get animation's iamge.
       *
       * @api public
       */
      getImage() {
        var id = this.kindId,
          type = this.type,
          name = this.name
        var aniIamgeUrl
        aniIamgeUrl = imgAndJsonUrl + "animationPs3/" + id + "/" + name + ".gif"
        var ResMgr = app.getResMgr()
        var img = ResMgr.loadImage(aniIamgeUrl)
        if (!!img) {
          return img
        } else {
          console.error("the iamge :" + id + "/" + name + ".gif is not exist!")
        }
      }
    }

    module.exports = Animation
  },
}
