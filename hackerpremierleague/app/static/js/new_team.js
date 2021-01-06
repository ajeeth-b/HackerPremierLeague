// ADD_NEW_TEAM POPUP FORM
var modal = document.getElementById("addTeamModel");
var btn = document.getElementById("addTeamButton");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  window.scrollTo(0, 0);
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// New Team Form Submission
function submit_team_form(){
    var formData = new FormData(document.getElementById('teamForm'));
    team_name = formData.get('team_name')
    if (team_name === null || team_name.match(/^ *$/) !== null){
        document.getElementById('newTeamError').innerHTML = "Cannot be empty!" ;
        return ;
    }
    var form_r = new XMLHttpRequest();
    form_r.requestType = 'json';
    form_r.open("POST", "/new-team", true);
    form_r.onload = function(){
        if (form_r.status == 200){
            resp = JSON.parse(form_r.response)
            if (resp.success){
                document.getElementById('newTeamError').style.color = 'green';
                document.getElementById('newTeamError').innerHTML = 'Success';
                window.location.reload(0.5);
            }
            if (resp.message){
               document.getElementById('newTeamError').innerHTML = resp.message ;
            }
        }else{
            document.getElementById('newTeamError').innerHTML = 'Internal Error! Retry Later' ;
        }
    };
    form_r.send(formData);
}