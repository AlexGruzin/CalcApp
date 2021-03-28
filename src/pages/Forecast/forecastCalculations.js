import { MODEL_TYPES_NAMES } from 'constants/forecast';

export const updateModelRule = (goalRevenue, advertisingBudget) => {
  // calculation rule of growth model
  const conservativeAmount = 0.08 * goalRevenue;
  const aggressiveAmount = 0.16 * goalRevenue;

  let newModelType = MODEL_TYPES_NAMES.MODERATE;
  if (advertisingBudget < conservativeAmount) {
    newModelType = MODEL_TYPES_NAMES.CONSERVATIVE;
  } else if (aggressiveAmount > advertisingBudget && advertisingBudget >= conservativeAmount) {
    newModelType = MODEL_TYPES_NAMES.MODERATE;
  } else if (advertisingBudget >= aggressiveAmount) {
    newModelType = MODEL_TYPES_NAMES.AGGRESSIVE;
  }

  return newModelType;
};

export const updateBudgetRule = (goalRevenue, growthModel) => {
  let newBudget;
  switch (growthModel) {
    case MODEL_TYPES_NAMES.CONSERVATIVE: {
      newBudget = 0.04 * goalRevenue;
      break;
    }
    case MODEL_TYPES_NAMES.MODERATE: {
      newBudget = 0.08 * goalRevenue;
      break;
    }
    case MODEL_TYPES_NAMES.AGGRESSIVE: {
      newBudget = 0.16 * goalRevenue;
      break;
    }
    default: {
      newBudget = 0.08 * goalRevenue;
      break;
    }
  }

  return Math.round(newBudget);
};

export const calculateProjectedMargin = (prodCost, goalRevenue, advertisingBudget) => {
  if (!goalRevenue || !advertisingBudget) return NaN;
  const percent = prodCost
    ? ((goalRevenue - prodCost - advertisingBudget) / goalRevenue) * 100
    : ((goalRevenue - advertisingBudget) / goalRevenue) * 30;
  return percent.toFixed(2);
};
