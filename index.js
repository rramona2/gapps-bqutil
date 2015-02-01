'use strict';

function BQUtil(options) {
  var _self = this;
  var _defaultTimeout = options.timeout || 30000;
  var _projectID = options.projectID;

  if (!_projectID) {
    var msg = 'You forgot to set a project number - No BQ for you!';
    error(msg);
  }

  _self.executeQuery = function(cmd, timeout) {
    var queryResults;
    try {
      var queryRequest = BigQuery.newQueryRequest();

      queryRequest.setQuery(cmd).setTimeoutMs(timeout || _defaultTimeout);
      queryResults = BigQuery.Jobs.query(queryRequest, _projectID);

      var resultCount = queryResults.getTotalRows();
      var resultSchema = queryResults.getSchema();

      var resultValues = new Array(parseInt(resultCount));
      if (resultCount === 0) {
        return resultValues;
      }

      var tableRows = queryResults.getRows();
      var cols;

      for (var i = 0; i < tableRows.length; i++) {
        cols = tableRows[i].getF();

        resultValues[i] = new Array(cols.length);
        for (var j = 0; j < cols.length; j++) {
          resultValues[i][j] = cols[j].getV();
        }
      }

      return {
        resultSet: resultValues,
        columns: cols,
        count: resultCount,
        schema: resultSchema
      };
    } catch (ex) {
      error(ex);
      return;
    }
  };

  function error(msg) {
    Logger.log(msg);
    Browser.msgBox(msg);
  }
}

String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp('\\{' + i + '\\}', 'gm');
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
};

module.exports = BQUtil;