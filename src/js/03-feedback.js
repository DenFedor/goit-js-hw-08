import throttle from 'lodash.throttle';
const STORAGE_KEY = `feedback-form-state`;
const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`.feedback-form input`),
  textarea: document.querySelector(`.feedback-form textarea`),
};
let userFormData = {};
refs.form.addEventListener(`submit`, onFormSubmit);
refs.form.addEventListener(`input`, throttle(onUserInput, 500));
if (localStorage.getItem(STORAGE_KEY)) {
  userFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  userFormData.email
    ? (refs.input.value = userFormData.email)
    : (refs.input.value = '');
  userFormData.message
    ? (refs.textarea.value = userFormData.message)
    : (refs.input.value = '');
}
function onFormSubmit(e) {
  if (refs.input.value == '' || refs.textarea.value == '') {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  e.target.reset();
  console.log(userFormData);
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(userFormData).forEach(key => {
    userFormData[key] = '';
  });
}

function onUserInput(e) {
  userFormData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFormData));
}
