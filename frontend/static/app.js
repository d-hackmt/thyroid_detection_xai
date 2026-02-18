const fileInput = document.getElementById('fileInput');
const loader = document.getElementById('loader');
const resultsSection = document.getElementById('resultsSection');
const errorMsg = document.getElementById('errorMsg');
const fileNameDisplay = document.getElementById('fileName');
const downloadBtn = document.getElementById('downloadBtn');

fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    fileNameDisplay.textContent = file.name;
    resultsSection.style.display = 'none';
    errorMsg.textContent = '';
    loader.style.display = 'block';
    downloadBtn.style.display = 'none';

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/analyze', { method: 'POST', body: formData });
        if (!response.ok) throw new Error("Analysis failed");

        const result = await response.json();

        document.getElementById('originalImg').src = `data:image/png;base64,${result.original_image}`;
        document.getElementById('gradcamImg').src = `data:image/png;base64,${result.gradcam_image}`;
        document.getElementById('predLabel').textContent = result.label;
        document.getElementById('predLabel').style.color = result.is_malignant ? '#ff5252' : '#00bfa5';
        document.getElementById('confScore').textContent = result.score.toFixed(4);
        document.getElementById('confPercent').textContent = result.percent.toFixed(2) + "%";
        document.getElementById('classId').textContent = result.class_id;

        resultsSection.style.display = 'block';
        downloadBtn.style.display = 'inline-block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
        errorMsg.textContent = "Error: " + err.message;
    } finally {
        loader.style.display = 'none';
    }
});

downloadBtn.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        downloadBtn.textContent = "Generating...";
        const response = await fetch('/report', { method: 'POST', body: formData });
        if (!response.ok) throw new Error("Report generation failed");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "thyroid_analysis_report.docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        downloadBtn.innerHTML = '<i class="fas fa-file-download"></i> Download Full Report (DOCX)';
    } catch (err) {
        alert("Error: " + err.message);
        downloadBtn.innerHTML = '<i class="fas fa-file-download"></i> Download Full Report (DOCX)';
    }
});
