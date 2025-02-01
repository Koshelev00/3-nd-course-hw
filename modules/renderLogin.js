import { login, setToken, setName } from './api.js'
import {fetchAndRenderComment} from './fetchAndRenderComment.js'
import { renderComment } from './renderComment.js';
import { renderRegistration } from './renderRegistration.js'
export const renderLogin = () => {
    const container = document.getElementById('container');

    const loginHtml = `
    <section class="add-form">
            <h1>Форма входа</h1>
        <input 
        type="text"
        class="add-form-name"
        placeholder="Введите логин"
        id="login"
        required
        ></>
        <input
        type="password"
        class="add-form-name"
        placeholder="Введите пароль"
        id="password"
        required
        ></input>
        <fieldset class="add-form-registry">
        <button class="add-form-button-main button-main" type="submit">
          Войти</button>
          <u class="add-form-button-link registry">
          Зарегистрироваться
          </u>
          </fieldset>
          </section>
   `
   container.innerHTML = loginHtml
   document.querySelector('.registry').addEventListener('click', () => {
    renderRegistration()
   })

   const loginEl = document.querySelector('#login')
   const passwordEl = document.querySelector('#password')
   const submitButtonEl = document.querySelector('.button-main')
           
        
   
  
   
   submitButtonEl.addEventListener('click', () => {
    submitButtonEl.disabled = true; 
    login(loginEl.value, passwordEl.value)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Неверный логин или пароль'); 
            }
            return response.json();
        })
        .then((data) => {
            setToken(data.user.token);
            setName(data.user.name);
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('name', data.user.name);
            
            fetchAndRenderComment();
        })
        .catch((error) => {
            alert(error.message);
        })
        .finally(() => {
          submitButtonEl.disabled = false;
      });
})
}
