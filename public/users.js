function searchUsers() {
    const input = document.getElementById('search');
    const filter = input.value.toUpperCase();
    const table = document.querySelector('.user-table');
    const rows = table.querySelectorAll('tr');

    for (let row of rows) {
        const usernameColumn = row.cells[1];
        if (usernameColumn) {
            const usernameText = usernameColumn.textContent || usernameColumn.innerText;
            if (usernameText.toUpperCase().indexOf(filter) > -1) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }
}