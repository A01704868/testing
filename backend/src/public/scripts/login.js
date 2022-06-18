var app = new Vue({
    el: '#app',
    data: {
        name: null,
        email: null,
        password: null,
        role: 0,
        error: false,
        errorMsg: "",
        requestConfig: {
            dataType: "json",
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    },
    methods: {
        login: async function (e) {
            e.preventDefault();
            const response = await fetch("/api/auth/login", {
                ...this.requestConfig,
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });

            if (response.status === 200) {
                window.location.href = "http://159.223.174.63:3000/";
            } else if (response.status === 401) {
                this.error = true;
                this.errorMsg = "Email o contraseña incorrecta";
            } else {
                this.error = true;
                this.errorMsg = "Ocurrió un error al iniciar sesión";
            }

            return false;
        },
        signon: async function (e) {
            e.preventDefault();
            const response = await fetch("/api/auth/signon", {
                ...this.requestConfig,
                body: JSON.stringify({
                    role: this.role,
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
            });

            if (response.status === 201) {
                window.location.href = "http://159.223.174.63:4000/";
            } else if (response.status === 401) {
                this.error = true;
                this.errorMsg = "No autorizado";
            } else {
                this.error = true;
                this.errorMsg = "Ocurrió un error al registrarse";
            }

            return false;
        },
        registrarse: function () {
            window.location.href = "/signon";
            return false;
        }
    }
});