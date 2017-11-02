(function() {
  define([], function() {
    var repoVO = function(name, createdAt) {
      return {
        name,
        createdAt,

        toString: function() {
          var date = new Date(this.createdAt);

          return this.name + ", (" + date.toDateString() + ")";
        }
      };
    };
    return repoVO;
  });
})();
