import { LocalStorageFactory } from '../src/components/data/storage/localStorageData'
import { type DataItem } from '../src/types/types'
import 'ts-jest'

const localStorageMock = (function () {
  let storage = {};

  return {
    getItem(key) {
      return storage[key];
    },

    setItem(key, value) {
      storage[key] = value;
    },

    removeItem(key) {
      delete storage[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

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
    window.localStorage.removeItem('test')
  })

  it('sets data to local storage', () => {
    lsStorage.set('test', testObject)
    expect(window.localStorage.getItem('test')).toEqual(JSON.stringify(testObject))
  })

  it('gets data from local storage', () => {
    window.localStorage.setItem('test', JSON.stringify(testObject))
    expect(lsStorage.get('test')).toEqual(testObject)
  })

  it('removes data from local storage', () => {
    window.localStorage.setItem('test', JSON.stringify(testObject))
    lsStorage.remove('test')
    expect(window.localStorage.getItem('test')).toBeNull()
  })
})
