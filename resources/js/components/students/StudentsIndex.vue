<template>
    <div class="card card-default">
        <div class="card-header">Student list</div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'students.create' }" class="btn btn-success">
                    Create new student
                </router-link>
            </div>
            <p v-if="students.length == 0">There are no students</p>
            <table v-if="students.length != 0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students">
                        <td>{{ student.name }}</td>
                        <td>{{ student.address }}</td>
                        <td>{{ student.email }}</td>
                        <td>
                            <router-link :to="{ name: 'editStudent', params: { id: student.id } }" class="btn btn-warning">Edit</router-link>
                            <button class="btn btn-danger" v-on:click="deleteStudent(student.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            var app = this;
            var token = localStorage.getItem('token');
            axios.get('/api/students', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.students = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load students');
            });
        },
        data() {
            return {
                students: []
            }
        },
        methods: {
            deleteStudent(studentId) {
                var app = this;
                if (confirm("Are you sure you want to delete this student (id =" + studentId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/students/' +  studentId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.students.findIndex(function (student) {
                            return student.id == studentId;
                        });
                        app.students.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete student!!");
                    });
                }
            }
        }
    }
</script>
