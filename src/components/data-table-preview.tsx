"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    amount: "$250.00",
    method: "Credit Card",
  },
  {
    invoice: "INV002",
    status: "Pending",
    amount: "$150.00",
    method: "PayPal",
  },
  {
    invoice: "INV003",
    status: "Unpaid",
    amount: "$350.00",
    method: "Bank Transfer",
  },
  {
    invoice: "INV004",
    status: "Paid",
    amount: "$450.00",
    method: "Credit Card",
  },
];

export function DataTablePreview() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>
                <Badge variant={invoice.status === "Paid" ? "default" : invoice.status === "Pending" ? "secondary" : "destructive"}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
