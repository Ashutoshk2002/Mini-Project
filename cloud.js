const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('files');

fileInput.addEventListener('change', handleFileSelect);

window.addEventListener('load', retrieveSavedFiles);

function handleFileSelect(event) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.innerHTML = file.name;
        link.download = file.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteFile(link, li));

        li.appendChild(link);
        li.appendChild(deleteBtn);
        fileList.appendChild(li);

        saveFileToLocal(file);
    }
}

function deleteFile(link, li) {
    URL.revokeObjectURL(link.href);
    fileList.removeChild(li);

    localStorage.removeItem(link.innerHTML);
}

function saveFileToLocal(file) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const data = event.target.result;
        localStorage.setItem(file.name, data);
    };
    reader.readAsDataURL(file);
}

function retrieveSavedFiles() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = value;
        link.innerHTML = key;
        link.download = key;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteFile(link, li));

        li.appendChild(link);
        li.appendChild(deleteBtn);
        fileList.appendChild(li);
    }
}