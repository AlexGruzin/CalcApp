import { ROUTES_PERMISSIONS, ROUTES_FULLY_ACCESSIBLE, IFRAME_BLOCKED_ROUTES } from 'constants/routing';
import { ROLES } from 'constants/roles';

export const isInIframe = () => window.top !== window.self;

export const openNewTab = url => {
  const win = window.open(url, '_blank');
  if (win) {
    win.focus();
  }
};

export const redirectTopFrame = href => {
  window.top.location.href = href;
};

export const closeThisTab = () => {
  window.opener = null;
  window.open('', '_self');
  window.close();
};

export const checkAvailabilityPathByRoles = (targetPath, roles) => {
  /* order is necessary */
  if (isInIframe() && IFRAME_BLOCKED_ROUTES.includes(targetPath)) return { error: {} }; // in iframe some routes not allowed
  if (ROUTES_FULLY_ACCESSIBLE.includes(targetPath)) return { success: targetPath }; // these paths are accessible by anyone
  if (roles.includes(ROLES.ADMIN)) return { success: targetPath }; // admin got full access
  if (roles.length === 0) return { error: {} };

  const allowedRoutesForUser = roles.map(role => ROUTES_PERMISSIONS[targetPath][role]);
  const isAllowed = allowedRoutesForUser.some(item => item === true);
  return isAllowed ? { success: targetPath } : { error: {} };
};
