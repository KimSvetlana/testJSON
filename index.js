let addFormFields = function (elements) {
    elements.forEach(el => {

        let label = el.label ? `<label>${el.label}</label>` : '';
        let required = el.input.required ? 'required' : '';
        let checked = el.input.checked === true ? 'checked' : '';
        let placeholder = el.input.placeholder ? `placeholder="${el.input.placeholder}"` : '';
        let multiple = el.input.multiple ? 'multiple' : '';
        let accept = el.input.filetype ? `accept="${el.input.filetype}"` : ''; 
        let value = el.input.colors ? `value = ${el.input.colors}` : '';
        
        let mask = el.input.mask ? `data-inputmask="'mask': '${el.input.mask}'"` : '';
        if (mask){
            el.input.type = 'text';
        }

        let contentStr = `<input class ='form-control' 
                            type="${el.input.type}" ${required} ${placeholder} 
                            ${checked} ${mask} ${multiple} ${accept} ${value}>`;

        if(el.input.technologies){
            let valuesMultiple = el.input.technologies;
            contentStr = '';
            for(i = 0; i < valuesMultiple.length; i++){
                contentStr += `<div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="Check${i}">
                                <label class="form-check-label" for="Check${i}">
                                    ${valuesMultiple[i]}
                                </label>
                             </div>`;
            }
        }

        if(el.input.type ==='textarea'){
            contentStr = `<textarea class ='form-control textarea' row=5 ${required} ${placeholder} ${checked} 
                             ${mask} ${multiple} ${accept}>
                        </textarea>`;
                            
        }  

        let resultStr = `<div class='wrapper'>
                            ${label}
                            ${contentStr}
                         </div>`;

        if(el.input.type ==='checkbox'){
            contentStr = `<input class ='' type="${el.input.type}" 
                            ${required} ${placeholder} ${checked} 
                                ${mask} ${multiple} ${accept}>`;
            resultStr = `<div class='chekbox'>
                            ${label}
                            ${contentStr}
                         </div>`;
        }                         
        $('form').append(resultStr);
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
            addFormFields(Array(el))
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

    if(obj.references){
        addFormReferences(obj.references);
    }
    if (obj.buttons) {
        addFormButtons(obj.buttons);
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
        fileContent = JSON.parse(fileContent);
        $('form').html('');
        addFormFunction(fileContent);
        $(":input").inputmask();
        $('#fileInput').val('');
    });
    
    $( ".clear-form" ).click(function() {
        $('form').html('');
    });
});