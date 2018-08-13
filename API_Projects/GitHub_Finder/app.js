const searchUser = document.getElementById('searchUser');
var github = new Github();
var uiView = new UI();
searchUser.addEventListener('keyup', (e) => {
    const userText = e.target.value;

    if(userText !== ''){
        github.getUser(userText)
            .then(data => {
                console.log(data);
                if(data.profile.message == 'Not Found'){
                    uiView.showAlert('User Not Found', 'alert alert-danger');
                }else{
                    uiView.showProfile(data.profile);
                    uiView.showRepos(data.repos);
                }
            });
    }else{
        //Cleart Profile
        uiView.clearProfile();
    }
})