import * as React from 'react';
import { SelectPicker, SelectOption } from './SelectPicker';
import { Plan } from '../utils/types';

export interface PlanPickerProps {
  value?: Plan;
  onPlanChange?: (plan: Plan) => void;
  className?: string;
}

export function PlanPicker({ 
  value, 
  onPlanChange, 
  className 
}: PlanPickerProps): React.ReactElement {
  const planOptions: SelectOption<Plan>[] = [
    { value: Plan.COMMUNITY, label: Plan.COMMUNITY },
    { value: Plan.PRO, label: Plan.PRO },
    { value: Plan.ENTERPRISE, label: Plan.ENTERPRISE },
    { value: Plan.ENTERPRISE_PLUS, label: Plan.ENTERPRISE_PLUS },
  ];

  return (
    <SelectPicker
      options={planOptions}
      value={value}
      placeholder="Select a plan"
      onValueChange={onPlanChange}
      className={className}
    />
  );
}
