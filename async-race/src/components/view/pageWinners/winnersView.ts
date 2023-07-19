import { type ElementParams } from '../../../types/types'
import ViewTemplate from '../util/view-template'
import './winnersView.css'

export default class WinnersView extends ViewTemplate {
  constructor () {
    const params: ElementParams = {
      tag: 'div',
      classes: ['winners-conteiner'],
      textContent: 'text',
      parentSelector: 'body'
    }
    super(params)
  }
}
