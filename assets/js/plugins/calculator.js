/**
 * GRITLINE AGGREGATES — Coverage, Volume & Tonnage Calculator (calculator.js)
 * Computes volume (m³ & CFT), metric tons based on IS 383 bulk density,
 * recommended tipper truck load breakdown, and syncs directly with localStorage Quote Cart.
 */

export function initCalculator(onQuoteAdded) {
  const form = document.getElementById('coverage-calculator-form');
  if (!form) return;

  const lengthInput = document.getElementById('calc-length');
  const widthInput = document.getElementById('calc-width');
  const depthInput = document.getElementById('calc-depth');
  const unitSelect = document.getElementById('calc-unit-system');
  const materialSelect = document.getElementById('calc-material');
  const wastageCheck = document.getElementById('calc-wastage');

  const outVolume = document.getElementById('calc-out-volume');
  const outCft = document.getElementById('calc-out-cft');
  const outTons = document.getElementById('calc-out-tons');
  const outTrucks = document.getElementById('calc-out-trucks');
  const outCost = document.getElementById('calc-out-cost');
  const addCalcBtn = document.getElementById('calc-add-to-quote');

  let currentCalcResult = {
    materialName: 'Crushed VSI M-Sand (Zone II)',
    tons: 24.5,
    volumeM3: 14.0
  };

  /**
   * Computes volume, tonnage, and optimal truck load combination.
   */
  const computeMetrics = () => {
    const rawL = Math.max(0.1, parseFloat(lengthInput.value) || 0);
    const rawW = Math.max(0.1, parseFloat(widthInput.value) || 0);
    const rawD = Math.max(0.01, parseFloat(depthInput.value) || 0);
    const unitSystem = unitSelect ? unitSelect.value : 'metric';

    const selectedOption = materialSelect.options[materialSelect.selectedIndex];
    const density = parseFloat(selectedOption.getAttribute('data-density') || '1.65');
    const ratePerTon = parseFloat(selectedOption.getAttribute('data-rate') || '1150');
    const materialName = selectedOption.value;

    let volumeM3 = 0;
    if (unitSystem === 'metric') {
      // Length (m) x Width (m) x Depth (m)
      volumeM3 = rawL * rawW * rawD;
    } else {
      // Feet x Feet x Feet -> convert CFT to m³
      const cft = rawL * rawW * rawD;
      volumeM3 = cft / 35.3147;
    }

    if (wastageCheck && wastageCheck.checked) {
      volumeM3 *= 1.07; // 7% compaction & site grading allowance
    }

    const volumeCft = volumeM3 * 35.3147;
    const totalTons = volumeM3 * density;
    const estimatedInr = Math.round(totalTons * ratePerTon);

    // Recommend truck combination
    let truckRecommendation = '';
    if (totalTons <= 12) {
      truckRecommendation = '1 × 6-Wheeler Light Tipper (10–12 MT)';
    } else if (totalTons <= 22) {
      truckRecommendation = '1 × 10-Wheeler Tandem Dumper (18–22 MT)';
    } else if (totalTons <= 32) {
      truckRecommendation = '1 × 12-Wheeler Tri-Axle Hyva (28–32 MT)';
    } else {
      const hyvaLoads = Math.ceil(totalTons / 30);
      truckRecommendation = `${hyvaLoads} × 12-Wheeler Tri-Axle Hyva Loads (~30 MT each)`;
    }

    if (outVolume) outVolume.textContent = `${volumeM3.toFixed(2)} m³`;
    if (outCft) outCft.textContent = `${Math.round(volumeCft).toLocaleString('en-IN')} CFT`;
    if (outTons) outTons.textContent = `${totalTons.toFixed(1)} MT`;
    if (outTrucks) outTrucks.textContent = truckRecommendation;
    if (outCost) outCost.textContent = `₹${estimatedInr.toLocaleString('en-IN')} (Sample Estimate)`;

    currentCalcResult = {
      materialName,
      tons: parseFloat(totalTons.toFixed(1)),
      volumeM3: parseFloat(volumeM3.toFixed(2))
    };
  };

  [lengthInput, widthInput, depthInput, unitSelect, materialSelect, wastageCheck].forEach((el) => {
    if (el) {
      el.addEventListener('input', computeMetrics);
      el.addEventListener('change', computeMetrics);
    }
  });

  if (addCalcBtn) {
    addCalcBtn.addEventListener('click', () => {
      computeMetrics();
      if (typeof onQuoteAdded === 'function') {
        onQuoteAdded(currentCalcResult.materialName, currentCalcResult.tons, 'Tons');
      }
      addCalcBtn.textContent = 'Added to Quote Request ✓';
      setTimeout(() => {
        addCalcBtn.textContent = 'Send Calculated Tonnage to Quote Form';
      }, 2200);
    });
  }

  computeMetrics();
}

