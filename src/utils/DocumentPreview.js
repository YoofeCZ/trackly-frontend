import React, { useState, useCallback, useEffect } from "react";
import Mammoth from "mammoth";

const DocumentPreview = ({ templatePath }) => {
  const [htmlContent, setHtmlContent] = useState("");

  // Stabilizace funkce loadTemplate pomocí useCallback
  const loadTemplate = useCallback(async () => {
    try {
      const response = await fetch(templatePath);
      const templateArrayBuffer = await response.arrayBuffer();
      const { value } = await Mammoth.convertToHtml({ arrayBuffer: templateArrayBuffer });
      setHtmlContent(value);
    } catch (error) {
      console.error("Chyba při načítání šablony:", error);
    }
  }, [templatePath]); // Závisí pouze na templatePath

  // useEffect s loadTemplate v závislostech
  // Ignorování ESLint varování, pokud jste si jisti, že je vše správně
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default DocumentPreview;
