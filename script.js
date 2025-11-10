import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe8dlow52Y7aSBxDTOwyo3nS5ZMg0gzJ8",
  authDomain: "fandashboard.firebaseapp.com",
  projectId: "fandashboard",
  storageBucket: "fandashboard.appspot.com",
  messagingSenderId: "8318759415",
  appId: "1:8318759415:web:dc8c427606488a8b16bef2",
  measurementId: "G-HHCQEMEXF4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('inputForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Pastikan semua ID sudah benar dan ada di HTML
    const companyName = document.getElementById('companyName')?.value || "";
    const applicantName = document.getElementById('applicantName')?.value || "";
    const position = document.getElementById('position')?.value || "";
    const projectName = document.getElementById('projectName')?.value || "";
    const submissionDate = document.getElementById('submissionDate')?.value || "";
    const status = document.getElementById('statusInput')?.value || "";
    const applicationName = document.getElementById('applicationName')?.value || "";
    const type = document.getElementById('type')?.value || "";
    const quantity = document.getElementById('quantity')?.value || "";
    const duration = document.getElementById('duration')?.value || "";
    const purpose = document.getElementById('purpose')?.value || "";
    const description = document.getElementById('description')?.value || "";
    const clientName = document.getElementById('clientName')?.value || "";

    const data = {
        companyName: companyName,
        applicantName: applicantName,
        position: position,
        projectName: projectName,
        submissionDate: submissionDate,
        status: status,
        applicationName: applicationName,
        type: type,
        quantity: quantity,
        duration: duration,
        purpose: purpose,
        description: description,
        documentNumber: "",
        pmName: "",
        clientName: clientName
    };

    const statusMessage = document.getElementById('messageStatus');

    try {
        await addDoc(collection(db, "licenses"), data);
        if (statusMessage) {
            statusMessage.textContent = 'Data berhasil dikirim!';
            statusMessage.style.color = 'green';
        }
        document.getElementById('inputForm').reset();
    } catch (error) {
        if (statusMessage) {
            statusMessage.textContent = 'Gagal mengirim data. Cek koneksi, rules, atau error di console.';
            statusMessage.style.color = 'red';
        }
        console.error(error);
    }
});
