<template>
    <div class="card card-default">
        <div class="card-header">Enrolment list</div>

        <div class="card-body">
            <div class="form-group">
                <router-link :to="{ name: 'enrolments.create' }" class="btn btn-success">
                    Create new enrolment
                </router-link>
            </div>
            <p v-if="enrolments.length == 0">There are no enrolments</p>
            <table v-if="enrolments.length != 0">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Course</th>
                        <th>Student</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="enrolment in enrolments">
                        <td>{{ enrolment.date }}</td>
                        <td>{{ enrolment.time }}</td>
                        <td>{{ enrolment.status }}</td>
                        <td>{{ enrolment.course.title }}</td>
                        <td>{{ enrolment.student.name }}</td>
                        <td>
                            <router-link :to="{ name:'enrolment.view', params: { id:enrolment.id }}" class="btn btn-primary">View</router-link>
                            <router-link :to="{ name: 'editEnrolment', params: { id: enrolment.id } }" class="btn btn-warning">Edit</router-link>
                            <button class="btn btn-danger" v-on:click="deleteEnrolment(enrolment.id)">Delete</button>
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
            axios.get('/api/enrolments', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.enrolments = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load enrolments');
            });
        },
        data() {
            return {
                enrolments: []
            }
        },
        methods: {
            deleteEnrolment(enrolmentId) {
                var app = this;
                if (confirm("Are you sure you want to delete this enrolment (id =" + enrolmentId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/enrolments/' +  enrolmentId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.enrolments.findIndex(function (enrolment) {
                            return enrolment.id == enrolmentId;
                        });
                        app.enrolments.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete enrolment!!");
                    });
                }
            }
        }
    }
</script>
