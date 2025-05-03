//  Author: Nikhil Kumar
//  Creation date: 09th April 2025


//  ***************** Only Aplhabets Validation *****************
const validateOnlyAlphabets = (event) => {
    const input = event.target;
    const error = input.nextElementSibling; 
    let value = input.value;
    const validPattern = /^[A-Za-z ]*$/;

    // Clear any previous errors
    error.textContent = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    // Remove leading spaces
    if (value.startsWith(' ')) {
        error.textContent = 'At first space is not allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/^\s+/, ''); // Remove leading spaces
    }
    else if (/\s{2,}/.test(value)) {
        error.textContent = 'Continuous spaces are not allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
    }
    // Allow only alphabets and spaces
    else if (!validPattern.test(value)) {
        error.textContent = 'Only alphabets and spaces are allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/[^A-Za-z ]/g, ''); // Remove invalid characters
    }

    // Remove trailing spaces if no error
    else if (!error.textContent) {
        value = value; // Final trim to remove any leading/trailing spaces
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    }

    input.value = value;
};


document.querySelectorAll('[data-validation="onlyalphabets"]').forEach((input) => {
    input.addEventListener('input', validateOnlyAlphabets);
    input.addEventListener('focusout', (event) => {
        const input = event.target;
        const error = input.nextElementSibling;
        input.value = input.value.trim();
        if (input.hasAttribute('required') && input.value === '') {
            error.textContent = 'This field is required.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else if (error.textContent === 'This field is required.') {
            error.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
});



const validateOnlyNumbers = (event) => {
    const input = event.target;
    const error = input.nextElementSibling;
    let value = input.value;
    const validPattern = /^[0-9]*$/;

    // Clear any previous errors
    error.textContent = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    // Remove leading zeros
    if (value.startsWith('0')) {
        error.textContent = 'Leading zeros are not allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/^0+/, ''); // Remove leading zeros
    }
    // Allow only numbers
    else if (!validPattern.test(value)) {
        error.textContent = 'Only numbers are allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/[^0-9]/g, ''); // Remove invalid characters
    }
    // Check for minlength
    else if (input.hasAttribute('minlength') && value.length < input.getAttribute('minlength')) {
        error.textContent = `Minimum ${input.getAttribute('minlength')} characters are required.`;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }
    // Check for maxlength
    else if (input.hasAttribute('data-maxlength') && value.length > input.getAttribute('data-maxlength')) {
        error.textContent = `Maximum ${input.getAttribute('data-maxlength')} characters are allowed.`;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.slice(0, input.getAttribute('data-maxlength')); // Trim to maxlength
    }

    input.value = value;
};

document.querySelectorAll('[data-validation="onlynumbers"]').forEach((input) => {
    input.addEventListener('input', validateOnlyNumbers);
    input.addEventListener('focusout', (event) => {
        const input = event.target;
        const error = input.nextElementSibling;
        input.value = input.value.trim();
        if (input.hasAttribute('required') && input.value === '') {
            error.textContent = 'This field is required.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else if (error.textContent === 'This field is required.') {
            error.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
});

const validateDecimalNumbers = (event) => {
    const input = event.target;
    const error = input.nextElementSibling;
    let value = input.value;
    const validPattern = /^\d*\.?\d*$/;

    // Reset error state
    error.textContent = '';
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');

    // More than one dot
    if ((value.match(/\./g) || []).length > 1) {
        error.textContent = 'Only one decimal point is allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return;
    }

    // Invalid characters
    if (!validPattern.test(value)) {
        error.textContent = 'Only decimal numbers are allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/[^0-9.]/g, ''); // Remove non-numeric
    }

    // Remove leading zeros (if not decimal like 0.5)
    if (/^0\d+/.test(value)) {
        error.textContent = 'Leading zeros are not allowed.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.replace(/^0+/, '');
    }

    // Minlength check
    if (input.hasAttribute('minlength') && value.length < input.getAttribute('minlength')) {
        error.textContent = `Minimum ${input.getAttribute('minlength')} characters are required.`;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    }

    // Maxlength check
    if (input.hasAttribute('data-maxlength') && value.length > input.getAttribute('data-maxlength')) {
        error.textContent = `Maximum ${input.getAttribute('data-maxlength')} characters are allowed.`;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        value = value.slice(0, input.getAttribute('data-maxlength'));
    }

    input.value = value;
};



// Attach to inputs with attribute data-validation="decimalnumbers"
document.querySelectorAll('[data-validation="decimalnumbers"]').forEach((input) => {
    input.addEventListener('input', validateDecimalNumbers);
    input.addEventListener('focusout', (event) => {
        const input = event.target;
        const error = input.nextElementSibling;
        input.value = input.value.trim();
        if (input.hasAttribute('required') && input.value === '') {
            error.textContent = 'This field is required.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        } else if (error.textContent === 'This field is required.') {
            error.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
});





// ***************** Email Validation *****************
const emailValidation = (event) => {
    const input = event.target;
    const error = input.nextElementSibling;
    const value = input.value;
    const validPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (value === '') {
        error.textContent = '';
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
    }
    else if (!validPattern.test(value)) {
        error.textContent = 'Invalid email address.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        error.textContent = '';
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
};

const email = document.getElementsByClassName('email');
Array.from(email).forEach(email => {
    email.addEventListener('input', (event) => {
        emailValidation(event); 
    });
    email.addEventListener('focusout', (event) => {
        const input = event.target;
        const error = input.nextElementSibling;     
        if (input.hasAttribute('required') && input.value.trim() === '') {
            error.textContent = 'This field is required.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
        }
        else if (error.textContent === 'This field is required.') {
            error.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-invalid');
        }
    });
});



// ***************** Password Validation *****************
const passwordValidation = (event) => {
    const input = event.target;
    const error = input.nextElementSibling;
    const value = input.value;

    // Regular expression for password validation
    const validPattern = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])/;

    // Validation logic
    if (value === '') {
        error.textContent = 'This field is required.';
        input.classList.add('is-invalid');
    } else if (input.hasAttribute('minlength') && value.length < input.getAttribute('minlength')) {
        error.textContent = `Minimum ${input.getAttribute('minlength')} characters are required.`;
        input.classList.add('is-invalid');
    } else if (!validPattern.test(value)) {
        error.textContent =
            'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.';
        input.classList.add('is-invalid');
    } else {
        error.textContent = '';
        input.classList.remove('is-invalid');
    }
};

// Select all elements with the class 'password'
const passwordInputs = document.getElementsByClassName('password');

// Add event listeners for each password input
Array.from(passwordInputs).forEach((passwordInput) => {
    passwordInput.addEventListener('input', passwordValidation);
    passwordInput.addEventListener('focusout', (event) => {
        const input = event.target;
        const error = input.nextElementSibling;     
        if (input.hasAttribute('required') && input.value.trim() === '') {
            error.textContent = 'This field is required.';
            input.classList.add('is-invalid');
        }
        else if (input.hasAttribute('minlength') && input.value.length < input.getAttribute('minlength')) {
            error.textContent = `Minimum ${input.getAttribute('minlength')} characters are required.`;
            input.classList.add('is-invalid');
        }
        else if (error.textContent === 'This field is required.') {
            error.textContent = '';
            input.classList.remove('is-invalid');
        }
    });
});


// ***************** Confirm Password Validation *****************
const passwordMatchValidation = (event) => {
    const confirmPasswordInput = event.target;
    const passwordInput = document.querySelector('.password');
    const error = confirmPasswordInput.nextElementSibling;

    if (confirmPasswordInput.value !== passwordInput.value) {
        error.textContent = 'Passwords do not match.';
        confirmPasswordInput.classList.add('is-invalid');
    } else {
        error.textContent = '';
        confirmPasswordInput.classList.remove('is-invalid');
    }
};

const confirmPasswordInputs = document.getElementsByClassName('confirm-password');
Array.from(confirmPasswordInputs).forEach((confirmPasswordInput) => {
    confirmPasswordInput.addEventListener('input', passwordMatchValidation);
    confirmPasswordInput.addEventListener('focusout', (event) => {
        const input = event.target;
        const error = input.nextElementSibling;     
        if (input.hasAttribute('required') && input.value.trim() === '') {
            error.textContent = 'This field is required.';
            input.classList.add('is-invalid');
        }
        else if (error.textContent === 'This field is required.') {
            error.textContent = '';
            input.classList.remove('is-invalid');
        }
        else if (input.value !== document.querySelector('.password').value) {
            error.textContent = 'Passwords do not match.';
            input.classList.add('is-invalid');
        }
        else {
            error.textContent = '';
            input.classList.remove('is-invalid');
        }
    });
});

const validateRequiredFields = (event) => {
    const input = event.target;
    const error = input.nextElementSibling;

    if (input.hasAttribute('required') && input.value.trim() === '') {
        error.textContent = 'The field is required.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else if (input.hasAttribute('minlength') && input.value.length < input.getAttribute('minlength')) {
        error.textContent = `Minimum ${input.getAttribute('minlength')} characters are required.`;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        error.textContent = '';
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
};

const requiredFields = document.querySelectorAll('[required]');
requiredFields.forEach((field) => {
    field.addEventListener('focusout', validateRequiredFields);
});

const validateFileInput = (event) => {
    const input = event.target;
    const error = input.nextElementSibling;

    if (input.hasAttribute('required') && input.files.length === 0) {
        error.textContent = 'This field is required.';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        error.textContent = '';
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
};

const fileInputs = document.querySelectorAll('input[type="file"][required]');
fileInputs.forEach((fileInput) => {
    fileInput.addEventListener('change', validateFileInput);
    fileInput.addEventListener('focusout', validateFileInput);
});



// Reset Form after
function resetForm(){
    document.getElementById('submitform').reset();
    window.location.href = "/admin/user-registration/service/"
}

// Submit Form Data


function getCsrfToken() {
    const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
    return csrfInput ? csrfInput.value : null;
}
function sendRecord(event){
    swal.fire({
        title: 'Are you sure?',
        text: 'Do You Want To Submit The Record?',
        icon: 'question',
        confirmButtonColor: 'rgb(66 215 9)',
        confirmButtonText: '✔ Save Record',
        showCancelButton: true,
        cancelButtonText: "✖ Cancel",
        cancelButtonColor: "rgb(215 9 9)",
    }).then((res) => {
        if (res.isConfirmed) {
            document.getElementById('loaderbox').style.display = 'block';
            const form = event.target;
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCsrfToken()
                }
            }).then((response) => {
                return response.json();
            }).then((responseData) => {
                if (responseData.status) {
                    document.getElementById('loaderbox').style.display = 'none';
                    Swal.fire({
                        icon: "success",
                        title: responseData.title,
                        html: responseData.text,
                        showConfirmButton: true,
                    }).then((res) => {
                        if (res.isConfirmed || res.dismiss == 'backdrop') {
                            resetForm()
                        }
                    });
                } else {
                    document.getElementById('loaderbox').style.display = 'none';
                    Swal.fire({
                        icon: responseData.icon,
                        title: responseData.title,
                        html: responseData.text,
                        showConfirmButton: true,
                    });
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    });
}


document.getElementById('submitform').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;

    // Manually trigger validation on all required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        const event = new Event('focusout', { bubbles: true });
        field.dispatchEvent(event); // force trigger the validation
    });

    // Check for any invalid feedbacks with text
    const invalidFields = form.querySelectorAll('.invalid-feedback');
    const invalidFieldsWithText = Array.from(invalidFields).filter(field => field.textContent.trim() !== '');

    if (invalidFieldsWithText.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Re Check The Form !',
            text: 'Please fill out all required fields correctly.',
            showConfirmButton: true,
        });
    } else {
        sendRecord(event);
    }
});



$('#same').change(function (e) { 
    e.preventDefault();
    if (this.checked) {
        if (!$('#presentstate').val() || !$('#presentdistrict').val() || !$('#presentPincode').val() || !$('#presentAddress').val()) {
            this.checked = false;
            Swal.fire({
                icon : 'info',
                title: 'Incomplete Address',
                text: 'Please fill out the present address fields before copying.',
                showConfirmButton: true,
            });
            return;
        }
        let presentState = $('#presentstate').val();
        let presentDistrict = $('#presentdistrict').val();
        let presentpincode = $('#presentPincode').val();
        let presentAddress = $('#presentAddress').val();
        $('input#permanentstate').val(presentState);
        $('select#permanentstate').css('display', 'none');
        $('select#permanentstate').removeAttr('required');
        $('select#permanentstate').siblings('.invalid-feedback').html('');
        $('input#permanentstate').css('display', 'block');
        $('input#permanentdistrict').val(presentDistrict);
        $('input#permanentdistrict').siblings('.invalid-feedback').html('');
        $('select#permanentdistrict').css('display', 'none');
        $('select#permanentdistrict').removeAttr('required');
        $('input#permanentdistrict').css('display', 'block');
        $('#permanentPincode').val(presentpincode);
        $('#permanentPincode').attr('readonly', true).focus();
        $('#permanentPincode').siblings('.invalid-feedback').html('');
        $('#permanentAddress').text(presentAddress);
        $('#permanentAddress').siblings('.invalid-feedback').html('');
        $('#permanentAddress').attr('readonly', true).focus();
        
    }
    else{
        $('input#permanentstate').val('');
        $('select#permanentstate').css('display', 'block');
        $('select#permanentstate').attr('required', 'True');
        $('input#permanentstate').css('display', 'none');
        $('input#permanentdistrict').val('');
        $('select#permanentdistrict').css('display', 'block');
        $('select#permanentdistrict').attr('required', 'true');
        $('input#permanentdistrict').css('display', 'none');
        $('#permanentPincode').val('');
        $('#permanentPincode').removeAttr('readonly');
        $('#permanentAddress').text('');
        $('#permanentAddress').removeAttr('readonly');
    }

});