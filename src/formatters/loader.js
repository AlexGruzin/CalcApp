export const formatLoad = data => ({
  store_id: parseInt(data.clientChoice, 10),
  campaign_name: data.campaignName,
  exclude_oos: true,
  product_ids:
    data.productIds != null
      ? data.productIds
          .replace(', ', ',')
          .split(',')
          .map(x => +x)
      : null,
});
