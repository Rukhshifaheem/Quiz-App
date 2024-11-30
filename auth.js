import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDl2-fTBzBsUQ2jqMMNew5aRLOpwZF3huE",
  authDomain: "fir-wb-bb786.firebaseapp.com",
  projectId: "fir-wb-bb786",
  storageBucket: "fir-wb-bb786.appspot.com",
  messagingSenderId: "191015246809",
  appId: "1:191015246809:web:25c044c896fd4c6f3a97c8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

function showAlert(title, message, type = "success") {
  Swal.fire({ title, text: message, icon: type, confirmButtonText: "OK" });
}

// Signup
async function signup(event) {
  event.preventDefault();
  
  const emailField = document.getElementById('signupEmail');
  const passwordField = document.getElementById('signupPassword');
  const email = emailField.value.trim();
  const password = passwordField.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user);

    // Save user data to Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date()
    });

    // Show success message using SweetAlert
    Swal.fire({
      title: 'Welcome!',
      text: `Welcome ${user.email}`,
      icon: 'success',
      confirmButtonText: 'OK'
    });

    // Clear the input fields
    emailField.value = "";
    passwordField.value = "";

    // Close the signup modal
    const signupModal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    signupModal.hide();

  } catch (error) {
    // Show error message using SweetAlert
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
document.getElementById('signupForm')?.addEventListener('submit', signup);

// Login
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showAlert("Success", "Logged in successfully", "success");
    setTimeout(() => {
      window.location.href = './Home.html';
    }, 1000);
  } catch (error) {
    showAlert("Error", error.message, "error");
  }
});

// Google Login
document.getElementById('googleLoginButton')?.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date()
      });
    }
    showAlert("Success", "Logged in with Google!", "success");
    setTimeout(() => {
      window.location.href = './Home.html';
    }, 1000);
  } catch (error) {
    showAlert("Error", error.message, "error");
  }
});

// Logout
async function logout() {
  try {
    await signOut(auth);
    console.log("Sign-out successful.");
    // M.toast({ html: "Sign-out successful.", classes: "teal" });

    setTimeout(() => {
      window.location.pathname = './index.html';
    }, 1000);
  } catch (error) {
    console.log(error);
  //   M.toast({ html: error.message, classes: "red" });
  // }
}
}
document.getElementById('logoutButton')?.addEventListener('click', logout);



