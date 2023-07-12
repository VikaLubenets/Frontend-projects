import Controller from '../src/components/controller/controller';
import type { DataItem } from '../src/types/types';
import { EventEmitter } from 'events';

describe('Controller', () => {
  let controller: Controller;
  const emitter: EventEmitter = new EventEmitter();
  const data: DataItem[] = [
    {
      levelNumber: 'Level 1',
      selector: 'selector1',
      taskDescription: 'Task 1',
      examples: 'Example 1',
      htmlField: '',
      status: 'completed',
      correctAnswers: ['answer1'],
      nameHelpButton: '',
      adviceHelpButton: '',
      editorDescription: '',
      gameHeader: ''
    },
    {
      levelNumber: 'Level 2',
      selector: 'selector2',
      taskDescription: 'Task 2',
      examples: 'Example 2',
      htmlField: '',
      status: 'completed',
      correctAnswers: ['answer2'],
      nameHelpButton: '',
      adviceHelpButton: '',
      editorDescription: '',
      gameHeader: ''
    }
  ];

  beforeEach(() => {
    controller = new Controller(1, data, emitter);
  });

  describe('isSpecialCase', () => {
    it('should emit GameCompleted event when game is completed', () => {
      const emitSpy = jest.spyOn(emitter, 'emit');
      controller.isSpecialCase();
      expect(emitSpy).toHaveBeenCalledWith('GameCompleted');
    });
  });
});