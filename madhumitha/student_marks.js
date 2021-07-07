function add() {
    // get input values
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var subj1 = document.getElementById('subj1').value;
    var subj2 = document.getElementById('subj2').value;
    var subj3 = document.getElementById('subj3').value;
    var subj4 = document.getElementById('subj4').value;
    var subj5 = document.getElementById('subj5').value;

if(name && phone && email && subj1 && subj2 && subj3 && subj4 && subj5)
    // 0--- first table
    {var table = document.getElementsByTagName('table')[0];

    // table.rows.length-- add in the end
    var newRow = table.insertRow(table.rows.length);

    // add cells
    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);
    var cel6 = newRow.insertCell(5);
    var cel7 = newRow.insertCell(6);
    var cel8 = newRow.insertCell(7);

 
    cel1.innerHTML = name;
    cel2.innerHTML = phone;
    cel3.innerHTML = email;
    cel4.innerHTML = subj1;
    cel5.innerHTML = subj2;
    cel6.innerHTML = subj3;
    cel7.innerHTML = subj4;
    cel8.innerHTML = subj5;
}
else{
    alert("enter all details");
}
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subj1").value = "";
    document.getElementById("subj2").value = "";
    document.getElementById("subj3").value = "";
    document.getElementById("subj4").value = "";
    document.getElementById("subj5").value = "";
}
