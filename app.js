// Remplace par tes infos Supabase
const supabaseUrl = 'https://xxxx.supabase.co'; // ← ton URL Supabase
const supabaseKey = 'public-anon-key';         // ← ta clé publique (anon)
const bucketName = 'documents';                // ← le nom de ton bucket

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const fileInput = document.getElementById('fileInput');
const statusDiv = document.getElementById('status');

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const filePath = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase
    .storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) {
    statusDiv.textContent = '❌ Erreur: ' + error.message;
    statusDiv.style.color = 'red';
  } else {
    statusDiv.textContent = `✅ Fichier importé: ${file.name}`;
    statusDiv.style.color = 'green';
  }
});
