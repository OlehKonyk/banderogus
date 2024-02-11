const form = document.querySelector("#form");
const launchBtn = document.querySelector("#launch-btn");
const userEmailField = document.querySelector("#user-email"); 
const goToFormButton = document.querySelector("#go-to-form-btn");

goToFormButton.addEventListener('click', function(e) {
  e.preventDefault();
  form.scrollIntoView();
});

function clearFormFields() {
  const formFields = form.querySelectorAll("input");

  formFields.forEach((field) => {
    field.value = "";
  });
}

function showGooseAnim() {
  const targetContainer = document.querySelector("#form");
  const gusImage = document.createElement("img");
  gusImage.setAttribute("src", "./img/gus-anim.gif");
  gusImage.classList.add("gus-anim");

  targetContainer.appendChild(gusImage);

  setTimeout(() => {
    targetContainer.removeChild(gusImage);
  }, 2000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!isValidEmail(userEmailField.value)) {
    userEmailField.classList.add("error");
    return;
  }

  const formData = new FormData(form);

  launchBtn.setAttribute("disabled", true);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      showGooseAnim();
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
    .catch((error) => console.log("Sending form failed"));
});

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}
