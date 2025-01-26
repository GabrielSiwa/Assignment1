// Conversion logic structure
const createConverter = (fromUnit, toUnit) => {
  // Conversion logic here
  const conversionFactors = {
    milesToKm: 1.60934,
    kmToMiles: 0.621371,
  };

  return (input) => {
    const factor =
      fromUnit === "miles" && toUnit === "km"
        ? conversionFactors.milesToKm
        : conversionFactors.kmToMiles;

    if (Array.isArray(input)) {
      return input.map((value) => parseFloat(value) * factor);
    }
    return parseFloat(input) * factor;
  };
};

// Each tab can do metric unit to imperial unit conversion & vice versa

// Must be able to convert single value and array list of values

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input-value");
  const outputField = document.getElementById("output-value");
  const convertButton = document.getElementById("convert-button");

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
});
