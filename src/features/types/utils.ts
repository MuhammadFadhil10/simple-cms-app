export type FieldSelectOptions = {
  id: string;
  value: string;
  optionLabel: string;
};

export interface Field {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  options?: FieldSelectOptions[];
}
