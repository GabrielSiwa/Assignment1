// Conversion logic structure
const createConverter = (fromUnit, toUnit) => {
  // Conversion logic here
  const conversionFactors = {
    milesToKm: 1.60934,
    kmToMiles: 0.621371,
    // Add more conversion factors here
  };

  return (input) => {
    const factor =
      fromUnit === "miles" && toUnit === "km"
        ? conversionFactors.milesToKm
        : conversionFactors.kmToMiles;
        // Add more conversion factors here

    if (Array.isArray(input)) {
      return input.map((value) => parseFloat(value) * factor);
    }
    return parseFloat(input) * factor;
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input-value");
  const outputField = document.getElementById("output-value");
  const convertButton = document.getElementById("convert-button");
  const unitSelect = document.getElementById("unit-select");

  let currentCategory = "distance";
  let fromUnit = "miles";
  let toUnit = "km";

  convertButton.addEventListener("click", () => {
    const inputValues = inputField.value.split(",").map((val) => val.trim());
    const fromUnit = inputValues.every((value) => !isNaN(value))
      ? "miles"
      : "km";
    const toUnit = fromUnit === "miles" ? "km" : "miles";
    const converter = createConverter(fromUnit, toUnit);
    const convertedValues = converter(inputValues);
    outputField.value = convertedValues.join(", ");
  });

  unitSelect.addEventListener("change", (e) => {
    const selectedUnit = e.target.value;
    if (selectedUnit === "km") {
      fromUnit = "km";
      toUnit = "miles";
    } else {
      fromUnit = "miles";
      toUnit = "km";
    }
  });

// this gets the current category then sets the from and to units
document.querySelectorAll("nav li").forEach((item) => {
  item.addEventListener("click", (e) => {

    document.querySelectorAll("nav li").forEach((li) => {
      li.classList.remove("bg-blue-500", "text-white", "ring-2", "ring-blue-400");
      li.classList.add("bg-gray-200", "text-gray-900");
    });

  const selectedItem = e.target;
  selectedItem.classList.add("bg-blue-500", "text-white", "ring-2", "ring-blue-400");
  selectedItem.classList.remove("bg-gray-200", "text-gray-900");

    currentCategory = e.target.getAttribute("data-category").toLowerCase();
    console.log(currentCategory);
    if (currentCategory === "distance") {
      fromUnit = "miles";
      toUnit = "km";
    } 
    //add more for other categories

    alert(`Converting ${selectedItem.textContent} conversion`);

    clearFields();
  });  

});

const clearFields = () => {
  inputField.value = ""
  outputField.value= ""
}

});
