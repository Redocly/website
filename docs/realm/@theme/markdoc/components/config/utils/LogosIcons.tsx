import * as React from 'react';
import { Products } from './types';

export interface LogosIconsProps {
  product: Products | string;
  size?: number;
  className?: string;
  title?: string;
}

function RealmLogo({ size = 16, title }: { size?: number; title?: string }): React.ReactElement {
  const gradA = React.useId();
  const gradB = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title || 'Realm'}>
      {title ? <title>{title}</title> : null}
      <path d="M6.25443 2.56438C6.48606 2.33275 6.8616 2.33275 7.09323 2.56438L12.4405 7.91169C12.6722 8.14332 12.6722 8.51886 12.4405 8.75048L7.09323 14.0978C6.8616 14.3294 6.48606 14.3294 6.25443 14.0978L0.907118 8.75048C0.675492 8.51886 0.675492 8.14332 0.907118 7.91169L6.25443 2.56438Z" fill={`url(#${gradA})`}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.4826 2.57595C9.39628 2.48963 9.25632 2.48963 9.17 2.57595L4.23428 7.51167C4.14796 7.59799 4.14796 7.73795 4.23428 7.82427L9.17 12.76C9.25632 12.8463 9.39628 12.8463 9.4826 12.76L14.4183 7.82427C14.5046 7.73795 14.5046 7.59799 14.4183 7.51167L9.4826 2.57595ZM9.7457 1.90126C9.51407 1.66963 9.13853 1.66963 8.9069 1.90126L3.55959 7.24857C3.32796 7.4802 3.32796 7.85574 3.55959 8.08737L8.9069 13.4347C9.13853 13.6663 9.51407 13.6663 9.7457 13.4347L15.093 8.08737C15.3246 7.85574 15.3246 7.4802 15.093 7.24857L9.7457 1.90126Z" fill={`url(#${gradB})`}/>
      <defs>
        <linearGradient id={gradA} x1="0.733398" y1="7.99953" x2="15.2667" y2="7.99953" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1677FF"/>
          <stop offset="1" stopColor="#08C7E0"/>
        </linearGradient>
        <linearGradient id={gradB} x1="3.38591" y1="7.66797" x2="15.2668" y2="7.66797" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D6E7FF"/>
          <stop offset="1" stopColor="#D8F9FE"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function RedocLogo({ size = 16, title }: { size?: number; title?: string }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title || 'Redoc'}>
      {title ? <title>{title}</title> : null}
      <path d="M1.09375 4.49358C1.09375 4.10175 1.41139 3.78411 1.80322 3.78411H10.8489C11.2408 3.78411 11.5584 4.10175 11.5584 4.49358V13.5393C11.5584 13.9311 11.2408 14.2488 10.8489 14.2488H1.80322C1.41139 14.2488 1.09375 13.9311 1.09375 13.5393V4.49358Z" fill="#1677FF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.3992 2.46855C5.2671 2.46855 5.16001 2.57564 5.16001 2.70774V11.2589C5.16001 11.391 5.2671 11.498 5.3992 11.498H13.9503C14.0824 11.498 14.1895 11.391 14.1895 11.2589V2.70774C14.1895 2.57564 14.0824 2.46855 13.9503 2.46855H5.3992ZM5.1519 1.75098C4.76008 1.75098 4.44244 2.06862 4.44244 2.46044V11.5062C4.44244 11.898 4.76008 12.2156 5.1519 12.2156H14.1976C14.5894 12.2156 14.9071 11.898 14.9071 11.5062V2.46044C14.9071 2.06862 14.5894 1.75098 14.1976 1.75098H5.1519Z" fill="#99CDFF"/>
    </svg>
  );
}

function RevelLogo({ size = 16, title }: { size?: number; title?: string }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title || 'Revel'}>
      {title ? <title>{title}</title> : null}
      <path d="M1.06641 8.66967C1.06641 5.44856 3.67763 2.83734 6.89874 2.83734C10.1198 2.83734 12.7311 5.44856 12.7311 8.66967C12.7311 11.8908 10.1198 14.502 6.89874 14.502C3.67763 14.502 1.06641 11.8908 1.06641 8.66967Z" fill="#735CFF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M3.98257 7.33038C3.98257 10.1571 6.27405 12.4485 9.10074 12.4485C11.9274 12.4485 14.2189 10.1571 14.2189 7.33038C14.2189 4.50369 11.9274 2.21221 9.10074 2.21221C6.27405 2.21221 3.98257 4.50369 3.98257 7.33038ZM9.10074 1.49805C5.87963 1.49805 3.26841 4.10927 3.26841 7.33038C3.26841 10.5515 5.87963 13.1627 9.10074 13.1627C12.3218 13.1627 14.9331 10.5515 14.9331 7.33038C14.9331 4.10927 12.3218 1.49805 9.10074 1.49805Z" fill="#C7BBFF"/>
    </svg>
  );
}

function ReefLogo({ size = 16, title }: { size?: number; title?: string }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title || 'Reef'}>
      {title ? <title>{title}</title> : null}
      <path d="M6.25279 1.7558C6.46763 1.63219 6.73232 1.63219 6.94716 1.7558L11.8528 4.57823C12.0676 4.70183 12.2 4.93027 12.2 5.17748V10.8223C12.2 11.0696 12.0676 11.298 11.8528 11.4216L6.94716 14.244C6.73232 14.3676 6.46763 14.3676 6.25279 14.244L1.34718 11.4216C1.13235 11.298 1 11.0696 1 10.8223V5.17748C1 4.93027 1.13235 4.70183 1.34718 4.57823L6.25279 1.7558Z" fill="#A45CFF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.51761 2.43978C9.44481 2.3979 9.35523 2.3979 9.28243 2.43978L4.62561 5.11907C4.55248 5.16115 4.50741 5.23908 4.50741 5.32345V10.6764C4.50741 10.7607 4.55249 10.8387 4.62561 10.8807L9.28244 13.56C9.35523 13.6019 9.44481 13.6019 9.51761 13.56L14.1744 10.8807C14.2476 10.8387 14.2926 10.7607 14.2926 10.6764V5.32345C14.2926 5.23908 14.2476 5.16115 14.1744 5.11907L9.51761 2.43978ZM9.74721 1.75579C9.53237 1.63218 9.26768 1.63218 9.05284 1.75579L4.14723 4.57822C3.93239 4.70183 3.80004 4.93026 3.80004 5.17747V10.8223C3.80004 11.0695 3.93239 11.298 4.14723 11.4216L9.05284 14.244C9.26768 14.3676 9.53237 14.3676 9.74721 14.244L14.6528 11.4216C14.8677 11.298 15 11.0695 15 10.8223V5.17747C15 4.93026 14.8677 4.70183 14.6528 4.57822L9.74721 1.75579Z" fill="#DEB5FF"/>
    </svg>
  );
}

function CLILogo({ size = 16, title }: { size?: number; title?: string }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title || 'Redocly CLI'}>
      {title ? <title>{title}</title> : null}
      <rect width="16" height="16" rx="2" fill="#2467F2"/>
      <path d="M11.6081 5.90831C11.6081 7.56846 10.2617 8.91428 8.60083 8.91428H3.68652V8.62101C5.18535 8.62101 6.40039 7.4065 6.40039 5.90831C6.40039 4.41013 5.18535 3.19561 3.68652 3.19561V2.90234H8.60083C10.2617 2.90234 11.6081 4.24816 11.6081 5.90831Z" fill="white"/>
      <path d="M11.6081 13.02C11.6081 11.3598 10.2617 10.014 8.60083 10.014H3.68652V10.3073C5.18535 10.3073 6.40039 11.5218 6.40039 13.02H11.6081Z" fill="white"/>
    </svg>
  );
}

export function LogosIcons({ product, size = 16, className, title }: LogosIconsProps): React.ReactElement | null {
  const normalized = typeof product === 'string' ? product.toLowerCase() : String(product).toLowerCase();

  if (normalized === Products.REALM.toLowerCase() || normalized === 'realm') {
    return <RealmLogo size={size} title={title || 'Realm'} />;
  }
  if (normalized === Products.REDOC.toLowerCase() || normalized === 'redoc') {
    return <RedocLogo size={size} title={title || 'Redoc'} />;
  }
  if (normalized === Products.REVEL.toLowerCase() || normalized === 'revel') {
    return <RevelLogo size={size} title={title || 'Revel'} />;
  }
  if (normalized === Products.REEF.toLowerCase() || normalized === 'reef') {
    return <ReefLogo size={size} title={title || 'Reef'} />;
  }
  if (normalized === Products.CLI.toLowerCase() || normalized === 'cli') {
    return <CLILogo size={size} title={title || 'Redocly CLI'} />;
  }

  return null;
}

export default LogosIcons;