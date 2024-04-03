document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("tbody").addEventListener("click", function (event) {
        if (event.target.closest(".progress-dropdown") || (event.target.closest(".delete-button"))) {
            return;
        }
        if (event.target.closest("tr")) {
            const taskID = event.target.closest("tr").getAttribute("data-task-id");
            window.location.href = `/task/${taskID}/`;
        }
    });
});

let ascendingOrder = true;

function toggleOrder() {
    var table = document.getElementById('taskTable');
    var rows = Array.from(table.querySelectorAll('tr[data-progress]'));
    rows.sort(function (a, b) {
        var progressOrder = ['TODO', 'INPROGRESS', 'REVIEW', 'DONE'];
        var progressA = a.getAttribute('data-progress');
        var progressB = b.getAttribute('data-progress');
        if (ascendingOrder) {
            return progressOrder.indexOf(progressA) - progressOrder.indexOf(progressB);
        } else {
            return progressOrder.indexOf(progressB) - progressOrder.indexOf(progressA);
        }
    });
    rows.forEach(function (row) {
        table.appendChild(row);
    });
    ascendingOrder = !ascendingOrder;
}

function updateProgress(selectElement, taskId) {
    var newProgress = selectElement.value;
    fetch('update-progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({taskId, newProgress}),
    })
        .then(response => {
            if (response.ok) {
                console.log('Progress updated successfully.');
            } else {
                console.error('Error updating progress.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}