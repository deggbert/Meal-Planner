import { QuestionBase, QuestionBaseOpts, ControlType } from './question-base';

export function isInputQuestion(question: QuestionBase<string>): question is SelectQuestion {
  return question.controlType === ControlType.select;
}

export class SelectQuestion extends QuestionBase<string> {
  constructor(options: QuestionBaseOpts<string> ) {
    super(ControlType.select, options)
  }
}