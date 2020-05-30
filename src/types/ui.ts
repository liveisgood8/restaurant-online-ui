import React from 'react';

type FormControlElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type FormEvent = React.FormEvent<HTMLFormElement>; 
export type ControlChangeEvent = React.FormEvent<FormControlElement>; 