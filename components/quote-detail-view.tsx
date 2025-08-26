"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Edit, ArrowLeft, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for demonstration
const mockQuoteDetail = {
  id: 3,
  title: "Licensed Plastic Keyboard",
  company: {
    name: "Kertzmann, Murazik and Wiegand",
    country: "Brazil",
    website: "https://kertzm...co",
    logo: "/placeholder-logo.png",
  },
  preparedBy: "Kevin Malone",
  preparedFor: "Tamara Orn",
  stages: ["Draft", "Sent", "Accepted"],
  currentStage: "Accepted",
  products: [
    { title: "Intelligent Concrete Tuna", unitPrice: 1000, quantity: 10, discount: 13, total: 8700 },
    { title: "Intelligent Wooden Gloves", unitPrice: 1000, quantity: 8, discount: 41, total: 4720 },
  ],
  subtotal: 13420,
  salesTax: 18,
  total: 15835.6,
  notes: `Dolorum voluptatibus blanditiis ea. Quidem assumenda voluptates amet quo nam magni laboriosam praesentium. Eius distinctio reiciendis cum quibusdam.\nSuscipit repudiandae quos ea ab praesentium. Quam voluptates itaque rerum quis tempore labore dicta. Aperiam rerum deserunt vel ipsa culpa quod sint porro voluptatem.`
};

export function QuoteDetailView({ quote = mockQuoteDetail, onBack }: { quote?: typeof mockQuoteDetail, onBack?: () => void }) {
  const [products, setProducts] = useState(quote.products);

  return (
    <div className="space-y-6">
      {/* Back and Actions */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Quotes
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <FileText className="h-4 w-4 mr-2" /> Convert to PDF
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
        </div>
      </div>

      {/* Title & Stages */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{quote.title}</h1>
        <div className="flex gap-2">
          {quote.stages.map((stage, idx) => (
            <Badge key={stage} variant={stage === quote.currentStage ? "default" : "outline"} className={stage === quote.currentStage ? "bg-green-600" : ""}>
              {stage}
            </Badge>
          ))}
        </div>
      </div>

      {/* Company & Prepared Info */}
      <Card>
        <CardContent className="flex flex-wrap justify-between items-center gap-4 py-6">
          <div className="flex items-center gap-4 min-w-[220px]">
            <img src={quote.company.logo} alt="logo" className="w-16 h-16 rounded bg-white border object-contain" />
            <div>
              <div className="font-semibold">{quote.company.name}</div>
              <div className="text-sm text-muted-foreground">{quote.company.country}</div>
              <a href={quote.company.website} className="text-xs text-blue-600 underline" target="_blank" rel="noopener noreferrer">{quote.company.website}</a>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm min-w-[180px]">
            <div>Prepared by: <span className="font-medium">{quote.preparedBy}</span></div>
            <div>Prepared for: <span className="font-medium">{quote.preparedFor}</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Products/Services Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-2 font-semibold text-lg">Products / Services</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Input value={item.title} readOnly className="bg-white" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">$</span>
                      <Input value={item.unitPrice.toLocaleString()} readOnly className="w-24 bg-white" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input value={item.quantity} readOnly className="w-16 bg-white" />
                  </TableCell>
                  <TableCell>
                    <Input value={item.discount} readOnly className="w-16 bg-white" />
                    <span className="ml-1 text-muted-foreground">%</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">${item.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" disabled>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="text-muted-foreground">waiting for changes ...</div>
            <Button variant="link" size="sm" className="text-blue-600" disabled>
              + Add new item
            </Button>
          </div>
          <div className="flex flex-col items-end gap-1 mt-4">
            <div>Subtotal <span className="ml-4 font-medium">${quote.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
            <div>Sales tax <span className="ml-4 font-medium">{quote.salesTax} %</span></div>
            <div>Total value <span className="ml-4 font-bold text-lg">${quote.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardContent className="pt-4">
          <div className="mb-2 font-semibold">Notes</div>
          <textarea
            className="w-full min-h-[80px] border rounded p-2 text-sm bg-white"
            value={quote.notes}
            readOnly
          />
        </CardContent>
      </Card>
    </div>
  );
}
