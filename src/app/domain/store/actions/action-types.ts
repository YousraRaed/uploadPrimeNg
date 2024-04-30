import * as OrganizationActions from './organization.actions';

export { OrganizationActions };

const actionTypes = {
  ...OrganizationActions,
};

export const allActionTypes = Object.values(actionTypes);
