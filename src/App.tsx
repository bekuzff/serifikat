import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Palette } from 'lucide-react';

export default function App() {
  const [studentName, setStudentName] = useState('Abdujabborov Behruzbek');
  const [courseName, setCourseName] = useState('Full-Stack Web Development');
  const [issueDate, setIssueDate] = useState('06.11.2026');
  const [certId, setCertId] = useState('ITP-2026-999');
  const [instructor, setInstructor] = useState('Director: Jamshidbek T.');
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop');
  
  const [themeColor, setThemeColor] = useState('#06b6d4');
  const [bgColor, setBgColor] = useState('#0f172a');

  const certRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setLogoUrl(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPDF = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    pdf.save(`${studentName}_sertifikat.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center gap-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-cyan-400">
          IT Park & Loyiha Sertifikat Generator
        </h1>
        <p className="text-sm text-slate-400 mt-1">Ma'lumotlarni o'zgartiring va PDF yuklab oling!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col gap-4 shadow-xl">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-cyan-400">
            <Palette className="w-5 h-5" /> Sozlamalar
          </h2>

          <div>
            <label className="text-xs text-slate-400">Talaba Ismi</label>
            <input 
              type="text" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Kurs / Loyiha Nomi</label>
            <input 
              type="text" 
              value={courseName} 
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400">Sana</label>
              <input 
                type="text" 
                value={issueDate} 
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">ID</label>
              <input 
                type="text" 
                value={certId} 
                onChange={(e) => setCertId(e.target.value)}
                className="w-full mt-1 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">Rahbar / Imzo</label>
            <input 
              type="text" 
              value={instructor} 
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full mt-1 bg-slate-950 border border-slate-700 rounded p-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400">Logotip Yuklash</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full mt-1 text-xs text-slate-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <label className="text-xs text-slate-400">Hoshiya Rangi</label>
              <input 
                type="color" 
                value={themeColor} 
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full mt-1 h-8 bg-transparent cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Orqa Fon Rangi</label>
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full mt-1 h-8 bg-transparent cursor-pointer"
              />
            </div>
          </div>

          <button 
            onClick={downloadPDF}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg shadow transition"
          >
            <Download className="w-5 h-5" /> PDF Yuklab Olish
          </button>
        </div>

        <div className="lg:col-span-2 flex justify-center items-center bg-slate-900/50 p-6 rounded-xl border border-slate-800 overflow-x-auto">
          <div 
            ref={certRef}
            style={{ borderColor: themeColor, backgroundColor: bgColor }}
            className="w-[750px] h-[520px] p-8 border-8 rounded-xl relative flex flex-col justify-between shadow-2xl shrink-0 text-white"
          >
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded border border-slate-700" />
                <div>
                  <h3 className="font-bold tracking-widest text-base" style={{ color: themeColor }}>IT PARK RESIDENT</h3>
                  <p className="text-[9px] text-slate-400">Official Verification Certificate</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">ID: {certId}</span>
            </div>

            <div className="text-center my-auto space-y-2">
              <p className="text-xs uppercase tracking-widest text-slate-400">SERTIFIKAT</p>
              <h1 className="text-2xl font-extrabold uppercase" style={{ color: themeColor }}>{studentName}</h1>
              <p className="text-xs max-w-md mx-auto text-slate-300">
                Ushbu sertifikat <span className="font-bold underline">{courseName}</span> yo‘nalishini muvaffaqiyatli yakunlagani uchun berildi.
              </p>
            </div>

            <div className="flex justify-between items-end border-t border-slate-700 pt-3 text-xs">
              <div>
                <p className="font-bold">{issueDate}</p>
                <p className="text-slate-400">Berilgan sana</p>
              </div>
              <div className="text-center">
                <p className="font-serif italic border-b border-slate-500 mb-1">{instructor}</p>
                <p className="text-slate-400">Rahbar imzosi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
