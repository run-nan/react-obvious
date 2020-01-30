/**
 * the hook to get and set state of obvious
 * @param {string} stateName the stateName of the obvious state
 * @return {[any, Function]} [value, setValue] corresponding to the value of obvious' state and the method to set the value
 */
declare function useObviousState(stateName: string): any[];
export default useObviousState;
