document.addEventListener("DOMContentLoaded", function () {
  const lightCheckboxes = document.querySelectorAll(".light-checkbox");
  const sendSignalButton = document.getElementById("send-signal");

  function updateSendSignalButtonState() {
    const anyChecked = Array.from(lightCheckboxes).some(
      (checkbox) => checkbox.checked
    );
    sendSignalButton.disabled = !anyChecked;
  }

  function updateIndicator(lightId, state) {
    const indicator = document.getElementById(`indicator-${lightId}`);
    const label = document.querySelector(`[for=light-${lightId}]`).textContent;

    indicator.classList.remove("on", "off");

    if (state === "ON") {
      indicator.classList.add("on");
      indicator.style.backgroundColor = "green";
    } else if (state === "OFF") {
      indicator.classList.add("off");
      indicator.style.backgroundColor = "red";
    } else {
      indicator.style.backgroundColor = "grey";
    }
  }

  lightCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const lightId = this.id.split("-")[1];
      const onOption = document.getElementById(`light-${lightId}-on`);
      const offOption = document.getElementById(`light-${lightId}-off`);

      if (this.checked) {
        onOption.disabled = false;
        offOption.disabled = false;
      } else {
        onOption.disabled = true;
        offOption.disabled = true;
        onOption.checked = false;
        offOption.checked = false;
        updateIndicator(lightId, null);
      }
      updateSendSignalButtonState();
    });

    const onOption = document.getElementById(
      `light-${checkbox.id.split("-")[1]}-on`
    );
    const offOption = document.getElementById(
      `light-${checkbox.id.split("-")[1]}-off`
    );

    onOption.addEventListener("change", function () {
      if (this.checked) {
        updateIndicator(checkbox.id.split("-")[1], "ON");
      }
    });

    offOption.addEventListener("change", function () {
      if (this.checked) {
        updateIndicator(checkbox.id.split("-")[1], "OFF");
      }
    });
  });

  sendSignalButton.addEventListener("click", function () {
    const selectedLights = [];
    const selectedStates = [];

    lightCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const lightId = checkbox.id.split("-")[1];
        const onOption = document.getElementById(`light-${lightId}-on`);
        const offOption = document.getElementById(`light-${lightId}-off`);

        if (onOption.checked) {
          selectedStates.push("On");
        } else if (offOption.checked) {
          selectedStates.push("Off");
        } else {
          alert(`Please select ON or OFF for Light ${lightId}`);
          return;
        }

        selectedLights.push(lightId);
      }
    });

    if (selectedLights.length > 0) {
      const message = `Place- ${selectedLights.join(
        ","
      )} & Power- ${selectedStates.join(",")}`;
      alert(message);
    } else {
      alert("Please select at least one light to control.");
    }
  });

  updateSendSignalButtonState();
});
