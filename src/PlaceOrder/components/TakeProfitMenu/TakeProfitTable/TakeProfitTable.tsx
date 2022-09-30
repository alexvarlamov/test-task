import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import { OrderSide } from "../../../model";
import { NumberInput } from "../../../../components/NumberInput/NumberInput";

import styles from "./TakeProfitTable.module.scss";

type Row = {
  id: number;
  profit: number;
  targetPrice: number;
  amountToBuy: number;
};

type Props = {
  rows: Array<Row>;
  deleteRow(id: number): void;
  activeOrderSide: OrderSide;
  updateRow(value: any, id: number, argument: string): void;
  recalculateRows(value: any, id: number, argument: string): void;
  currency: string;
};

export const TakeProfitTable = ({
  rows,
  deleteRow,
  activeOrderSide,
  updateRow,
  recalculateRows,
  currency
}: Props) => {
  return (
    <TableContainer className={styles.root}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row: Row) => (
            <TableRow key={row.id}>
              <TableCell className={styles.cellElemWrapper} width="58px">
                <div className={styles.cellElemMainTitle}>Profit</div>
                <NumberInput
                  InputProps={{ endAdornment: "%" }}
                  variant="underlined"
                  value={row.profit}
                  onChange={(value) =>
                    updateRow(Number(value), row.id, "profit")
                  }
                  onBlur={(value) =>
                    recalculateRows(Number(value), row.id, "profit")
                  }
                />
              </TableCell>
              <TableCell className={styles.cellElemWrapper} width="112px">
                <div className={styles.cellElemMainTitle}>Target price</div>
                <NumberInput
                  InputProps={{ endAdornment: currency }}
                  variant="underlined"
                  value={row.targetPrice}
                  onChange={(value) =>
                    updateRow(Number(value), row.id, "targetPrice")
                  }
                  onBlur={(value) =>
                    recalculateRows(Number(value), row.id, "targetPrice")
                  }
                  // error={row.error.targetPrice}
                />
              </TableCell>
              <TableCell className={styles.cellElemWrapper} width="80px">
                <div className={styles.cellElemMainTitle}>
                  Amount to {activeOrderSide === "buy" ? "sell" : "buy"}
                </div>
                <NumberInput
                  InputProps={{ endAdornment: "%" }}
                  variant="underlined"
                  value={row.amountToBuy}
                  onChange={(value) =>
                    updateRow(Number(value), row.id, "amountToBuy")
                  }
                />
              </TableCell>
              <TableCell className={styles.cellElemWrapper} width="15px">
                <CancelIcon
                  className={styles.closeIcon}
                  onClick={() => deleteRow(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
