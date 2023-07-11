import AppViewer from '../src/components/view/appView'
import { EventEmitter } from 'events'
import type { DataItem } from '../src/types/types'
import 'ts-jest'

describe('AppViewer', () => {
  let appViewer: AppViewer
  let emitter: EventEmitter
  let testArr: DataItem[]

  beforeEach(() => {
    appViewer = new AppViewer()
    document.body.innerHTML = `
        <div class="editor"></div>
        <div class="html-viewer"></div>
        <div class="levels-wrapper"></div>
        <div class="game-wrapper"></div>
      `
    emitter = new EventEmitter()
    testArr = [
      {
        levelNumber: 'Current level 1',
        selector: 'planet',
        taskDescription: 'Choose all planets using their element selectors',
        examples: 'For example all <p> selectors could be chosen by typing p',
        htmlField: "<div class='container'>\n    <planet></planet>\n    <planet></planet>\n    <planet></planet>\n</div>",
        status: 'uncompleted',
        correctAnswers: ['planet'],
        nameHelpButton: 'Help',
        adviceHelpButton: 'planet',
        editorDescription: '{\n /* Styles will be added\n here */\n }',
        gameHeader: 'CSS Selectors Game starts',
        helpClicked: 'false'
      }
    ]
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should render UI elements and add them to the body', () => {
    appViewer.drawLevel(1, testArr, emitter)
    const editor = document.querySelector('.editor')
    const view = document.querySelector('.html-viewer')
    const levels = document.querySelector('.levels-wrapper')
    const game = document.querySelector('.game-wrapper')
    if (
      editor !== null &&
      view !== null &&
      levels !== null &&
      game !== null
    ) {
      expect(editor.innerHTML).not.toBe('')
      expect(view.innerHTML).not.toBe('')
      expect(levels.innerHTML).not.toBe('')
      expect(game.innerHTML).not.toBe('')
    }
  })

  it('adds animation classes to elements', () => {
    const element1 = document.createElement('div')
    element1.classList.add('selector1')
    document.body.appendChild(element1)

    appViewer.drawLevel(1, testArr, emitter)

    expect(element1.classList.contains('add-animation')).toBe(true)
  })
})
