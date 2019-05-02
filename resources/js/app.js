
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router';

// Imports all the component files
import LoginForm from './components/auth/LoginForm.vue';
import UserHome from './components/home/UserHome.vue';

// Imports all the component files for student
import StudentsIndex from './components/students/StudentsIndex.vue';
import CreateStudent from './components/students/CreateStudent.vue';
import EditStudent from './components/students/EditStudent.vue';

// Imports component file for courses
import CoursesIndex from './components/courses/CoursesIndex.vue';

// Imports all the component enrolments
import EnrolmentsIndex from './components/enrolments/EnrolmentsIndex.vue';
import ViewEnrolment from './components/enrolments/ViewEnrolment.vue';
import CreateEnrolment from './components/enrolments/CreateEnrolment.vue';
import EditEnrolment from './components/enrolments/EditEnrolment.vue';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

 // Routes
 Vue.use(VueRouter);

 const routes = [
     {
         path: '/',
         name: 'login',
         components: {
             loginForm: LoginForm
         }
     },
     {
         path: '/home',
         component: UserHome,
         name: 'home',
         children: [
             {
                 path: 'enrolments',
                 name: 'enrolments',
                 component: EnrolmentsIndex
             },
             {
                path: 'enrolments/:id',
                name: 'enrolment.view',
                component: ViewEnrolment
             },
             {
                 path: 'students',
                 name: 'students',
                 component: StudentsIndex
             },
             {
                 path: 'students/create',
                 name: 'students.create',
                 component: CreateStudent
             },
             {
                 path: 'students/:id/edit',
                 component: EditStudent,
                 name: 'editStudent'
             },
             {
                 path: 'courses',
                 name: 'courses',
                 component: CoursesIndex
             },
             {
                 path: 'enrolments/create',
                 name: 'enrolments.create',
                 component: CreateEnrolment
             },
             {
                 path: 'enrolments/:id/edit',
                 component: EditEnrolment,
                 name: 'editEnrolment'
             }
         ]
     },
 ];

 // Configure Vue Router & Vue
 const router = new VueRouter({
     routes: routes
 });

 const app = new Vue({
     el: '#app',
     router: router
 });
