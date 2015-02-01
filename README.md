# gapps-bq

bq util functions for google-apps-script

# example

```javascript
function ExampleRunner() {
  var bq = new BQUtil({
    projectID: 123
  });

  var sql = 'SELECT Gravity FROM SolarSystem.Stars where Mass = "{0}" LIMIT 1';
  var params = '5.972E24'; // earth
  var cmd = String.format(sql, params);
  var rslt = bq.executeQuery(cmd);
  
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow(results.resultSet[0]); 
}
```

## license 
MIT (see [LICENSE](https://github.com/streamrail/gapps-bgutil/blob/master/LICENSE) file)