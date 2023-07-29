const btn_send = document.querySelector('#send');
const input_day = document.querySelector('#day');
const input_month = document.querySelector('#month');
const input_year = document.querySelector('#year');
const result_year = document.querySelector('#year-result');
const result_month = document.querySelector('#month-result');
const result_day = document.querySelector('#day-result');

document.addEventListener('DOMContentLoaded', function(){

    btn_send.addEventListener('click', function(){
        
        errors = 0;
        items = {day: input_day, month: input_month, year: input_year};

        for (const field in items) {
            let value = items[field].value;
            if(value.length == 0){
                errorClass(field, 'The field is required');
                errors++;
            }else{
                removeErrorClass(field);
                if(field == 'day'){
                    if(!isNumber(input_day.value) || input_day.value < 1 || input_day.value > 31){
                        errorClass('day', 'Must be a valid day');
                        errors++;
                    }
                }

                if(field == 'month'){
                    if(!isNumber(input_month.value) || input_month.value < 1 || input_month.value > 12){
                        errorClass('month', 'Must be a valid month');
                        errors++;
                    }
                }

                if(field == 'year'){
                    year = new Date().getFullYear();
                    if(!isNumber(input_year.value) || input_year.value > year || input_year.value < 1000){
                        errorClass('year', 'Must be in the past');
                        errors++;
                    }
                }
            }
        }

        if(errors == 0){            
            const validDays = new Date(input_year.value, input_month.value, 0).getDate();
            if(input_day.value > validDays){
                errorClass('day', 'Must be a valid date');
                errorClass('month', '');
                errorClass('year', '');
            }

            // Define la fecha de nacimiento
            let date = new Date(input_year.value, input_month.value - 1, input_day.value);
            // Define la fecha de hoy
            let today = new Date();
            // Diferencia en milisegundos entre la fecha de hoy y la fecha de nacimiento
            let difference = today - date.getTime();
            // Calcular la edad en años
            let years = Math.floor(difference / (365.25 * 24 * 60 * 60 * 1000));
            difference -= years * (365.25 * 24 * 60 * 60 * 1000);
            // Calcular la edad en meses
            let months = Math.floor(difference / (30.4375 * 24 * 60 * 60 * 1000));
            difference -= months * (30.4375 * 24 * 60 * 60 * 1000);
            // Calcular la edad en días
            let days = Math.floor(difference / (24 * 60 * 60 * 1000));
            // Asigna los valores a las variables
            result_day.textContent = days;
            result_month.textContent = months;
            result_year.textContent = years;

        }
    })
});

// Funcion para verificar si es un numero
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

// Funcion para la clase error
function errorClass(item, message){
    const input = document.querySelector('#'+ item);
    const label = document.querySelector('#label-'+ item);
    const error = document.querySelector('#error-'+ item);

    error.textContent = message;
    input.classList.add('red-outline');
    label.classList.add('red');
}

function removeErrorClass(item){
    const input = document.querySelector('#'+ item);
    const label = document.querySelector('#label-'+ item);
    const error = document.querySelector('#error-'+ item);

    error.textContent = '';
    input.classList.remove('red-outline');
    label.classList.remove('red');
}