import scss from './app.scss'

import Vue from 'vue'
import Resource from 'vue-resource'
import Router from 'vue-router'
import Base64 from 'base64url'

import App from './components/App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Quote from './components/Quote.vue'
import Projects from './components/Projects.vue'
import Emails from './components/Emails.vue'
import Contacts from './components/Contacts.vue'
import Dashboard from './components/Dashboard.vue'
import AuthService from './services/auth'

// Install plugins
Vue.use(Router)
Vue.use(Resource)

// Set up a new router
var router = new Router()

Vue.filter('name', function (value, name) {
  
  return value.filter(function(item) {
    console.log(item.name +":"+ name);
    return item.name == name;

  })
})

Vue.filter('from', function (value) {
    
  var res = value.split(" ",1);
  return res;  
  
})

Vue.filter('base64', function (value) {
  // Decode the String
  var encodedSource = value;
  var emailBody = [];

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\-/g, '+');
  encodedSource = encodedSource.replace(/\_/g, '/');

  var decodedSource = window.atob(encodedSource);

  emailBody.push(decodedSource)

  console.log(emailBody);
  console.log();

  
})

Vue.filter('mimeType', function (value, type) {
    

  return value.filter(function(item) {
    console.log(item.mimeType +":"+ type);
    return item.mimeType == type;

  })
  
})




// Route config
router.map({
  '/home':{
    name: 'home',
    component: Home
  },
  '/login':{
    name: 'login',
    component: Login
  },
  '/signup':{
    name: 'signup',
    component: Signup
  },
  '/quote':{
    name: 'quote',
    component: Quote
  },
  '/dashboard':{
    name: 'dashboard',
    component: Dashboard
  },
  '/contacts':{
    name: 'contacts',
    component: Contacts
  },
  '/emails':{
    name: 'emails',
    component: Emails
  },
  '/projects':{
    name: 'projects',
    component: Projects
  },
  '/emails':{
    name: 'emails',
    component: Emails
  }
})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// If no route is matched redirect home
router.redirect({
  '*': '/home'
})

// Start up our app
router.start(App, '#app')

// Check the users auth status when the app starts
AuthService.checkAuth()
