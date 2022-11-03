import throttle from 'lodash.throttle';
const STORAGE_KEY = `feedback-form-state`;
const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`.feedback-form input`),
  textarea: document.querySelector(`.feedback-form textarea`),
};
let userFormData = {};
refs.form.addEventListener(`submit`, onFormSubmit);
refs.input.addEventListener(`input`, throttle(onEmailInput, 500));
refs.textarea.addEventListener(`input`, throttle(onTextAreaInput, 500));

if (localStorage.getItem(STORAGE_KEY)) {
  userFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  refs.input.value = userFormData['email'];
  refs.textarea.value = userFormData['message'];
}
function onFormSubmit(e) {
  if (refs.input.value == '' || refs.textarea.value == '') {
    e.preventDefault();
    return;
  }
  e.target.reset();
  console.log(userFormData);
  localStorage.removeItem(STORAGE_KEY);
  Object.keys(userFormData).forEach(key => {
    userFormData[key] = '';
  });
}

function onEmailInput(e) {
  userFormData[e.target.email] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFormData));
}
function onTextAreaInput(e) {
  userFormData[e.target.message] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFormData));
}
