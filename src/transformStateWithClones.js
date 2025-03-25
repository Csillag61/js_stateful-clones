'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    if (!action || !action.type) {
      throw new Error(`Invalid action object: ${JSON.stringify(action)}`);
    }

    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      if (!action.extraData || typeof action.extraData !== 'object') {
        throw new Error(
          `Invalid extraData: ${JSON.stringify(action.extraData)}`,
        );
      }
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      if (!Array.isArray(action.keysToRemove)) {
        throw new Error(
          `Invalid keysToRemove: ${JSON.stringify(action.keysToRemove)}`,
        );
      }
      currentState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    } else {
      throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
