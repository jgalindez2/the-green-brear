export const appendChildToParentMutation = ({ parent, child }) => {
  return (state, { childId, parentId }) => {
    const parentToAppend = state.items[parentId]
    parentToAppend[child] = Object.assign({}, parentToAppend[child], { [childId]: childId })
  }
}
