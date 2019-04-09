export const countObjectProperty = object => object ? Object.keys(object).length : 0

export const editorOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  [{ 'align': [] }]
]

export const removeEmptyData = obj => {
  const objCopy = { ...obj }
  Object.keys(objCopy).forEach(key => {
    if (!objCopy[key]) {
      delete objCopy[key]
    }
  })
  return objCopy
}
