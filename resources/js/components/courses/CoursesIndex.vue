<template>
    <div class="card card-default">
        <div class="card-header">Course list</div>

        <div class="card-body">
            <div class="form-group">
            </div>
            <p v-if="courses.length == 0">There are no courses</p>
            <table v-if="courses.length != 0">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Points</th>
                        <th>Level</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses">
                        <td>{{ course.title }}</td>
                        <td>{{ course.code }}</td>
                        <td>{{ course.points }}</td>
                        <td>{{ course.level }}</td>
                        <td class="small">{{ course.description }}</td>
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
            axios.get('/api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.courses = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load courses');
            });
        },
        data() {
            return {
                courses: []
            }
        },
        methods: {
            deleteCourse(courseId) {
                var app = this;
                if (confirm("Are you sure you want to delete this course (id =" + courseId + " )?")) {
                    var token = localStorage.getItem('token');
                    axios.delete('/api/course/' +  courseId, {
                        headers: { Authorization: "Bearer " + token }
                    })
                    .then(function (resp) {
                        var index = app.courses.findIndex(function (course) {
                            return course.id == courseId;
                        });
                        app.courses.splice(index, 1);
                    })
                    .catch(function (resp) {
                        alert("Could not delete course!!");
                    });
                }
            }
        }
    }
</script>
