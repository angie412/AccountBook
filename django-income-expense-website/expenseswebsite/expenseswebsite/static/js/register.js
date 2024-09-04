const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid-feedback");
const emailField = document.querySelector("#emailField"); 
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
// register.html define usernameField 
// const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput');
const passwordField = document.querySelector("#passwordField");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const sumbitBtn = document.querySelector(".submit-btn");



usernameField.addEventListener("keyup", async (e) => {
    //  console.log("77777", 77777);
     const usernameVal = e.target.value;
    //  usernameSuccessOutput.textContent = `Checking ${usernameVal}`;

     usernameField.classList.remove("is-invalid");
     feedBackArea.style.display = "none";

     if(usernameVal.length > 0){
         // api call 
         fetch("/authentication/validate-username", 
             // fetch : js network request send function
             {
             body : JSON.stringify({username : usernameVal}),
             method : "POST",
         })
         .then((res) => res.json())
         .then((data) => {
            // console.log("data" , data);
            usernameSuccessOutput.style.display = 'none';
            if(data.username_error){
    
                // authentication/views.py username_error 속성확인
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display = "block";
                feedBackArea.innerHTML = `<p>${data.username_error}</p>`;
                sumbitBtn.disabled = true;
            }
            else{
                sumbitBtn.removeAttribute('disabled');
            }
         });

        
     }


 });


 emailField.addEventListener("keyup", async (e) => {
    console.log("77777", 77777);
    const emailVal = e.target.value;

    emailField.classList.remove("is-invalid");
    emailFeedBackArea.style.display = "none";

    if(emailVal.length > 0){
        // api call 
        fetch("/authentication/validate-email", 
            // fetch : js network request send function
            {
            body : JSON.stringify({email : emailVal}),
            method : "POST",
        })
        .then((res) => res.json())
        .then((data) => {
           console.log("data" , data);
           if(data.email_error){
                // submitBTN
                // sumbitBtn.setAttribute("disabled", "disabled");
            
               // authentication/views.py username_error 속성확인
               emailField.classList.add("is-invalid");
               feedBackArea.style.display = "block";
                emailFeedBackArea.innerHTML = `<p> ${data.email_error}</p>`;
                sumbitBtn.disabled = true;
           }
           else{
                sumbitBtn.removeAttribute('disabled');
           }
        });

    }
});


const handleToggleInput = (e) => {

    if(showPasswordToggle.textContent === 'SHOW'){
        showPasswordToggle.textContent='HIDE';

        passwordField.setAttribute("type", "text");
    }
    else {
        showPasswordToggle.textContent = 'SHOW';

        passwordField.setAttribute("type", "password");
    }
};

showPasswordToggle.addEventListener("click", handleToggleInput);