define(["jquery.plugins", "hbs!./myWidget", "css!./myWidget"], function(
  $,
  template
) {
  "use strict";

  /**
   * Tweets widget.
   * @class myWidget
   * @memberof views.myWidget
   */
  return $.widget("ux.myWidget", {
    options: {
      className: "ux-widget",
      title: "Unavailable",
      tweets: []
    },

    _create: function() {
      this._render();
      this._bindListener();
      this._super();
    },

    _setOption: function(key, value) {
        this.options[key] = value;

        if (key === 'repos') {
          this._render();
        }
    },

    /**
     * The imported template should be used here to create the layout.
     * @private
     */
    _render: function() {
      var repos = this.options.repos;

      // if (!repos.length) {
      //   logger.error(
      //     "Error::render, Our person's list is empty, thus we cannot draw."
      //   );

      //   return;
      // }

      this.element.addClass(this.options.className);
      // create the dom of this gadget using its template
      this.element.html(template({ repos }));
    },

    /**
     * Bind event listener.
     * @private
     */
    _bindListener: function() {
      var self = this,
        $handle = self.element.find(".handle");

      $handle.on("change", function() {
        // lorem
      });

      self.element.on("click", ".submit", function() {
        self._trigger("getrepos", null, { handle: self.element.find(".handle").val() });
      });
    },

    /**
     * Clean up.
     * @private
     */
    _destroy: function() {
      this._super();
    }
  });
});
