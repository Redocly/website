import * as React from 'react';
import { SelectPicker, SelectOption } from './SelectPicker';
import { Products } from '../utils/types';
import LogosIcons from '../utils/LogosIcons';

export interface ProductPickerProps {
  value?: Products | Products[];
  onProductChange?: (products: Products | Products[]) => void;
  className?: string;
}

export function ProductPicker({
  value,
  onProductChange,
  className,
}: ProductPickerProps): React.ReactElement {
  const productOptions: SelectOption<Products>[] = [
    { value: Products.REALM, label: Products.REALM, icon: <LogosIcons product={Products.REALM} /> },
    { value: Products.REDOC, label: Products.REDOC, icon: <LogosIcons product={Products.REDOC} /> },
    { value: Products.REVEL, label: Products.REVEL, icon: <LogosIcons product={Products.REVEL} /> },
    { value: Products.REEF, label: Products.REEF, icon: <LogosIcons product={Products.REEF} /> },
    { value: Products.CLI, label: Products.CLI, icon: <LogosIcons product={Products.CLI} /> },
  ];

  return (
    <SelectPicker
      options={productOptions}
      value={value}
      placeholder="Select products"
      onValueChange={onProductChange}
      className={className}
      multiple={true}
    />
  );
}
