(function() {
  'use strict';

  /*==== Getting App and Chaining Configuration Functions =====*/
  angular.module('dhtorchbearer.data')
    .factory('CSVImport', csvImport);

  /*========================================================================
                                  CSVImport
  =========================================================================*/
  /*Table factory function definition*/
  function csvImport() {
    return csvImportFactoryCall;

    function csvImportFactoryCall(fields, tableData) {
      return new CSVImportFactory(fields, tableData);

      function CSVImportFactory(fields, tableData) {
        /* jshint validthis: true */
        var vm = this;

        /*Properties*/
        vm.headers = [];
        vm.data = [];
        vm.errors = [];

        /*Methods*/
        vm.read = read;
        vm.validate = validate;
        vm.create = create;

        /*Functions*/
        function read(content) {
          var readData = csvToArray(content, ',');
          //Reads CSV headers from the first entry
          vm.headers = readData[0];
          //Pushes the other entries into a separate data array
          for (var x = 1; x < readData.length-1; x++) {
            if (readData[x]!=='') vm.data.push(readData[x]);
          }
        }

        function create() {
          for (var x = 0; x < vm.data.length; x++) {
            tableData.$add(makeEntryObj(vm.data[x]));
          }
          vm.headers = [];
          vm.data = [];
          vm.errors = [];
        }

        function makeEntryObj(entry) {
          var entryObj = {};
          var orderedFields = fields.orderedFields();
          for (var x = 0; x < fields.length; x++) {
            entryObj[orderedFields[x].id] = entry[x];
          }
          return entryObj;
        }

        function validate() {
          var isValid = true;
          //Validating headers
          isValid = isValid && validHeaders();
          //Validating each entry
          for (var x = 0; x < vm.data.length; x++) {
            isValid = isValid && validEntry(vm.data[x]);
          }
          return isValid;
        }
        /*close validate*/

        function validEntry(entry) {
          var isValid = true;
          isValid = isValid && validKey(entry);
          return isValid;
        }

        function validKey(entry) {
          var checkKey = getKeyFromCSV(entry);

          for (var x = 0; x < tableData.length; x++) {
            if (tableKey(x) == checkKey) {
              vm.errors.push({
                type: 'Duplicate Entry',
                details: 'Entry with key \'' + tableKey(x) + '\' already found'
              });
              return false;
            }
          }
          return true;

          function tableKey(entryCounter) {
            return tableData.getPrimaryKey(tableData[entryCounter], fields);
          }
        }


        function getKeyFromCSV(entry) {
          var generatedKey = '';
          var keyFields = fields.primaryKeys();

          for (var x = 0; x < keyFields.length; x++) {
            if (x > 0) generatedKey += '|';
            generatedKey += entry[keyFields[x].order];
          }
          return generatedKey;
        }

        function validHeaders() {
          var validFlag = true;
          //Checking each csv header against fields, in respective order
          for (var x = 0; x < vm.headers.length; x++) {
            if (vm.headers[x] != fields[x].id) {
              validFlag = false;
              vm.errors.push({
                type: 'Invalid header',
                details: 'Header ' + vm.headers[x] + ' not found in that order in fields. ' + fields[x].id + ' found instead.'
              });
            }
          }
          //Reverse checking each field against headers, in respective order
          for (x = 0; x < fields.length; x++) {
            if (fields[x].id != vm.headers[x]) {
              validFlag = false;
              vm.errors.push({
                type: 'Invalid header',
                details: 'Field ' + fields[x].id + ' not found in that order in CSV Headers. ' + vm.headers[x] + ' found instead.'
              });

            }
          }
          return validFlag;
        }

      }
      /*close CSVImportFactory*/

    }
    /*close csvImportFactoryCall*/

  }
  /*close csvImport*/

  // Source: http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
  // This will parse a delimited string into an array of
  // arrays. The default delimiter is the comma, but this
  // can be overriden in the second argument.

  function csvToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp((
      // Delimiters.
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [
      []
    ];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];
      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If id does not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
        // Since we have reached a new row of data,
        // add an empty row to our data array.
        arrData.push([]);
      }
      // Now that we have our delimiter out of the way,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
        // We found a quoted value. When we capture
        // this value, unescape any double quotes.
        var strMatchedValue = arrMatches[2].replace(
          new RegExp("\"\"", "g"), "\"");
      } else {
        // We found a non-quoted value.
        var strMatchedValue = arrMatches[3];
      }
      // Now that we have our value string, let's add
      // it to the data array.
      arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
  }

  /* Credits: http://techslides.com/convert-csv-to-json-in-javascript
  This will parse a delimited string into an an object with properties
  matching the columns defined in line one*/
  function csvToJson(csv) {
    //var csv is the CSV file with headers
    console.log(csv);
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

})();