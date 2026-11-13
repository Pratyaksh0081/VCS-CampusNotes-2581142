
let notes = JSON.parse(localStorage.getItem("campusNotes")) || [];

function displayNotes(searchTerm = "") {
    const notesContainer = document.getElementById("notes");
    notesContainer.innerHTML = "";

    const search = searchTerm.toLowerCase().trim();

    notes.forEach((note, index) => {
        if (
            !note.subject.toLowerCase().includes(search) &&
            !note.content.toLowerCase().includes(search)
        ) {
            return;
        }

        const card = document.createElement("div");
        card.className = "note-card";

        const heading = document.createElement("h3");
        heading.textContent = note.subject;

        const content = document.createElement("p");
        content.textContent = note.content;

        const button = document.createElement("button");
        button.textContent = "Delete";
        button.className = "delete-btn";
        button.onclick = () => deleteNote(index);

        card.appendChild(heading);
        card.appendChild(content);
        card.appendChild(button);

        notesContainer.appendChild(card);
    });
}

function filterNotes() {
    const searchTerm = document.getElementById("searchInput").value;
    displayNotes(searchTerm);
}

function addNote() {
    const subject = document.getElementById("subject").value.trim();
    const content = document.getElementById("note").value.trim();

    if (!subject || !content) {
        alert("Please enter both subject and notes!");
        return;
    }

    notes.push({ subject: subject, content: content });

    localStorage.setItem("campusNotes", JSON.stringify(notes));

    document.getElementById("subject").value = "";
    document.getElementById("note").value = "";

    displayNotes(document.getElementById("searchInput").value);
}

function deleteNote(index) {
    notes.splice(index, 1);

    localStorage.setItem("campusNotes", JSON.stringify(notes));

    displayNotes(document.getElementById("searchInput").value);
}

displayNotes();
