```javascript```
// ==========================================
// 🔥 FIREBASE
// ==========================================

import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


// ==========================================
// ⚙️ CONFIGURACIÓN DE FIREBASE
// ==========================================

const firebaseConfig = {

    apiKey: "PEGA_TU_API_KEY_AQUI",

    authDomain: "PEGA_TU_AUTH_DOMAIN_AQUI",

    projectId: "PEGA_TU_PROJECT_ID_AQUI",

    storageBucket: "PEGA_TU_STORAGE_BUCKET_AQUI",

    messagingSenderId: "PEGA_TU_MESSAGING_SENDER_ID_AQUI",

    appId: "PEGA_TU_APP_ID_AQUI"

};


// ==========================================
// 🚀 INICIAR FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();


// ==========================================
// 🎮 ELEMENTOS DEL HTML
// ==========================================

const googleBtn = document.getElementById("googleBtn");

const usuario = document.getElementById("usuario");

const nombreUsuario = document.getElementById("nombreUsuario");

const correoUsuario = document.getElementById("correoUsuario");

const fotoUsuario = document.getElementById("fotoUsuario");

const jugarBtn = document.getElementById("jugarBtn");

const salirBtn = document.getElementById("salirBtn");

const estado = document.getElementById("estado");

const menu = document.getElementById("menu");

const juego = document.getElementById("juego");

const volverBtn = document.getElementById("volverBtn");


// ==========================================
// 🔵 INICIAR SESIÓN CON GOOGLE
// ==========================================

googleBtn.addEventListener("click", async () => {

    try {

        estado.textContent = "🔄 Abriendo Google...";

        const resultado =
            await signInWithPopup(auth, provider);

        const user = resultado.user;

        console.log("Usuario conectado:", user);

        estado.textContent =
            "✅ ¡Sesión iniciada correctamente!";

    } catch (error) {

        console.error("Error de Firebase:", error);

        estado.textContent =
            "❌ No se pudo iniciar sesión.";

        console.log("Código del error:", error.code);

        console.log("Mensaje:", error.message);

    }

});


// ==========================================
// 👤 COMPROBAR SI HAY SESIÓN
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        // ==================================
        // 🟢 USUARIO CONECTADO
        // ==================================

        googleBtn.style.display = "none";

        usuario.style.display = "block";

        nombreUsuario.textContent =
            user.displayName || "Jugador";

        correoUsuario.textContent =
            user.email || "Sin correo";

        if (user.photoURL) {

            fotoUsuario.src = user.photoURL;

        } else {

            fotoUsuario.src = "";

        }

        estado.textContent =
            "🟢 Sesión iniciada";

    } else {

        // ==================================
        // 🔴 USUARIO DESCONECTADO
        // ==================================

        googleBtn.style.display = "inline-block";

        usuario.style.display = "none";

        estado.textContent =
            "🔴 No has iniciado sesión.";

    }

});


// ==========================================
// ▶️ BOTÓN JUGAR
// ==========================================

jugarBtn.addEventListener("click", () => {

    if (!auth.currentUser) {

        estado.textContent =
            "⚠️ Primero inicia sesión con Google.";

        return;

    }

    menu.style.display = "none";

    juego.style.display = "block";

});


// ==========================================
// 🚪 CERRAR SESIÓN
// ==========================================

salirBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        juego.style.display = "none";

        menu.style.display = "flex";

        estado.textContent =
            "👋 Sesión cerrada correctamente.";

    } catch (error) {

        console.error("Error al cerrar sesión:", error);

        estado.textContent =
            "❌ No se pudo cerrar sesión.";

    }

});


// ==========================================
// ↩️ VOLVER AL MENÚ
// ==========================================

volverBtn.addEventListener("click", () => {

    juego.style.display = "none";

    menu.style.display = "flex";

});

