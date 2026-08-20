'use client';
export default function PrintButton() {
  return <button type="button" className="btn sm noprint" onClick={function () { window.print(); }}>Print / save PDF</button>;
}
