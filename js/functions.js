function appendToCodeRefList(doc, data) {
  let container = doc.getElementById("container");
  data.forEach((datum, n) => {
      addRow(doc, n, datum);
  });
}

function buttonClicked(elmnt) {
elmnt.classList.toggle("clicked-button");
}
