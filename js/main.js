var config = {
    apiKey: "AIzaSyBdSfyORQmG45OUxN4FZWcVA3zDt_5T-m0",
        authDomain: "proyectofunadmentos.firebaseapp.com",
        databaseURL: "https://proyectofunadmentos.firebaseio.com",
        projectId: "proyectofunadmentos",
        storageBucket: "proyectofunadmentos.appspot.com",
        messagingSenderId: "544184922378"
};
firebase.initializeApp(config);


var db = firebase.database(),
    auth = firebase.auth(),
    proveedor = new firebase.auth.GoogleAuthProvider();

Vue.component('todo-list', {
    template: '#todo-template',
    data: function () {
        return {
            nuevaTarea: null,
            editandoTarea: null,
        }
    },
    props: ['tareas', 'autentificado', 'usuarioActivo'],
    methods: {
        agregarTarea: function (tarea) {
            db.ref(ref).push({
                titulo: tarea,
                completado: false,
                nombre: vm.usuarioActivo.displayName,
                avatar: vm.usuarioActivo.photoURL,
                uid: vm.usuarioActivo.uid,
            });
            this.nuevaTarea = '';
        },
        editarTarea: function (tarea) {
            db.ref(ref + tarea['.key']).update({
                titulo: tarea.titulo
            });
        },
        actualizarEstadoTarea: function (estado, tarea) {
            db.ref(ref + tarea['.key']).update({
                completado: estado ? true : false,
            });
        },
        eliminarTarea: function (tarea) {
            db.ref(ref + tarea['.key']).remove();
        },
    }
});

var vm = new Vue({
    el: 'body',
    ready: function () {

        // Auth
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.info('Conectado: ', user);
                vm.autentificado = true;
                vm.usuarioActivo = user;
                ref = "tareas/"+vm.usuarioActivo.uid+"/";
                console.log(ref);
                db.ref('tareas/').child(vm.usuarioActivo.uid).on('value', function (snapshot) {
                    vm.tareas = [];
                    var objeto = snapshot.val();
                    for (var propiedad in objeto) {
                        vm.tareas.unshift({
                            '.key': propiedad,
                            completado: objeto[propiedad].completado,
                            titulo: objeto[propiedad].titulo,
                            avatar: objeto[propiedad].avatar,
                            nombre: objeto[propiedad].nombre,
                            uid: objeto[propiedad].uid,
                        });
                    }
                });
            } else {
                conectar();
                console.warn('No conectado');
                vm.autentificado = false;
                vm.usuarioActivo = null;
            }
        });


    },
    data: {
        autentificado: false,
        usuarioActivo: null,
        tareas: [],
    },
    methods: {
        conectar: function () {
            firebase.auth().signInWithRedirect(proveedor).catch(function (error) {
                console.error('Error haciendo logIn: ', error);
            });
        },
        desconectar: function () {
            firebase.auth().signOut().then(function(result) {
                window.location.href="index.html";
        })

            .catch(function (error) {
                console.error('Error haciendo logOut: ', error);
            });
        }
    }
});
