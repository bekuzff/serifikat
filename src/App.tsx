import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#22d3ee', margin: '0 0 5px 0' }}>
          IT Park & Loyiha Sertifikat Generator
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Ma'lumotlarni o'zgartiring va PDF yuklab oling!</p>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', width: '100%', maxWidth: '1200px', justifyContent: 'center' }}>
        
        {/* Sozlamalar paneli */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px', width: '320px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontSize: '16px', color: '#22d3ee', margin: 0 }}>Sozlamalar</h2>

          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>Talaba Ismi</label>
            <input 
              type="text" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)}
              style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>Kurs / Loyiha Nomi</label>
            <input 
              type="text" 
              value={courseName} 
              onChange={(e) => setCourseName(e.target.value)}
              style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>Sana</label>
              <input 
                type="text" 
                value={issueDate} 
                onChange={(e) => setIssueDate(e.target.value)}
                style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: 'white', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>ID</label>
              <input 
                type="text" 
                value={certId} 
                onChange={(e) => setCertId(e.target.value)}
                style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: 'white', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>Rahbar / Imzo</label>
            <input 
              type="text" 
              value={instructor} 
              onChange={(e) => setInstructor(e.target.value)}
              style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '6px', padding: '8px', color: 'white', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '5px' }}>Logotip Yuklash</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ width: '100%', fontSize: '12px', color: '#94a3b8' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Hoshiya Rangi</label>
              <input 
                type="color" 
                value={themeColor} 
                onChange={(e) => setThemeColor(e.target.value)}
                style={{ width: '100%', height: '35px', backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Orqa Fon</label>
              <input 
                type="color" 
                value={bgColor} 
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '100%', height: '35px', backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}
              />
            </div>
          </div>

          <button 
            onClick={downloadPDF}
            style={{ marginTop: '10px', width: '100%', padding: '12px', backgroundColor: '#22d3ee', color: '#020617', fontWeight: 'bold', borderRadius: '8px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(34, 211, 238, 0.2)' }}
          >
            PDF Yuklab Olish
          </button>
        </div>

        {/* Sertifikat Previyu */}
        <div style={{ overflowX: 'auto', padding: '10px' }}>
          <div 
            ref={certRef}
            style={{ 
              borderColor: themeColor, 
              backgroundColor: bgColor, 
              width: '750px', 
              height: '520px', 
              padding: '40px', 
              borderWidth: '8px', 
              borderStyle: 'solid', 
              borderRadius: '12px', 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
              color: '#ffffff',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={logoUrl} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px' }} />
                <div>
                  <h3 style={{ margin: 0, fontWeight: 'bold', letterSpacing: '2px', fontSize: '16px', color: themeColor }}>IT PARK RESIDENT</h3>
                  <p style={{ margin: 0, fontSize: '9px', color: '#94a3b8' }}>Official Verification Certificate</p>
                </div>
              </div>
              <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#cbd5e1' }}>ID: {certId}</span>
            </div>

            <div style={{ textAlign: 'center', margin: 'auto 0' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: '#94a3b8', margin: '0 0 10px 0' }}>SERTIFIKAT</p>
              <h1 style={{ fontSize: '26px', fontWeight: 'extrabold', textTransform: 'uppercase', color: themeColor, margin: '0 0 15px 0' }}>{studentName}</h1>
              <p style={{ fontSize: '12px', maxWidth: '450px', margin: '0 auto', color: '#cbd5e1', lineHeight: '1.5' }}>
                Ushbu sertifikat <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{courseName}</span> yo‘nalishini muvaffaqiyatli yakunlagani uchun berildi.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '15px', fontSize: '12px' }}>
              <div>
                <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>{issueDate}</p>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '10px' }}>Berilgan sana</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 3px 0', fontStyle: 'italic', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '3px' }}>{instructor}</p>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '10px' }}>Rahbar imzosi</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
