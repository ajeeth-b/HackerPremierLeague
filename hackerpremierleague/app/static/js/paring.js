function isEmptyString(inp){
    if (inp === null || inp.match(/^ *$/) !== null){
        return true;
    }
    return false;
}

// updaing DB with win loss or tie between teams
function paring(team1, team2, result){
    team1 = document.getElementById(team1).value;
    team2 = document.getElementById(team2).value;
    if (team1 == team2){
        document.getElementById('paringError').innerHTML = "Both team cannot be same";
        return ;
    }
    if (isEmptyString(team1) || isEmptyString(team2)){
        document.getElementById('paringError').innerHTML = "Team name cannot be empty";
        return ;
    }

    var paring_r = new XMLHttpRequest();
    paring_r.requestType = 'json';
    paring_r.open("POST", "/paring", true);
    paring_r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    paring_r.onload = function(){
        if (paring_r.status == 200){
            resp = JSON.parse(paring_r.response)
            if (resp.success){
                document.getElementById('paringError').style.color = 'green';
                document.getElementById('paringError').innerHTML = 'Success';
                window.scrollTo(0, 0);
                window.location.reload(1);
            }
            if (resp.message){
               document.getElementById('paringError').innerHTML = resp.message;
            }
        }else{
            document.getElementById('paringError').innerHTML = 'Internal Error! Retry Later' ;
        }
    };
    paring_r.send(JSON.stringify({'team1':team1, 'team2':team2, 'result':result}));
}

function win_loss(){
    paring('team1', 'team2', 'win')
}

function loss_win(){
    paring('team2', 'team1', 'win')   
}

function tie(){
    paring('team1', 'team2', 'tie')
}