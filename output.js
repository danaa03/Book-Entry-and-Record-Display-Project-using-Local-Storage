let uuiid=-1;
function updatebtn(btnid,currentindex,formDataArray)
{
    
    //redirect cursor to the first field of the form and place data back into the field
   
    document.getElementById("title");

    title.value=formDataArray[currentindex].title;
    title.focus();
    fname.value=formDataArray[currentindex].fname;
    lname.value=formDataArray[currentindex].lname;
    price.value=formDataArray[currentindex].price;
    
    let updatebtn=document.getElementById("updateW");
    updatebtn.disabled=false;
    document.getElementById("submitW").disabled=true;
    //update array index by event listener
}
function deletebtn(btnid, currentindex,formDataArray)
{
    console.log("delete button function for button of srno: " + btnid.slice(2,3));

    let x=currentindex;
    //swap current element with last and pop

    let temp=formDataArray[x];
   // formDataArray.splice(x,1);
    let na="row"+currentindex;
    let table=document.getElementById("tableb");
    document.getElementById(na).remove();

    console.log("currentindex: " +currentindex);
    //formDataArray.splice(currentindex,1);
    //localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
    let newarray=[];
   
    let count=0;
    for(let i=0;i<formDataArray.length;i++)
    {
        if(i===currentindex)
        {
            continue;
        }
        else{
            const form = {
                title:formDataArray[i].title,
                fname:formDataArray[i].fname,
                lname:formDataArray[i].lname,
                price:formDataArray[i].price,
                srno:count
            };

            newarray.push(form);
            count++;
        }
        
    }
    localStorage.setItem("formDataArray", JSON.stringify(newarray));
    location.reload();
}
function addrow(formDataArray){
    let currentindex=(formDataArray.length-1);
    let table=document.getElementById("tableb");
    for (let i = 0; i < formDataArray.length; i++) 
    {
        const formData = formDataArray[i];
        
        let row=document.createElement("tr");

        let name=formData.fname+" "+formData.lname;
        console.log("last row id: row"+formData.srno);

        row.id="row"+ formData.srno;
        let c1=document.createElement("td");
        c1.id="c"+formData.srno+"1";
        let c2=document.createElement("td");
        c2.id="c"+formData.srno+"2";
        let c3=document.createElement("td");
        c3.id="c"+formData.srno +"3";
        let c4=document.createElement("td");
        c4.id="c"+formData.srno +"4";
        let c5=document.createElement("td");
        c5.id="c"+formData.srno +"5";


        c1.textContent=formData.srno;
        c2.textContent=formData.title;
        c3.textContent=name;
        c4.textContent=formData.price;
        //dynamic update button
        let ub=document.createElement("button");
        ub.id="ub"+formData.srno;
        //dynamic delete button
        let db=document.createElement("button");
        db.id="db"+formData.srno;

        ub.type="button";
        ub.name="ub"+formData.srno;
        ub.onclick= function(){
            uuiid=i;
            updatebtn(ub.id,i,formDataArray);         
        };
        
        db.type="button";
        db.name="db"+formData.srno;
        db.onclick= function(){
            deletebtn(db.id,i,formDataArray);         
        };

        ub.className="btn btn-warning ms-2 mt-3";
        db.className="btn btn-warning ms-2 mt-3";

        ub.textContent="Update";
        db.textContent="Delete";

        c5.appendChild(ub);
        c5.appendChild(db);

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.appendChild(c5);

        table.appendChild(row);
    
            
    }
    console.log("number of rows in table: "+ table.getElementsByTagName("tr").length);
}
document.addEventListener("DOMContentLoaded",function(){
    console.log("DOMCONTENTLOADED OUTPUTSCRIPT");

    //localStorage.clear();
    // //page has been reloaded and this is the script that will receive content from local storage and output it in table
    const stringreceived = localStorage.getItem("formDataArray");
    if(stringreceived!==null){
        const formDataArray=JSON.parse(stringreceived);


        console.log("overall data: ");

        for (let i = 0; i < formDataArray.length; i++) 
        {
            const formData = formDataArray[i];
            
            console.log("Name: " + formData.fname + " " + formData.lname);
            console.log("Title: " + formData.title);
            console.log("Price: " + formData.price);
            console.log("srno: " + formData.srno);
        }
     
        addrow(formDataArray);  
        document.getElementById("updateW").addEventListener("click",function(){
            console.log("update made to row: " + uuiid);
            console.log("value to be changed: " + document.getElementById("title").value);
            formDataArray[uuiid].title=document.getElementById("title").value;
            formDataArray[uuiid].fname=document.getElementById("fname").value;
            formDataArray[uuiid].lname=document.getElementById("lname").value;
            formDataArray[uuiid].price=document.getElementById("price").value;
           

            localStorage.setItem("formDataArray", JSON.stringify(formDataArray));
            location.reload();
        });  
    }
});
