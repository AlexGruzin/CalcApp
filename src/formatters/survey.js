import compact from 'lodash/compact';

export const formatPostSurvey = data => ({
  brand_name: data.brandName || null,
  industry: data.industry || null,
  keywords: data.keywords ? compact(data.keywords.split(' ')) : [],
  slogans: data.slogans || [],
});

export const formatGetSurvey = data => ({
  brandName: data.brand_name || null,
  industry: data.industry || null,
  keywords: data.keywords ? data.keywords.join(' ') : '',
  slogans: data.slogans || [],
});
