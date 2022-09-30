import React, { useState, useEffect, useCallback } from "react";
import { AddProfitTarget } from "./AddProfitTarget/AddProfitTarget";
import { ProjectedProfit } from "./ProjectedProfit/ProjectedProfit";
import { percentOfTheNum } from "../../modulesKernel/percentOfTheNum";
import { TakeProfitTable } from "./TakeProfitTable/TakeProfitTable";
import { createData } from "../../modulesKernel/createData";
import { OrderSide } from "../../model";

type Props = {
  currency: string;
  price: number;
  activeOrderSide: OrderSide;
  amount: number;
};

type Row = {
  id: number;
  profit: number;
  targetPrice: number;
  amountToBuy: number;
};

export const TakeProfitMenu = ({
  currency,
  price,
  activeOrderSide,
  amount
}: Props) => {
  const createTargetPrice = (value: number) =>
    activeOrderSide === "buy" ? price + value : price - value;

  const newTargetPrice = createTargetPrice(percentOfTheNum(price, 2));

  const firstTakeProfitRow = [createData(0, 2, newTargetPrice, 100)];
  const [rows, setRows] = useState(firstTakeProfitRow);

  const deleteRow = (id: number) => {
    setRows(rows.filter((e) => e.id !== id));
  };

  const addRow = () => {
    if (rows.length > 0) {
      const id = rows[rows.length - 1].id + 1;
      const profit = rows[rows.length - 1].profit + 2;
      const targetPrice = createTargetPrice(percentOfTheNum(price, profit));
      const amountToBuy = 20;
      const sumAmountToBuy = rows.reduce(
        (sum, elem) => sum + elem.amountToBuy,
        amountToBuy
      );
      const newRows = [...rows];
      if (sumAmountToBuy > 100) {
        let maxIndex = rows.reduce(
          (acc, curr, i) =>
            rows[acc].amountToBuy > curr.amountToBuy ? acc : i,
          0
        );
        const excess = sumAmountToBuy - 100;
        newRows[maxIndex].amountToBuy -= excess;
      }
      setRows([...newRows, createData(id, profit, targetPrice, amountToBuy)]);
    } else {
      setRows(firstTakeProfitRow);
    }
  };

  const updateRow = (value: number, id: number, argument: string) => {
    const newRows = [...rows];
    const currentRowIndex = rows.findIndex((e) => e.id === id);
    if (argument === "profit") {
      rows[currentRowIndex].profit = value;
    } else if (argument === "targetPrice") {
      rows[currentRowIndex].targetPrice = value;
    } else if (argument === "amountToBuy") {
      rows[currentRowIndex].amountToBuy = value;
    }
    setRows(newRows);
  };

  const recalculateRows = (value: number, id: number, argument: string) => {
    const newRows = [...rows];
    const currentRowIndex = rows.findIndex((e) => e.id === id);
    if (argument === "profit") {
      rows[currentRowIndex].targetPrice = createTargetPrice(
        percentOfTheNum(price, value)
      );
    } else if (argument === "targetPrice" && price > 0) {
      rows[currentRowIndex].profit =
        activeOrderSide === "buy"
          ? ((value - price) / price) * 100
          : ((price - value) / price) * 100;
    }
    setRows(newRows);
  };

  const updateRows = useCallback(
    (newPrice, newRows) => {
      setRows(
        newRows.map((e: Row) => {
          const updatedElement = e;
          e.targetPrice =
            activeOrderSide === "buy"
              ? newPrice + percentOfTheNum(newPrice, e.profit)
              : newPrice - percentOfTheNum(newPrice, e.profit);
          return updatedElement;
        })
      );
    },
    [setRows, activeOrderSide]
  );

  useEffect(() => {
    updateRows(price, rows);
  }, [updateRows, price]); // eslint-disable-line

  const projectedProfitNumber = rows.reduce(
    (sum, elem) =>
      sum +
      percentOfTheNum(amount, elem.amountToBuy) *
        (activeOrderSide === "buy"
          ? elem.targetPrice - price
          : price - elem.targetPrice),
    0
  );

  return (
    <>
      <TakeProfitTable
        activeOrderSide={activeOrderSide}
        currency={currency}
        rows={rows}
        deleteRow={deleteRow}
        updateRow={updateRow}
        recalculateRows={recalculateRows}
      />
      {rows.length < 5 && (
        <AddProfitTarget addRow={addRow} numberOf={rows.length} />
      )}
      <ProjectedProfit
        currency={currency}
        projectedProfitNumber={projectedProfitNumber}
      />
    </>
  );
};
