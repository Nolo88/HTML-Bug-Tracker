let bugs = JSON.parse(localStorage.getItem('bugs')) || [];

// Adding bug to the list
document.getElementById('bug-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('bug-title').value;
    const description = document.getElementById('bug-description').value;
    const priority = document.getElementById('bug-priority').value;

    const bug = {
        id: Date.now(),
        title,
        description,
        priority,
        resolved: false
    };

    bugs.push(bug);
    localStorage.setItem('bugs', JSON.stringify(bugs));

    document.getElementById('bug-form').reset();
    renderBugs();
});

// Display bug list
function renderBugs() {
    const bugList = document.getElementById('bug-list');
    bugList.innerHTML = ''; 

    bugs.forEach(bug => {
        const bugItem = document.createElement('li');
        bugItem.classList.add('bug-item');
        bugItem.classList.add(bug.priority.toLowerCase());

        // Set bug content
        bugItem.innerHTML = `
            <h3>${bug.title}</h3>
            <p>${bug.description}</p>
            <span class="priority">Priority: ${bug.priority}</span>
            <button onclick="resolveBug(${bug.id})">Resolve</button>
        `;

        // Add the bug to the list
        bugList.appendChild(bugItem);
    });
}

// Marking the bug as resolved
function resolveBug(id) {
    bugs = bugs.map(bug => {
        if (bug.id === id) {
            bug.resolved = true;
        }
        return bug;
    });

    // Filtering out resolved bugs
    bugs = bugs.filter(bug => !bug.resolved);

    // Saving updated list to localStorage
    localStorage.setItem('bugs', JSON.stringify(bugs));

    renderBugs();
}

// Initial rendering
renderBugs();