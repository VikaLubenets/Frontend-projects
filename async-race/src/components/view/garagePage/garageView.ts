import type { ElementParams } from '../../../types/types'
import ViewTemplate from '../../util/view-template'
import './garageView.css'

export default class GarageView extends ViewTemplate {
  constructor () {
    const params: ElementParams = {
      tag: 'div',
      classes: ['garage-container'],
      textContent: 'text',
      parentSelector: 'body'
    }
    super(params)
  }
}
