// @OnlyCurrentDoc
/*ISSUES TO FIX
When entering a date,such as 10/10/2020, google makes it into its own special datatype- 
the way the search function is set up, any dates in this format causes the 
displayed items to stop working. However adding a single character such as 10/10/2020c 
will let it work again because google only recognizes that as a string (I think).
Display will not work if there is no data in birthday column
*/
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
  //var test = cache.get('selectedIndex');

  var editTemplate = HtmlService.createTemplateFromFile("editUI");
  
  var editHtml = editTemplate.evaluate();
  //editTemplate.append('Hello World');
  editHtml.setHeight(500).setWidth(800);//
  SpreadsheetApp.getUi().showModalDialog(editHtml,"Add Phoenix Shelter Friends");
  //showSidebar(html);*/
  
}

function appendData(data){
 var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataID= ws.getLastRow() + 1;
  ws.appendRow([dataID,data.nameF,data.nameL,data.workerNotes]);
  
}
// NEW

function searchUpdate(){
  //Logger.clear();
    var datasheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var dataValues = datasheet.getDataRange().getValues();
//  Logger.log(dataValues[1][1]);
  var myArray= [];
    for (var k = 0; k < dataValues.length; k++){
       myArray.push({'name':dataValues[k][0],'age':dataValues[k][1],'birthdate':dataValues[k][2]});
    }
  
}
function getData(){
   var datasheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   var rowBound = datasheet.getLastRow()-2;
   var columnBound = datasheet.getLastColumn();
   var dataValues = datasheet.getRange(3,1,rowBound,columnBound).getValues();
  return dataValues;
}
function selectedData(){
 var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   var cache = CacheService.getScriptCache();
  var selectedRange = cache.get('selectedIndex');
  var selection = ws.getRange(selectedRange).getValues();
 // ws.appendRow([dataID,data.nameF,data.nameL,data.workerNotes]);
  return selection;
  
}

function selectedNotation(){
 var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
   var cache = CacheService.getScriptCache();
  var selectedRange = cache.get('selectedIndex');
  return selectedRange;
}
function editData (data,arange){
  var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var selection = ws.getRange(arange);
  selection.setValues([data]);
  
  //
}

function deleteCells(arange) {
 var ws = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
 var lastRow = ws.getLastRow();
  var rangeSplit = arange.split(":");
  var rangeNum = rangeSplit[0].split("A");
  var newARange = "B" + rangeNum[1] + ":" + rangeSplit[1];
  //spreadsheet.getRange("A7:D7").activate();
  ws.getRange(newARange).deleteCells(SpreadsheetApp.Dimension.ROWS);
  //if (lastRow.toString() != rangeNum){
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
/*References:
https://www.youtube.com/watch?v=4Hz36tiqEPE
https://www.youtube.com/watch?v=Q9aYU1Ufkpk

*/
