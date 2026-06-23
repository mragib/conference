"use client";

import * as XLSX from "xlsx";

interface ExportButtonProps {
  data: any[];
  fileName?: string;
}

export default function ExportExcelButton({
  data,
  fileName = "DataExport",
}: ExportButtonProps) {
  const handleExport = () => {
    const formattedData = data.map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          key
            .replace(/_/g, " ") // remove _
            .replace(/\b\w/g, (c) => c.toUpperCase()), // Title Case
          value,
        ]),
      ),
    );

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Make header bold
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });

      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: {
            bold: true,
          },
        };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "");

    XLSX.writeFile(workbook, `${fileName}-${dateStr}-${timeStr}.xlsx`, {
      cellStyles: true,
    });
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 m-2 bg-green-600 text-white rounded hover:bg-green-700 dynamic-btn"
    >
      Export to Excel
    </button>
  );
}
