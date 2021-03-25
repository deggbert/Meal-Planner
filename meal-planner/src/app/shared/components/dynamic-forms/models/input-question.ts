import { QuestionBase, QuestionBaseOpts, ControlType } from './question-base';

interface InputQuestionOpts extends QuestionBaseOpts<string> {
  type: 'string' | 'number';  //TODO: consider renaming
}

export function isInputQuestion(question: QuestionBase<string>): question is InputQuestion {
  return question.controlType === ControlType.input;
}

export class InputQuestion extends QuestionBase<string> {
  type: string;

  constructor(options: InputQuestionOpts) { 
    super(ControlType.input, options)
    this.type = options.type;  
  }
}