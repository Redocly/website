import React from 'react';
import styled from 'styled-components';

interface TableProps {
  propTypes: TablePropTypes[];
}

interface TablePropTypes {
  property: string;
  propType: string;
  description?: string;
  defaultValue: string;
  required: string;
}

export default function PropsTable(props: TableProps) {
  const tableProps = props.propTypes.map(
    ({ property, propType, description, required, defaultValue }) => {
      return (
        <TableRow key={property}>
          <TableCell className="property">
            {property}
            {required && <span>*</span>}
          </TableCell>
          <TableCell className="prop-type">{propType}</TableCell>
          <TableCell className="desc">
            {description}
            {defaultValue && <span> Default value: </span>}
            {defaultValue}
          </TableCell>
        </TableRow>
      );
    }
  );
  return (
    <Table>
      <thead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Type</TableHeader>
          <TableHeader>Description</TableHeader>
        </TableRow>
      </thead>
      <tbody>{tableProps}</tbody>
    </Table>
  );
}

const Table = styled.table`
  &&& {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
    border: 0;
    table-layout: fixed;
    display: table;
  }
`;

const TableRow = styled.tr`
  &&& {
    border-top: 0;
    border-bottom: 1px solid #f2f2f2;
    &:nth-child(2n) {
      background-color: #fff;
    }
  }
`;

const TableCell = styled.td`
  &&& {
    color: rgba(0, 0, 0, 0.87);
    padding: 16px;
    text-align: left;
    font-weight: 400;
    border: 0;

    &.property,
    &.prop-type,
    &.default-value {
      font-family: Courier New;
    }
    &.property {
      width: 20%;
      span {
        color: ${({ theme }) => theme.colors.primary.main};
      }
    }
    &.prop-type {
      color: ${({ theme }) => theme.colors.primary.main};
      white-space: pre-line;
    }
    &.desc {
      font-family: Source Sans Pro;
      width: 60%;
    }
  }
`;

const TableHeader = styled.th`
  &&& {
    padding: 16px;
    border: 0;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.87);
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }
`;
