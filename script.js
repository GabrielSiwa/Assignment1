/********************************************************************************************************************
 *    CPRG-306-F - WINTER 2025                                                                                      *
 *    Group 3 : Members                                                                                             *
 *    (1) Alessandra Nicole Claur                                                                                   *
 *    (2) Gabriel Siwa                                                                                   *
 *    (3) Mitzi Escartin
 *    (4) Lulubelle Fontelo                                                                                         *
 *                                                                                                                  *
 ********************************************************************************************************************
 *  Created:    February 06, 2025
 *  Assignment: Build a responsive static website to convert between metric units and imperial units
 * (i.e., between kilograms and pounds, kilometres and miles, and Celsius and Fahrenheit).
 *
 *
 */
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input-value");
  const outputField = document.getElementById("output-value");
  const convertButton = document.getElementById("convert-button");
  const unitSelect = document.getElementById("unit-select");
  const outputUnit = document.getElementById("output-unit");

  let currentCategory = "distance";
  let fromUnit = "miles";
  let toUnit = "km";

  // Conversion options for different categories
  const conversionOptions = {
    distance: [
      { value: "miles", label: "mi" },
      { value: "km", label: "km" },
    ],
    temperature: [
      { value: "fahrenheit", label: "°F" },
      { value: "celsius", label: "°C" },
    ],
    weight: [
      { value: "pounds", label: "lbs" },
      { value: "kilograms", label: "kg" },
    ],
  };

  // Function to handle unit conversion based on selected category
  const createConverter = (fromUnit, toUnit) => {
    const conversionFactors = {
      milesToKm: 1.60934,
      kmToMiles: 0.621371,
    };

    // Function to handle distance conversion
    const performDistanceCalc = (input, fromUnit, toUnit) => {
      const conversionFactors = {
        milesToKm: 1.60934,
        kmToMiles: 0.621371,
      };

      const factor =
        fromUnit === "miles" && toUnit === "km"
          ? conversionFactors.milesToKm
          : conversionFactors.kmToMiles;

      if (Array.isArray(input)) {
        return input.map((value) => parseFloat(value) * factor);
      }
      return parseFloat(input) * factor;
    };

    // Function to handle temperature conversion
    const performTemperatureCalc = (input, fromUnit, toUnit) => {
      if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        // Fahrenheit to Celsius: (F - 32) * (5/9)
        return (parseFloat(input) - 32) * (5 / 9);
      } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        // Celsius to Fahrenheit: (C * 9/5) + 32
        return parseFloat(input) * (9 / 5) + 32;
      }
      return parseFloat(input); // Default: return input as-is
    };

    // Function to handle weight conversion
    const performWeightCalc = (input, fromUnit, toUnit) => {
      const conversionFactors = {
        poundsToKg: 0.453592,
        kgToPounds: 2.20462,
      };

      const factor =
        fromUnit === "pounds" && toUnit === "kilograms"
          ? conversionFactors.poundsToKg
          : conversionFactors.kgToPounds;

      if (Array.isArray(input)) {
        return input.map((value) => parseFloat(value) * factor);
      }
      return parseFloat(input) * factor;
    };

    // Switch between conversion functions based on the current category
    return (input) => {
      switch (currentCategory) {
        case "distance":
          return performDistanceCalc(input, fromUnit, toUnit);
        case "temperature":
          return performTemperatureCalc(input, fromUnit, toUnit);
        case "weight":
          return performWeightCalc(input, fromUnit, toUnit);
        default:
          return parseFloat(input);
      }
    };
  };

  // Function to retrieve the display label of a unit
  const getUnitLabel = (category, unit) => {
    return (
      conversionOptions[category].find((option) => option.value === unit)
        ?.label || ""
    );
  };

  // Update the dropdown and output unit when category changes
  const updateCategory = (category) => {
    unitSelect.innerHTML = "";
    conversionOptions[category].forEach((option) => {
      const opt = document.createElement("option");
      opt.value = option.value;
      opt.textContent = option.label;
      unitSelect.appendChild(opt);
    });

    fromUnit = conversionOptions[category][0].value;
    toUnit = conversionOptions[category][1].value;

    outputUnit.textContent = getUnitLabel(category, toUnit);
  };

  // Handle dropdown change
  unitSelect.addEventListener("change", (e) => {
    const selectedUnit = e.target.value;
    const otherUnit = conversionOptions[currentCategory].find(
      (opt) => opt.value !== selectedUnit
    ).value;

    fromUnit = selectedUnit;
    toUnit = otherUnit;

    outputUnit.textContent = getUnitLabel(currentCategory, toUnit);
  });

  // Handle category selection from the navigation menu
  document.querySelectorAll("nav li").forEach((item) => {
    item.addEventListener("click", (e) => {
      document.querySelectorAll("nav li").forEach((li) => {
        li.classList.remove(
          "bg-blue-500",
          "text-white",
          "ring-2",
          "ring-blue-400"
        );
        li.classList.add("bg-gray-200", "text-gray-900");
      });

      const selectedItem = e.target;
      selectedItem.classList.add(
        "bg-blue-500",
        "text-white",
        "ring-2",
        "ring-blue-400"
      );
      selectedItem.classList.remove("bg-gray-200", "text-gray-900");

      // Update the current category and refresh conversion units
      currentCategory = selectedItem
        .getAttribute("data-category")
        .toLowerCase();
      updateCategory(currentCategory);

      outputUnit.textContent = getUnitLabel(currentCategory, toUnit);
      alert(`Converting ${selectedItem.textContent} conversion`);

      clearFields();
    });
  });

  // Clear input/output fields
  const clearFields = () => {
    inputField.value = "";
    outputField.value = "";
  };

  // Handle conversion when the button is clicked
  convertButton.addEventListener("click", () => {
    const inputValues = inputField.value.split(",").map((val) => val.trim());

    if (inputValues.length > 0) {
      const converter = createConverter(fromUnit, toUnit);
      const convertedValues = inputValues.map((value) => converter(value));

      outputField.value = convertedValues
        .map((val) => val.toFixed(3))
        .join(", ");
    }
  });

  // Initialize category on page load
  updateCategory(currentCategory);
});
