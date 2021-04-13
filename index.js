let addFormFields = function (elements) {
    elements.forEach(el => {

        let label = el.label ? `<label>${el.label}</label>` : '';
        let required = el.input.required ? 'required' : '';
        let checked = el.input.checked ? 'checked' : '';
        let placeholder = el.input.placeholder ? `placeholder="${el.input.placeholder}"` : '';
        let mask = el.input.mask ? `data-inputmask="'mask': '${el.input.mask}'"` : '';
        if (mask){
            el.input.type = 'text';
        }
        
        let multiple;
        let accept;
        if(el.input.type === "file"){
            multiple = el.input.multiple ? 'multiple' : '';
            accept = el.input.filetype ? `accept="${el.input.filetype}"` : ''; 
        }

        let str = `<input class ='form-control' type="${el.input.type}" ${required} ${placeholder} ${checked} ${mask} ${multiple} ${accept}>`;

        if(el.input.technologies){
            let valuesMultiple = el.input.technologies;
            str = '';
            for(i = 0; i < valuesMultiple.length; i++){
                str += `<div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="Check${i}">
                <label class="form-check-label" for="Check${i}">
                ${valuesMultiple[i]}
                </label>
                </div>`
            }
        }
        $('form').append(`<div class='wrapper'>
                            ${label}
                            ${str}
                         </div>`)
    })
}

let addFormButtons = function(elements){
    elements.forEach(el => {
        $('form').append(`<button class='btn btn-outline-primary'>${el.text}</button>`)
        
    })
}

let addFormReferences = function (elements) {
    elements.forEach(el => {
        if (el.input) {
            let label = el.label ? `<label>${el.label}</label>` : '';
            let required = el.input.required ? 'required' : '';
            let checked = el.input.required ? 'checked' : '';
            $('form').append(`<div class='wrapper'>
            <input class ='' type="${el.input.type}"  ${required} ${checked}>
            ${label}
            </div>`)
        } else {
            let text = el["text without ref"] ? `${el["text without ref"]}` : '';
            $('form').append(`<div>${text}
                              <a href="${el.ref}">${el.text}</a>
                          </div>`);
        }
    })
}

let addFormFunction = function(obj) {
    addFormFields(obj.fields);

    if (obj.buttons) {
        addFormButtons(obj.buttons);
    }

    if(obj.references){
        addFormReferences(obj.references);
    }
}

let fileContent;
function processFiles(files) {
    var file = files[0];
    if(!file){
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        // Когда это событие активируется, данные готовы.        
        fileContent = e.target.result;
    };
    reader.readAsText(file);  
}

$(document).ready(function () {    
    $( ".add-file" ).click(function() {
        // console.log(`Hi + ${myForm}`);        
        fileContent = JSON.parse(fileContent);
        $('form').html('');
        addFormFunction(fileContent);
        $(":input").inputmask();
    });
    
    $( ".clear-form" ).click(function() {
        $('form').html('');
    });
});