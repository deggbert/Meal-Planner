import { Validators } from '@angular/forms';

import { QuestionBase } from 'src/app/shared/components/dynamic-forms/models/question-base';
import { DropdownQuestion } from 'src/app/shared/components/dynamic-forms/models/dropdown-question';
import { TextboxQuestion } from 'src/app/shared/components/dynamic-forms/models/textbox-question';


let formQuestions: {form: string[], question: QuestionBase<string>}[] = [
  { 
    form: ['initial','male','female'],
    question: new DropdownQuestion({
      key: 'unitSystem',
      label: 'Unit System:',
      validators: [Validators.required],
      order: 1,
      options: [
        {key: 'Imperial',  value: 'Imperial'},
        {key: 'Metric',  value: 'Metric'},
      ],
    }),
  },

  { 
    form: ['initial','male','female'],
    question: new DropdownQuestion({
      key: 'sex',
      label: 'Sex:',
      validators: [Validators.required],
      order: 2,
      options: [
        {key: 'Male',  value: 'Male'},
        {key: 'Female',  value: 'Female'},
      ],
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'height',
      label: 'Height:',
      validators: [Validators.required, Validators.min(1)],
      order: 3,
      type: 'number',
      measurement: 'length',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'weight',
      label: 'Weight:',
      validators: [Validators.required, Validators.min(1)],
      order: 4,
      type: 'number',
      measurement: 'weight',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'age',
      label: 'Age:',
      validators: [Validators.required, Validators.min(1)],
      order: 5,
      type: 'number',
      measurement: 'age',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'bmr',
      label: 'BMR:',
      disabled: true,
      order: 6,
      type: 'text',
      measurement: 'dailyEnergyRequirement',
      labelTooltip: 'Basal Metabolic Rate:<br>Calories burned while at rest.',
      valueTooltip: 'For formula, please select unit system and sex.'
    }),
  },

  { 
    form: ['male','female'],
    question: new DropdownQuestion({
      key: 'activityLevel',
      label: 'Activity Level:',
      validators: [Validators.required],
      order: 7,
      type: 'number',
      options: [
        {key: 'Sedentary (little or no excerise)',  value: 1.2},
        {key: 'Light (20 mins 1-3 days/week)',  value: 1.375},
        {key: 'Moderate (30 mins 3-5 days/week)',   value: 1.55},
        {key: 'Heavy (60 mins 5-7 days/week)', value: 1.725},
        {key: 'Extreme (60 mins 2x/day)', value: 1.9}
      ],
      labelTooltip: 'Average amount of exercise.',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'dailyCaloricNeed',
      label: 'Daily Caloric Need:',
      disabled: true,
      order: 8,
      type: 'text',
      measurement: 'dailyEnergyRequirement',
      labelTooltip: 'Calories required to <u>maintain</u> current weight.',
      valueTooltip: 'Formula: (BMR) * (Activity Level)',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'neckCircum',
      label: 'Neck Circumference:',
      validators: [Validators.required, Validators.min(1)],
      order: 9,
      type: 'number',
      measurement: 'length',
      valueTooltip: "Measure cirucumference just below the larynx (Adams's apple).",
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'waistCircum',
      label: 'Waist Circumference:',
      validators: [Validators.required, Validators.min(1)],
      order: 10,
      type: 'number',
      measurement: 'length',
      valueTooltip: 'Measure circumference around the smallest point between top of hips and bottom of ribs.',
    }),
  },

  { 
    form: ['female'],
    question: new TextboxQuestion({
      key: 'hipCircum',
      label: 'Hip Circumference:',
      validators: [Validators.required, Validators.min(1)],
      order: 11,
      type: 'number',
      measurement: 'length',
      valueTooltip: 'Measure cicumference around the largest point below the waist.',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'bodyFatPerc',
      label: 'Body Fat Percent:',
      disabled: true,
      order: 12,
      type: 'text',
      measurement: 'percent',
      labelTooltip: '<u>Approximate</u> percent of body weight that is fat.',
      valueTooltip: 'For formula, please select unit system.',
    }),
  },

  { 
    form: ['male','female'],
    question: new TextboxQuestion({
      key: 'leanMass',
      label: 'Lean Mass:',
      disabled: true,
      order: 13,
      type: 'text',
      measurement: 'weight',
      labelTooltip: '<u>Approximate</u> body weight <b>excluding</b> fat.',
      valueTooltip: 'Formula: (weight) - [(weight) * (body fat %)]',
    }),
  },
];

export let initialQuestions = formQuestions.reduce((questionsArr, formQuestion) => {
  if (formQuestion.form.includes('initial')) {
    questionsArr.push(formQuestion.question) 
  }
  return questionsArr;
}, []).sort((a,b) => a.order-b.order);

export let maleQuestions = formQuestions.reduce((questionsArr, formQuestion) => {
  if (formQuestion.form.includes('male')) {
    questionsArr.push(formQuestion.question) 
  }
  return questionsArr;
}, []).sort((a,b) => a.order-b.order);

export let femaleQuestions = formQuestions.reduce((questionsArr, formQuestion) => {
  if (formQuestion.form.includes('female')) {
    questionsArr.push(formQuestion.question) 
  }
  return questionsArr;
}, []).sort((a,b) => a.order-b.order);

export let testFormQuestions = [

  new DropdownQuestion({
    key: 'sex',
    label: 'Sex:',
    validators: [Validators.required],
    order: 2,
    options: [
      {key: 'Male',  value: 'Male'},
      {key: 'Female',  value: 'Female'},
    ],
  }),



  new TextboxQuestion({
    key: 'height',
    label: 'Height:',
    validators: [Validators.required, Validators.min(1)],
    order: 3,
    type: 'number',
    measurement: 'length',
  }),

]
