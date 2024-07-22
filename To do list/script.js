document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const allTasksButton = document.getElementById('all-tasks');
    const activeTasksButton = document.getElementById('active-tasks');
    const completedTasksButton = document.getElementById('completed-tasks');

    addTaskButton.addEventListener('click', addTask);
    allTasksButton.addEventListener('click', () => filterTasks('all'));
    activeTasksButton.addEventListener('click', () => filterTasks('active'));
    completedTasksButton.addEventListener('click', () => filterTasks('completed'));

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;
            taskContent.addEventListener('click', () => {
                taskContent.classList.toggle('completed');
            });

            taskContent.addEventListener('dblclick', () => {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = taskContent.textContent;
                editInput.addEventListener('blur', () => {
                    taskContent.textContent = editInput.value;
                    taskItem.replaceChild(taskContent, editInput);
                });
                taskItem.replaceChild(editInput, taskContent);
                editInput.focus();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-task');
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(taskItem);
            });

            taskItem.appendChild(taskContent);
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);
            newTaskInput.value = '';
        }
    }

    function filterTasks(filter) {
        const tasks = taskList.children;
        for (let task of tasks) {
            switch (filter) {
                case 'all':
                    task.style.display = 'flex';
                    break;
                case 'active':
                    if (task.firstChild.classList.contains('completed')) {
                        task.style.display = 'none';
                    } else {
                        task.style.display = 'flex';
                    }
                    break;
                case 'completed':
                    if (task.firstChild.classList.contains('completed')) {
                        task.style.display = 'flex';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
            }
        }
    }
});
