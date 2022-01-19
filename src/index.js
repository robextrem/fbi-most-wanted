/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 import Vue from 'vue'

 Vue.component('fugitives-list', require('./components/FugitivesList.vue').default);
 
 Vue.filter('split', function (arr) {
    return arr.join(', ');
  });

 const app = new Vue({
     el: '#app',
     methods:{
        toggleBurger: function(event){
            document.getElementById("navbarBasicExample").classList.toggle("is-block-touch");
            event.target.classList.toggle("is-active");
        }
     }
     
 });
 