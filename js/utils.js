//////////////////////////////////
// utils
function generateRowId(rawId) {
  return "row" + rawId;
}

function generateMeasurementId(rawId) {
  return ("measurement" + rawId);
}

function generateUnitId(rawId) {
  return ("unit" + rawId);
}

function generatePresentControlId(rawId) {
  return ("presentControl" + rawId);
}

function findZipperedDatum(id) {
  return zipperedData.find(d => parseInt(d.id) === parseInt(id));
}

function zeroZipperedDatum(id) {
  const datum = findZipperedDatum(id);
  datum.measurement = "";
  datum.unit = "";
  datum.observationId = undefined;
}
