let currentStep = 2; // เริ่มต้นจาก step 2
let numLegs = 6; // จำนวนขาเริ่มต้น
let selectedButtons = {};
let points = [];
let currentLegIndex = 0;

function nextStep() {
  if (currentStep === 3) {
    if (currentLegIndex < numLegs - 1) {
      currentLegIndex++;
      updateStep3Title();
      resetPointSelection();
    } else {
      currentStep++;
      document.querySelector(`#step${currentStep}`).classList.add("active");
      document
        .querySelector(`#step${currentStep - 1}`)
        .classList.remove("active");

      // แสดงสรุปหลังจากเสร็จสิ้นขั้นตอนทั้งหมด
      displaySummary();
    }
  } else {
    document.querySelector(`#step${currentStep}`).classList.remove("active");
    currentStep++;
    document.querySelector(`#step${currentStep}`).classList.add("active");

    if (currentStep === 3) {
      updateStep3Title();
      resetPointSelection();
    }
  }

  updateNextButtonVisibility();
}

function previousStep() {
  if (currentStep === 3 && currentLegIndex > 0) {
    currentLegIndex--;
    updateStep3Title();
    resetPointSelection();
  } else {
    document.querySelector(`#step${currentStep}`).classList.remove("active");
    currentStep--;
    document.querySelector(`#step${currentStep}`).classList.add("active");
  }

  updateNextButtonVisibility();
}

function updateStep3Title() {
  const step3Title = document.getElementById("step3Title");
  step3Title.innerText = `ขาที่ ${currentLegIndex + 1}`;
}

function updateNextButtonVisibility() {
  const nextButton = document.getElementById(`next${currentStep}`);
  if (nextButton) {
    const isStep2 = currentStep === 2;
    const isStep3 = currentStep === 3;

    let isButtonEnabled = false;

    if (isStep2) {
      isButtonEnabled = selectedButtons["step2"] !== undefined;
    } else if (isStep3) {
      isButtonEnabled =
        selectedButtons[`step3_${currentLegIndex}`] !== undefined;
    }

    nextButton.style.display = isButtonEnabled ? "block" : "none";
  }
}

// สร้างปุ่มตัวเลขสำหรับ Step 2
const numberButtons = document.getElementById("numberButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("number-btn");
  btn.addEventListener("click", () => {
    selectStep2Button(btn, i);
  });
  numberButtons.appendChild(btn);

  // เพิ่มปุ่ม 7.5 หลังจากปุ่ม 7
  if (i === 7) {
    const btn75 = document.createElement("button");
    btn75.textContent = "7.5";
    btn75.classList.add("number-btn");
    btn75.addEventListener("click", () => {
      selectStep2Button(btn75, "7.5");
    });
    numberButtons.appendChild(btn75);
  }
}

// สร้างปุ่ม "เด้ง" สำหรับ Step 2
const bounceButtons = document.getElementById("bounceButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = `${i} เด้ง`;
  btn.classList.add("number-btn", "red");
  btn.addEventListener("click", () => {
    selectStep2Button(btn, `${i} เด้ง`);
  });
  bounceButtons.appendChild(btn);

  // เพิ่มปุ่ม 7.5 เด้งหลังจากปุ่ม 7 เด้ง
  if (i === 7) {
    const btn75Bounce = document.createElement("button");
    btn75Bounce.textContent = "7.5 เด้ง";
    btn75Bounce.classList.add("number-btn", "red");
    btn75Bounce.addEventListener("click", () => {
      selectStep2Button(btn75Bounce, "7.5 เด้ง");
    });
    bounceButtons.appendChild(btn75Bounce);
  }
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

// สร้างปุ่มตัวเลขสำหรับ Step 3
const pointsNumberButtons = document.getElementById("pointsNumberButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = i;
  btn.classList.add("number-btn");
  btn.addEventListener("click", () => {
    selectStep3Button(btn, i);
  });
  pointsNumberButtons.appendChild(btn);

  // เพิ่มปุ่ม 7.5 หลังจากปุ่ม 7
  if (i === 7) {
    const btn75Step3 = document.createElement("button");
    btn75Step3.textContent = "7.5";
    btn75Step3.classList.add("number-btn");
    btn75Step3.addEventListener("click", () => {
      selectStep3Button(btn75Step3, "7.5");
    });
    pointsNumberButtons.appendChild(btn75Step3);
  }
}

// สร้างปุ่ม "เด้ง" สำหรับ Step 3
const pointsBounceButtons = document.getElementById("pointsBounceButtons");
for (let i = 0; i <= 9; i++) {
  const btn = document.createElement("button");
  btn.textContent = `${i} เด้ง`;
  btn.classList.add("number-btn", "red");
  btn.addEventListener("click", () => {
    selectStep3Button(btn, `${i} เด้ง`);
  });
  pointsBounceButtons.appendChild(btn);

  // เพิ่มปุ่ม 7.5 เด้งหลังจากปุ่ม 7 เด้ง
  if (i === 7) {
    const btn75BounceStep3 = document.createElement("button");
    btn75BounceStep3.textContent = "7.5 เด้ง";
    btn75BounceStep3.classList.add("number-btn", "red");
    btn75BounceStep3.addEventListener("click", () => {
      selectStep3Button(btn75BounceStep3, "7.5 เด้ง");
    });
    pointsBounceButtons.appendChild(btn75BounceStep3);
  }
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

  summary.style.display = "block";

  summary.innerHTML = `<p>เจ้า ${
    selectedButtons["step2"] ? selectedButtons["step2"].textContent : ""
  } แต้ม:</p>`;

  points.forEach((point, index) => {
    summary.innerHTML += `<p>ขาที่ ${index + 1}: ${point}</p>`;
  });
}

document.getElementById("backButton2").addEventListener("click", previousStep);
document.getElementById("backButton3").addEventListener("click", previousStep);

document.getElementById("startOver").addEventListener("click", () => {
  currentStep = 2;
  selectedButtons = {};
  points = [];
  currentLegIndex = 0;

  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });
  document.querySelector("#step2").classList.add("active");

  document.querySelectorAll(".number-btn.selected").forEach((button) => {
    button.classList.remove("selected");
    button.classList.remove("active");
  });

  document.getElementById("summary").style.display = "none";
  updateNextButtonVisibility();
});

updateNextButtonVisibility();
