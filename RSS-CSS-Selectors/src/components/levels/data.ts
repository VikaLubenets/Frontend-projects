import { DataItem } from 'types/types';
import jsonData from './levels.json';

const dataArray: DataItem[] = jsonData.map((item) => {
  return {
    levelNumber: item.levelNumber,
    selector: item.selector,
    taskDescription: item.taskDescription,
    examples: item.examples,
    htmlField: item.htmlField,
    status: item.status,
    correctAnswers: item.correctAnswers,
    nameHelpButton: item.nameHelpButton,
    adviceHelpButton: item.adviceHelpButton,
  };
});

export default dataArray;