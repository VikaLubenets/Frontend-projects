import { LocalStorageFactory } from '../src/components/data/storage/localStorageData'
import { type DataItem } from '../src/types/types'

describe('LocalStorageFactory', () => {
  let lsStorage: LocalStorageFactory
  let testObject: DataItem

  beforeEach(() => {
    lsStorage = new LocalStorageFactory()
    testObject = {
      value: 'data',
      levelNumber: '',
      selector: '',
      taskDescription: '',
      examples: '',
      htmlField: '',
      status: '',
      correctAnswers: '',
      nameHelpButton: '',
      adviceHelpButton: '',
      editorDescription: '',
      gameHeader: ''
    }
  })

  afterEach(() => {
    localStorage.removeItem('test')
  })

  it('sets data to local storage', () => {
    lsStorage.set('test', testObject)
    expect(localStorage.getItem('test')).toEqual(JSON.stringify(testObject))
  })

  it('gets data from local storage', () => {
    localStorage.setItem('test', JSON.stringify(testObject))
    expect(lsStorage.get('test')).toEqual(testObject)
  })

  it('removes data from local storage', () => {
    localStorage.setItem('test', JSON.stringify(testObject))
    lsStorage.remove('test')
    expect(localStorage.getItem('test')).toBeNull()
  })
})
