let workbook;

document.getElementById('upload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    workbook = XLSX.read(data, { type: 'array' });
    alert("Excel file loaded successfully! Now click a button to view the data.");
  };

  reader.readAsArrayBuffer(file);
});

function loadSheet(sheetName) {
  if (!workbook) {
    alert("Please upload the Excel file first.");
    return;
  }

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    alert(`Sheet '${sheetName}' not found.`);
    return;
  }

  const html = XLSX.utils.sheet_to_html(sheet);;
  document.getElementById("table-container").innerHTML = html;
}
