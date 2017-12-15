define(["jquery.plugins", "hbs!./myWidget", "css!./myWidget"], function(
  $,
  template
) {
  "use strict";

  /**
   * Books widget.
   * @class myWidget
   * @memberof views.myWidget
   */
  return $.widget("ux.myWidget", {
    options: {
      className: "ux-widget",
      title: "Unavailable",
      books: []
    },

    _create: function() {
      this._render();
      this._bindListener();
      this._super();
    },

    _setOption: function(key, value) {
      this.options[key] = value;

      if (key === "books") {
        this._render();
        // this._loadData();
      }
    },

    /**
     * The imported template should be used here to create the layout.
     * @private
     */
    _render: function() {
      var { books } = this.options;

      this.element.addClass(this.options.className);
      // create the dom of this gadget using its template
      this.element.html(template({ books }));
    },

    _loadData: function() {
      this._getFilters();
    },

    _loadFilters: function() {
      axios
        .get("/filters")
        .then(({ data }) => {
          dispatch({
            type: FETCH_FILTER_FULFILLED,
            payload: data
          });
        })
        .catch(err => {
          dispatch({
            type: FETCH_FILTER_REJECTED,
            payload: err
          });
        });
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

      self.element.on("click", "#submit", function() {
        self._trigger("fetch", null, {
          handle: self.element.find("#handle").val()
        });
      });

      self.element.on("keyup", "#handle", function() {
        if (event.keyCode === 13) {
          $("#submit").click();
        }
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
