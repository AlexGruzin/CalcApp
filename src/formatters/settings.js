import { DEFAULT_MARKETING_CALENDAR, DEFAULT_TIMEZONE } from 'constants/settings';
import { startOfYear } from 'date-fns';

export const formatGeneralDetails = data => {
  const { fname, lname, email, phone } = data;

  return { firstName: fname || '', lastName: lname || '', email: email || '', phone: phone || '' };
};

export const formatGeneralDetailsUpdate = data => {
  const { firstName, lastName, email, phone } = data;

  return { fname: firstName || '', lname: lastName || '', email: email || '', phone: phone || '' };
};

export const formatTeamMembers = data => {
  if (!data) return [];

  return data.map(member => ({ email: member.email, firstName: member.fname || '', lastName: member.lname || '' }));
};

export const formatTeamMembersUpdate = data =>
  data.map(member => ({ email: member.email, fname: member.firstName || '', lname: member.lastName || '' }));

export const formatStoreDetails = data => {
  if (!data) return {};
  const {
    store_name,
    store_url,
    store_email,
    store_phone,
    store_country,
    store_active_since,
    begin_of_fiscal_year,
    marketing_calendar,
    timezone,
  } = data;

  return {
    storeName: store_name,
    storeUrl: store_url,
    storeEmail: store_email,
    storePhone: store_phone,
    storeCountry: store_country,
    storeActiveSince: new Date(store_active_since).toDateString(),
    fiscalYear: begin_of_fiscal_year ? new Date(begin_of_fiscal_year) : startOfYear(new Date()),
    marketingCalendar: marketing_calendar || DEFAULT_MARKETING_CALENDAR.value,
    timezone: timezone || DEFAULT_TIMEZONE.value,
  };
};

export const formatStoreDetailsUpdate = data => {
  const { fiscalYear, marketingCalendar, timezone } = data;

  return {
    begin_of_fiscal_year: fiscalYear,
    marketing_calendar: marketingCalendar,
    timezone,
  };
};

export const formatNotifications = data => {
  if (!data) return {};

  return {
    campaignStarted: data.campaign_started,
    campaignEnded: data.campaign_ended,
    infoNeed: data.information_needed,
    newConnect: data.new_connection,
    lostConnect: data.lost_connection,
    revenueSpent: data.thirty_percent_of_revenue_spent,
    amountSpent: data.max_dollar_amount_spent,
    roas: data.max_roas,
  };
};

export const formatNotificationsUpdate = data => ({
  campaign_started: data.campaignStarted,
  campaign_ended: data.campaignEnded,
  information_needed: data.infoNeed,
  new_connection: data.newConnect,
  lost_connection: data.lostConnect,
  thirty_percent_of_revenue_spent: data.revenueSpent,
  max_dollar_amount_spent: data.amountSpent,
  max_roas: data.roas,
});
