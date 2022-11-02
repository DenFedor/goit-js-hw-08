import throttle from 'lodash.throttle';
const STORAGE_KEY = `feedback-form-state`;
const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`.feedback-form input`),
  textarea: document.querySelector(`.feedback-form textarea`),
};
let userFormData = {
  email: '',
  message: '',
};
refs.form.addEventListener(`submit`, onFormSubmit);
refs.input.addEventListener(`input`, throttle(onEmailInput, 500));
refs.textarea.addEventListener(`input`, throttle(onTextAreaInput, 500));

if (localStorage.getItem(STORAGE_KEY)) {
  userFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  refs.input.value = userFormData['email'];
  refs.textarea.value = userFormData['message'];
}

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  console.log(localStorage.getItem(STORAGE_KEY));
  localStorage.removeItem(STORAGE_KEY);
}

function onEmailInput(e) {
  userFormData['email'] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFormData));
}
function onTextAreaInput(e) {
  userFormData['message'] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFormData));
}
