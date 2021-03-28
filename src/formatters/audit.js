import { REVENUE_TYPES } from 'constants/auditDashboard';
import orderBy from 'lodash/orderBy';

export const formatAuditStep = data => {
  const { user_organization_role, wizard_step } = data;

  return {
    userOrganizationRole: user_organization_role,
    wizardStep: wizard_step,
  };
};

export const formatChannels = data => {
  if (!data) return {};

  return {
    [REVENUE_TYPES.EMAIL]: data.Email,
    [REVENUE_TYPES.REFERRAL]: data.Referral,
    // [REVENUE_TYPES.SEO]: data.SEO,
    [REVENUE_TYPES.PAID_SEARCH]: data['Paid Search'],
    [REVENUE_TYPES.AFFILIATES]: data.Affiliates,
    [REVENUE_TYPES.DIRECT]: data.Direct,
    [REVENUE_TYPES.ORGANIC_SEARCH]: data['Organic Search'],
    [REVENUE_TYPES.DISPLAY]: data.Display,
    [REVENUE_TYPES.SMS]: data.SMS,
    [REVENUE_TYPES.RETARGETING]: data.Retargeting,
    [REVENUE_TYPES.SOCIAL]: data.Social,
    [REVENUE_TYPES.OTHER]: data['(Other)'],
  };
};

export const formatCities = data => {
  if (!data) return [];
  const formatted = Object.keys(data).map(key => ({
    city: key,
    value: data[key],
  }));
  return orderBy(formatted, 'value', 'desc');
};

export const formatKeywords = data => {
  if (!data) return [];
  const formed = Object.keys(data).map(key => ({
    name: key,
    adSpend: data[key].ad_spend,
    impressions: data[key].impressions,
  }));

  return orderBy(formed, 'impressions', 'desc');
};

export const formatAuditDashboardData = data => {
  const { last_updated_date, report_data, store_id } = data;
  const {
    last_updated_date: lastUpdatedDate,
    ad_spend_by_channel,
    avg_cpc,
    avg_keyword_score,
    goals,
    keyword_efficacy,
    last_year_ad_spend,
    last_year_revenue,
    revenue_by_channel: revenueByChannel,
    revenue_by_city,
  } = report_data;

  return {
    lastUpdatedDate: last_updated_date,
    storeId: store_id,
    reportData: {
      lastUpdatedDate,
      adSpendByChannel: {
        ...formatChannels(ad_spend_by_channel),
        // paidSearch: ad_spend_by_channel['Paid Search'], // old
        // display: ad_spend_by_channel['Display'],
      },
      avgCpc: avg_cpc,
      avgKeywordsCore: avg_keyword_score,
      goals, // all examples are missing this field
      keywordEfficacy: formatKeywords(keyword_efficacy),
      lastYearAdSpend: last_year_ad_spend,
      lastYearRevenue: last_year_revenue,
      revenueByChannel: {
        ...formatChannels(revenueByChannel),
      },
      revenueByCity: formatCities(revenue_by_city),
    },
  };
};
