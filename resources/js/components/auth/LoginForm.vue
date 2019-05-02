<template>
    <div class="card card-default">
        <div class="card-header">Login</div>

        <div class="card-body">
            <form v-on:submit="login()">
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label>Email</label>
                        <input type="text" v-model="user.email" class="form-control">
                    </div>
                    <div class="col-md-6 form-group">
                        <label>Password</label>
                        <input type="password" v-model="user.password" class="form-control">
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-12 form-group">
                        <button class="btn btn-primary">Login</button>
                        <p class="text-danger" v-if="errorMessage != ''">{{ errorMessage }}</p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                user: {
                    email: '',
                    password: ''
                },
                errorMessage: ''
            }
        },
        mounted() {
            var app = this;
            if (localStorage.getItem('token') !== null) {
                app.$router.replace({name: 'home'});
            }
        },
        methods: {
            login() {
                event.preventDefault();
                var app = this;
                axios.post('/api/login', app.user)
                    .then(function (resp) {
                        localStorage.setItem('token', resp.data.token);
                        app.$router.push({name: 'home'});
                    })
                    .catch(function (resp) {
                        app.errorMessage = "It didn't work!";
                    });
            }
        }
    }
</script>
