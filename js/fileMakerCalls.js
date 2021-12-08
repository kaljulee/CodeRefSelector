function printFileMakerError(err) {
  console.log('attempted filemaker call');
  console.log(err);
}

function fileMaker_saveMeasurement(observationId, value) {
  try {
    FileMaker.PerformScript("save_measurement", `${observationId},${value}`);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_saveUnit(observationId, value) {
  try {
    FileMaker.PerformScript("save_unit", `${observationId},${value}`);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_createObservation(codeRefId) {
  try {
    FileMaker.PerformScript("create_observation_from_JS", codeRefId);
  } catch (err) {
    printFileMakerError(err);
  }
}

function fileMaker_deleteObservation(codeRefId) {
  try {
    FileMaker.PerformScript("delete_observation_from_JS", codeRefId);
  } catch (err) {
    printFileMakerError(err);
  }
}

////////////////////////////////////////////
// filemaker debugger functions
function debug_FileMaker_SaveCodeRefData() {
  try {
    FileMaker.PerformScript("save_codeRefData", JSON.stringify(CodeReferenceTable));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_SaveObservTable() {
  try {
    FileMaker.PerformScript("save_observTable", JSON.stringify(ObservationTable));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_saveZipperData() {
  try {
    FileMaker.PerformScript("save_zipper_data", JSON.stringify(zipperedData));
  } catch (err) {
    printFileMakerError(err);
  }
}

function debug_FileMaker_saveNewObservationId(observationId) {
  try {
    FileMaker.PerformScript("save_new_observation_id", observationId);
  } catch (err) {
    printFileMakerError(err);
  }
}
