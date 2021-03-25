import { Validators } from '@angular/forms';

import { SelectQuestion } from 'src/app/shared/components/dynamic-forms/models/select-question';
import { InputQuestion } from 'src/app/shared/components/dynamic-forms/models/input-question';

type Question = InputQuestion | SelectQuestion;

let formQuestions: {form: string[], question: Question }[] = [
  { 
    form: ['initial','male','female'],
    question: new SelectQuestion({
      key: 'unitSystem',
      label: 'Unit System:',
      validators: [Validators.required],
      order: 1,
      selectOptions: [
        {key: 'Imperial',  value: 'Imperial'},
        {key: 'Metric',  value: 'Metric'},
      ],
    }),
  },

  { 
    form: ['initial','male','female'],
    question: new SelectQuestion({
      key: 'sex',
      label: 'Sex:',
      validators: [Validators.required],
      order: 2,
      selectOptions: [
        {key: 'Male',  value: 'Male'},
        {key: 'Female',  value: 'Female'},
      ],
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'height',
      label: 'Height:',
      validators: [Validators.required, Validators.min(1)],
      order: 3,
      type: 'number',
      units: 'length',
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'weight',
      label: 'Weight:',
      validators: [Validators.required, Validators.min(1)],
      order: 4,
      type: 'number',
      units: 'weight',
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'age',
      label: 'Age:',
      validators: [Validators.required, Validators.min(1)],
      order: 5,
      type: 'number',
      units: 'age',
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'bmr',
      label: 'BMR:',
      disabled: true,
      order: 6,
      type: 'number',
      units: 'dailyEnergyRequirement',
      labelTooltip: 'Basal Metabolic Rate:<br>Calories burned while at rest.',
      valueTooltip: 'For formula, please select unit system and sex.'
    }),
  },

  { 
    form: ['male','female'],
    question: new SelectQuestion({
      key: 'activityLevel',
      label: 'Activity Level:',
      validators: [Validators.required],
      order: 7,
      selectOptions: [
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
    question: new InputQuestion({
      key: 'dailyCaloricNeed',
      label: 'Daily Caloric Need:',
      disabled: true,
      order: 8,
      type: 'number',
      units: 'dailyEnergyRequirement',
      labelTooltip: 'Calories required to <u>maintain</u> current weight.',
      valueTooltip: 'Formula: (BMR) * (Activity Level)',
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'neckCircum',
      label: 'Neck Circumference:',
      validators: [Validators.required, Validators.min(1)],
      order: 9,
      type: 'number',
      units: 'length',
      valueTooltip: "Measure cirucumference just below the larynx (Adams's apple).",
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'waistCircum',
      label: 'Waist Circumference:',
      validators: [Validators.required, Validators.min(1)],
      order: 10,
      type: 'number',
      units: 'length',
      valueTooltip: 'Measure circumference around the smallest point between top of hips and bottom of ribs.',
    }),
  },

  { 
    form: ['female'],
    question: new InputQuestion({
      key: 'hipCircum',
      label: 'Hip Circumference:',
      validators: [Validators.required, Validators.min(1)],
      order: 11,
      type: 'number',
      units: 'length',
      valueTooltip: 'Measure cicumference around the largest point below the waist.',
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'bodyFatPerc',
      label: 'Body Fat Percent:',
      disabled: true,
      order: 12,
      type: 'number',
      units: 'percent',
      labelTooltip: '<u>Approximate</u> percent of body weight that is fat.',
      valueTooltip: 'For formula, please select unit system.',
    }),
  },

  { 
    form: ['male','female'],
    question: new InputQuestion({
      key: 'leanMass',
      label: 'Lean Mass:',
      disabled: true,
      order: 13,
      type: 'number',
      units: 'weight',
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

  new SelectQuestion({
    key: 'sex',
    label: 'Sex:',
    validators: [Validators.required],
    order: 2,
    selectOptions: [
      {key: 'Male',  value: 'Male'},
      {key: 'Female',  value: 'Female'},
    ],
  }),



  new InputQuestion({
    key: 'height',
    label: 'Height:',
    validators: [Validators.required, Validators.min(1)],
    order: 3,
    type: 'number',
    units: 'length',
  }),

]
