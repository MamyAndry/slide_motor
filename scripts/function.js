function readFile(){
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;
        console.log("CONTENT : " + fileContent);
        return fileContent;
    };
    return "";
}

function visualisation(){
    $("#right-div").empty();
    let extrait = $("#code_to_run").val();
    $("#right-div").append(extrait);
    sessionStorage.setItem("slides", extrait);
}

function handleFileInput(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            $('#code_to_run').val(fileContent);  // Set the value of the textarea
            visualisation();
        };
        reader.readAsText(file);
        $("#form_import").css({
            'hidden':'true'
        });
    } else {
        console.error('No file selected');
    }
}

function runSlides(){
    window.open("./slide.html");
}

function tabulate(event){
    if (event.key == 'Tab') {
        event.preventDefault();

        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Insert tab character
        textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

        // Move cursor
        textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
}

$('#fileInput').on('change', function(event) {
    handleFileInput(event);
});

$('#code_to_run').on('keydown', function(event){
    tabulate(event);
    visualisation();
})

$('#runner').on('click', function(event) {
    runSlides();
});