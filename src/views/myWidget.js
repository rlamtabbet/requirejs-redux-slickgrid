define(
  [
    "jquery.plugins",
    "axios",
    "constants/index",
    "vo/bookVO",
    "hbs!./myWidget",
    "css!./myWidget"
  ],
  function($, axios, constants, bookVO, template) {
    "use strict";

    const {
      FETCH_DATA_PENDING,
      FETCH_DATA_FULFILLED,
      FETCH_DATA_REJECTED
    } = constants;

    /**
     * Books widget.
     * @class myWidget
     * @memberof views.myWidget
     */
    return $.widget("ux.myWidget", {
      options: {
        className: "ux-widget",
        title: "Unavailable"
      },

      _create: function() {
        this.dataStore = this.options.store;

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
        const self = this;
        const store = this.dataStore;
        const { books = [] } = this.options;

        this.element.addClass(this.options.className);
        // create the dom of this gadget using its template

        const parseBooksState = ({ books }) =>
          books.items.map(curr => new bookVO(curr.volumeInfo));

        this.unsubscribe = store.subscribe(() => {
          const books = parseBooksState(store.getState());

          self.option("books", books);
          logger.info("Store Changed", store.getState());
        });

        this.element.html(template({ books }));
      },

      _fetchData: function(event, data) {
        console.log(data);
        this.dataStore.dispatch(dispatch => {
          dispatch({
            type: FETCH_DATA_PENDING,
            payload: data.handle
          });
          axios
            .get(
              `https://www.googleapis.com/books/v1/volumes?q=${
                data.handle
              }&maxResults=40`
            )
            .then(({ data }) => {
              dispatch({
                type: FETCH_DATA_FULFILLED,
                payload: data
              });
            })
            .catch(err => {
              dispatch({
                type: FETCH_DATA_REJECTED,
                payload: err
              });
            });
        });
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
          $handle = self.element.find("#handle");

        self._on("fetch", this._fetchData.bind(this));

        self.element.on("click", "#submit", function() {
          // self._trigger("fetch", null, {
          //   handle: $handle.val()
          // });
          self._fetchData(null, {
            handle: $handle.val()
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
        // Unsubscribe from the redux store
        this.unsubscribe();
        this._super();
      }
    });
  }
);
