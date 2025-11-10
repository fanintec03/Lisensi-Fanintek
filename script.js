import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const form = document.getElementById('inputForm');
const statusMessage = document.getElementById('messageStatus');

if (statusMessage) {
  statusMessage.style.display = 'none';
}

if (!form) {
  console.error('Form element (#inputForm) tidak ditemukan di halaman.');
  if (statusMessage) {
    statusMessage.style.display = 'block';
    statusMessage.className = 'error';
    statusMessage.textContent = 'Error: Form tidak ditemukan (cek id inputForm di HTML).';
  }
} else {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (statusMessage) {
      statusMessage.style.display = 'block';
      statusMessage.className = 'loading';
      statusMessage.textContent = 'Sedang mengirim...';
    }

    // ambil nilai input (cek keberadaan elemen agar tidak undefined)
    const companyName = document.getElementById('companyName')?.value || "";
    const applicantName = document.getElementById('applicantName')?.value || "";
    const position = document.getElementById('position')?.value || "";
    const projectName = document.getElementById('projectName')?.value || "";
    const submissionDate = document.getElementById('submissionDate')?.value || "";
    const status = document.getElementById('statusInput')?.value || "";
    const applicationName = document.getElementById('applicationName')?.value || "";
    const type = document.getElementById('type')?.value || "";
    const quantityRaw = document.getElementById('quantity')?.value || "0";
    const quantity = Number(quantityRaw) || 0;
    const duration = document.getElementById('duration')?.value || "";
    const purpose = document.getElementById('purpose')?.value || "";
    const description = document.getElementById('description')?.value || "";
    const clientName = document.getElementById('clientName')?.value || "";

    console.log('Mengirim data ke Firestore:', { companyName, applicantName, position, projectName, submissionDate, status, applicationName, type, quantity, duration, purpose, description, clientName });

    const data = {
      companyName,
      applicantName,
      position,
      projectName,
      submissionDate,
      status,
      applicationName,
      type,
      quantity,
      duration,
      purpose,
      description,
      documentNumber: "",
      pmName: "",
      clientName,
      createdAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "licenses"), data);
      console.log('Dokumen berhasil ditambahkan, ID:', docRef.id);
      if (statusMessage) {
        statusMessage.className = 'success';
        statusMessage.textContent = 'Data berhasil dikirim! (ID: ' + docRef.id + ')';
      }
      form.reset();
    } catch (error) {
      console.error('Firestore error:', error);
      if (statusMessage) {
        statusMessage.className = 'error';
        // kalau permission error, beri pesan yang jelas
        if (error?.code === 'permission-denied' || (error?.message && error.message.toLowerCase().includes('permission'))) {
          statusMessage.textContent = 'Gagal: permission-denied. Periksa Firestore rules (project harus mengizinkan penulisan tanpa auth).';
        } else {
          statusMessage.textContent = 'Gagal mengirim data: ' + (error?.message || error);
        }
      }
    }
  });
}
