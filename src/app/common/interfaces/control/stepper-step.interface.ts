export interface IStepperStep {
  stepIndex: number;
  name: string;
  completed: boolean;
  hasError: boolean;
  errorMessage?: string;
}
