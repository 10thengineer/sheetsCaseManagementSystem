// @OnlyCurrentDoc
function onOpen(){
  SpreadsheetApp.getUi()
    .createMenu("Phoenix Database")
    .addItem("Activate Database", "searchForm")
    .addToUi();
}

function addForm() {
  var addTemplate = HtmlService.createTemplateFromFile("entryUI");

  var addHtml = addTemplate.evaluate();
  addHtml.setHeight(500).setWidth(800);//

  SpreadsheetApp.getUi().showModalDialog(addHtml,"Add Phoenix Shelter Friends");
  //showSidebar(html);

}

function searchForm() {

  var searchTemplate = HtmlService.createTemplateFromFile("searchUI");

  var searchHtml = searchTemplate.evaluate();
  searchHtml.setHeight(500).setWidth(800);//
  SpreadsheetApp.getUi().showModalDialog(searchHtml,"Search Phoenix Shelter Friends");
  //showSidebar(html);

}

function editForm(eventItem) {
  var cache = CacheService.getScriptCache();
  cache.put('selectedIndex', eventItem);

  var editTemplate = HtmlService.createTemplateFromFile("editUI");

  var editHtml = editTemplate.evaluate();
  editHtml.setHeight(500).setWidth(800);//
  SpreadsheetApp.getUi().showModalDialog(editHtml,"Add Phoenix Shelter Friends");
}

function appendData(data){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataID= ws.getLastRow() + 1;
  ws.appendRow([dataID,data.nameF,data.nameL,data.dob,data.workerNotes]);
}

// normalizeValues alters the values and types of data in certain cells such that it is compatible with Google's App Script asynchronous callbacks.
// For example, when the Date type is present in a Range returned from a function, the function call will succeed but will yield null to a callback instead of the returned value.
// https://developers.google.com/apps-script/guides/html/reference/run#myFunction(...)
function normalizeValues(range) {
  if (!range) {
    return dataValues;
  }

  for (var row = 0; range && row < range.length; row++) {
    if (!range[row]) {
      continue;
    }

    for (var col = 0; range[row] && col < range[row].length; col++) {
      if (typeof range[row][col].toLocaleDateString === 'function') {
        range[row][col] = range[row][col].toLocaleDateString();
      }
    }
  }
  return range;
}

function getData(){
  var datasheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowBound = datasheet.getLastRow()-2;
  var columnBound = 5;//datasheet.getLastColumn();
  var dataValues = datasheet.getRange(3,1,rowBound,columnBound).getValues();
  normalizeValues(dataValues);
  return dataValues;
}

function selectedData(){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cache = CacheService.getScriptCache();
  var selectedRange = cache.get('selectedIndex');
  var selection = ws.getRange(selectedRange).getValues();
  normalizeValues(selection);
  return selection;

}

function selectedNotation(){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var cache = CacheService.getScriptCache();
  var selectedRange = cache.get('selectedIndex');
  normalizeValues(selectedRange);
  return selectedRange;
}
function editData (data,arange){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var selection = ws.getRange(arange);
  selection.setValues([data]);
}

function deleteCells(arange) {
 var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
 var lastRow = ws.getLastRow();
  var rangeSplit = arange.split(":");
  var rangeNum = rangeSplit[0].split("A");
  var newARange = "B" + rangeNum[1] + ":" + rangeSplit[1];
  ws.getRange(newARange).deleteCells(SpreadsheetApp.Dimension.ROWS);
  ws.deleteRow(lastRow);

}

function showAlert(arange) {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to delete this entry?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Entry Deleted');
    deleteCells(arange);
    searchForm();
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Deletion Canceled');
    editForm(arange);
  }
}

/* References:
https://www.youtube.com/watch?v=4Hz36tiqEPE
https://www.youtube.com/watch?v=Q9aYU1Ufkpk
*/
