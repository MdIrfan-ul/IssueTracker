function deleteProject(id){
    const result = confirm("Are you sure you wanna delete?");
    if (result) {
        fetch('/delete/' + id, { method: "POST" })
            .then(res => {
                if (res.ok) {window.location.href = '/'}
                else{
                    throw Error("You are Not Authorized to Delete This Project");
                }
            })
            .catch(err => {
                alert(`${err.message}!🔒`);
                console.error('Error deleting project:', err)
            });
    }
}
