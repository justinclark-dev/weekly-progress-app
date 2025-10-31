/**
 * Handles both EDIT and NEW ejs templates.
 */
(main = () => {

    const toolbarOptions = [
        [ 'bold', 'italic', 'underline', 'link', 'image', { 'list': 'bullet' }, 'clean' ]
    ];

    const editAreas = ['assignments', 'wins', 'struggles'];
    const quills = [];
    for (const editArea of editAreas) {
        quills.push(new Quill(`#${editArea}-editor`, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            }
        }));
        console.log(`quill created`);
    }

    const getISOShortDate = (dateInput) => {
        // Gets the ISO date string without the time, 
        // gives us the date in the format "YYYY-MM-DD".
        const date = new Date(dateInput).toISOString().split('T')[0];
        return date;
    };

    document.getElementById('edit-form').onsubmit = function (event) {
        
        for (const quill of quills) {
            const content = quill.root.innerHTML;
            switch (quill.container.id) {
                case 'assignments-editor':
                    document.getElementById(`assignments-content`).value = content;
                    break;
                case 'wins-editor':
                    document.getElementById(`wins-content`).value = content;
                    break;
                case 'struggles-editor':
                    document.getElementById(`struggles-content`).value = content;
                    break;
            }
        }

        // Need to save date as string using ISO date format 
        // in order for the date's value to be automatically 
        // populated in the html date input on the edit page.
        const weekStart = document.getElementById('weekstart');
        const getWeekstart = document.getElementById('get-weekstart');
        const shortDate = getISOShortDate(getWeekstart.value);
        weekStart.value = shortDate;
    };

})();
