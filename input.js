document.addEventListener("DOMContentLoaded", function () {
    //localStorage.clear();
    console.log("DOM Content Loaded; after form submission: ");
    let formDataArray = [];

    // Check if formDataArray exists in localStorage
    if (localStorage.getItem("formDataArray")) {
        formDataArray = JSON.parse(localStorage.getItem("formDataArray"));
    }

    // Event listener for form submission
    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission from reloading the page

        // Get form input values
        let title = document.getElementById("title").value;
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let price = document.getElementById("price").value;
        let srno = formDataArray.length;

        // formData object
        const formData = {
            title: title,
            fname: fname,
            lname: lname,
            price: price,
            srno: srno
        };

        // Add the new formData to the array
        formDataArray.push(formData);

        // Store the updated array back in LocalStorage
        localStorage.setItem("formDataArray", JSON.stringify(formDataArray));

        // Clear form fields
        document.getElementById("form").reset();

        alert("Your information has been recorded!");
        location.reload();
    });
});
