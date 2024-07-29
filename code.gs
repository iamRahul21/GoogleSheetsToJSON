function convertToJSON() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var data = sheet.getDataRange().getValues();
  
  var headers = data[0];
  var jsonData = [];
  var iconUrl = "https://static.wixstatic.com/shapes/5fce4c_974dd891b7874ea4a8067bdf338c4dcc.svg";

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var jsonObject = {
      position: {
        lat: parseFloat(row[headers.indexOf('Latitude')]),
        lng: parseFloat(row[headers.indexOf('Longitude')])
      },
      title: row[headers.indexOf('Title')],
      site: row[headers.indexOf('Site')],
      subtitle: row[headers.indexOf('Sub-title')],
      impact: row[headers.indexOf('Impact on India')],
      status: row[headers.indexOf('Conflict Status')],
      icon: {
        url: iconUrl,
        scaledSize: {
          width: 20,
          height: 20
        }
      },
      image: row[headers.indexOf('marker URL')]
    };

    jsonData.push(jsonObject);
  }
  var jsonString = JSON.stringify(jsonData, null, 2);
  var file = DriveApp.createFile('ConflictData.json', jsonString, MimeType.PLAIN_TEXT);
  Logger.log('File created: ' + file.getUrl());
}