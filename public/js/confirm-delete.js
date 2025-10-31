        const deleteForm = document.getElementById('delete-form');
        const submitDeleteBtn = document.getElementById('submit-delete-btn');
        const deleteModal = document.getElementById('delete-modal');
        const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        const confirmCancelBtn = document.getElementById('confirm-cancel-btn');

        confirmDeleteBtn.addEventListener("click", function(event){
            deleteForm.submit();
        });

        confirmCancelBtn.addEventListener("click", function(event){
            deleteModal.classList.remove('show');
        });

        submitDeleteBtn.addEventListener("click", function(event){
            event.preventDefault()
            deleteModal.classList.add('show');
        });