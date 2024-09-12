let currentStep = 1;
let numLegs = 0;
let selectedButtons = {};
let points = [];
let currentLegIndex = 0;

function nextStep() {
  document.querySelector(`#step${currentStep}`).classList.remove("active");
  currentStep++;
  document.querySelector(`#step${currentStep}`).classList.add("active");

  updateNextButtonVisibility();

  if (currentStep === 3) {
    updateStep3Title();
    resetPointSelection();
  } else if (currentStep > 3) {
    displaySummary();
  }
}

function previousStep() {
  document.querySelector(`#step${currentStep}`).classList.remove("active");
  currentStep--;
  document.querySelector(`#step${currentStep}`).classList.add("active");

  updateNextButtonVisibility();

  if (currentStep === 3) {
    updateStep3Title();
    resetPointSelection();
  }
}

function updateStep3Title() {
  const step3Title = document.getElementById("step3Title");
  step3Title.innerText = `ขาที่ ${currentLegIndex + 1}`;
}

function updateNextButtonVisibility() {
  document.querySelectorAll(".step-button").forEach((button) => {
    button.style.display = "none";
  });

  const nextButton = document.getElementById(`next${currentStep}`);
  if (nextButton) {
    nextButton.style.display = "block";
  }
}

document.getElementById("next1").addEventListener("click", () => {
  numLegs = parseInt(document.getElementById("numLegs").value);
  if (numLegs > 0) {
    nextStep();
  } else {
    Swal.fire({
      icon: "error",
      color: "#FFD700",
      background: "#1c1c1c",
      iconColor: "#f39c12",
      title: "Invalid Number",
      buttonsStyling: true,
      confirmButtonColor: "#FFD700",
      cancelButtonColor: "#f1c40f",
      text: "Please enter a valid number of legs!"
    });
  }
});

const numberButtons = document.getElementById("numberButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("number-btn");
  btn.addEventListener("click", () => {
    selectStep2Button(btn, i);
  });
  numberButtons.appendChild(btn);
}

const bounceButtons = document.getElementById("bounceButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i + " เด้ง";
  btn.classList.add("number-btn", "red");
  btn.addEventListener("click", () => {
    selectStep2Button(btn, i + " เด้ง");
  });
  bounceButtons.appendChild(btn);
}

function selectStep2Button(button, value) {
  selectedButtons["step2"] = button;

  document
    .querySelectorAll("#numberButtons .number-btn, #bounceButtons .number-btn")
    .forEach((btn) => {
      btn.classList.remove("selected");
      btn.classList.remove("active");
    });

  button.classList.add("selected");
  button.classList.add("active");
  nextStep();
}

const pointsNumberButtons = document.getElementById("pointsNumberButtons");
for (let i = 1; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("number-btn");
  btn.addEventListener("click", () => {
    selectStep3Button(btn, i);
  });
  pointsNumberButtons.appendChild(btn);
}

const pointsBounceButtons = document.getElementById("pointsBounceButtons");
for (let i = 1; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i + " เด้ง";
  btn.classList.add("number-btn", "red");
  btn.addEventListener("click", () => {
    selectStep3Button(btn, i + " เด้ง");
  });
  pointsBounceButtons.appendChild(btn);
}

function selectStep3Button(button, value) {
  selectedButtons[`step3_${currentLegIndex}`] = button;

  document
    .querySelectorAll(
      "#pointsNumberButtons .number-btn, #pointsBounceButtons .number-btn"
    )
    .forEach((btn) => {
      btn.classList.remove("selected");
      btn.classList.remove("active");
    });

  button.classList.add("selected");
  button.classList.add("active");
  points[currentLegIndex] = value;
  if (currentLegIndex < numLegs - 1) {
    currentLegIndex++;
    updateStep3Title();
    resetPointSelection();
  } else {
    nextStep();
  }
}

function resetPointSelection() {
  document
    .querySelectorAll(
      "#pointsNumberButtons .number-btn, #pointsBounceButtons .number-btn"
    )
    .forEach((btn) => {
      if (
        selectedButtons[`step3_${currentLegIndex}`] &&
        btn.textContent ===
          selectedButtons[`step3_${currentLegIndex}`].textContent
      ) {
        btn.classList.add("selected");
        btn.classList.add("active");
      } else {
        btn.classList.remove("selected");
        btn.classList.remove("active");
      }
    });
}

function displaySummary() {
  const summary = document.getElementById("summary");
  summary.innerHTML = `<p>เจ้า ${
    selectedButtons["step2"] ? selectedButtons["step2"].textContent : ""
  } แต้ม</p>`;
  points.forEach((point, index) => {
    summary.innerHTML += `<p>ขา ${index + 1}: ${point} แต้ม</p>`;
  });
}

document.getElementById("backButton3").addEventListener("click", () => {
  previousStep();
  if (currentLegIndex > 0) currentLegIndex--;
  updateStep3Title();
  resetPointSelection();
  updateNextButtonVisibility();
});

document.getElementById("backButton2").addEventListener("click", () => {
  previousStep();
  resetSelection();
  updateNextButtonVisibility();
});

function resetSelection() {
  document
    .querySelectorAll("#numberButtons .number-btn, #bounceButtons .number-btn")
    .forEach((btn) => {
      if (
        selectedButtons["step2"] &&
        btn.textContent === selectedButtons["step2"].textContent
      ) {
        btn.classList.add("selected");
        btn.classList.add("active");
      } else {
        btn.classList.remove("selected");
        btn.classList.remove("active");
      }
    });
}

document.getElementById("startOver").addEventListener("click", () => {
  currentStep = 1;
  currentLegIndex = 0;

  document.getElementById("numLegs").value = "";

  selectedButtons = {};
  document.querySelectorAll(".number-btn").forEach((btn) => {
    btn.classList.remove("selected");
    btn.classList.remove("active");
  });

  points = [];

  document
    .querySelectorAll(".step")
    .forEach((step) => step.classList.remove("active"));
  document.querySelector("#step1").classList.add("active");

  document.getElementById("summary").innerHTML = "";

  updateNextButtonVisibility();
});
