import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function App() {
  const [studentName, setStudentName] = useState('DIANAXON ADILBEKOVA');
  
  // Tayyor yo'nalishlar ro'yxati (o'zingiz ham yozishingiz mumkin)
  const [courseName, setCourseName] = useState('Computer basic knowledge course');
  const [customCourse, setCustomCourse] = useState('');
  
  const [issueDate, setIssueDate] = useState('24.02.2026');
  const [certId, setCertId] = useState('ID: 260192-379');
  const [instructor, setInstructor] = useState('Director of "IT Park Xorazm" LLC,\nSamandarov Dostonbek');
  
  // Logotiplar va rasmlar
  const [logo1, setLogo1] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop');
  const [logo2, setLogo2] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop');
  const [stampUrl, setStampUrl] = useState('');

  const certRef = useRef<HTMLDivElement>(null);

  // Fayl yuklash funksiyalari
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setter(uploadEvent.target?.result as string);
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
    pdf.save(`${studentName}_it_park_certificate.pdf`);
  };

  const activeCourse = customCourse || courseName;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', color: '#0f172a', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a', margin: '0 0 5px 0' }}>
          IT Park Sertifikat Generator (Rasmdagidek)
        </h1>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Ma'lumotlarni kiriting, yo'nalish tanlang va PDF qilib yuklab oling!</p>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', width: '100%', maxWidth: '1250px', justifyContent: 'center' }}>
        
        {/* Sozlamalar paneli */}
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', padding: '20px', borderRadius: '12px', width: '340px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', color: '#16a34a', margin: 0 }}>Sozlamalar va Ma'lumotlar</h2>

          <div>
            <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '3px' }}>Talaba F.I.O</label>
            <input 
              type="text" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#475569', display: 'block', marginBottom: '3px' }}>Yo'nalishni tanlang</label>
            <select 
              value={courseName} 
              onChange={(e) => { setCourseName(e.target.value); setCustomCourse(''); }}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', boxSizing: 'border-box', marginBottom: '5px', backgroundColor: '#fff' }}
            >
              <option value="Computer basic knowledge course">Computer basic knowledge course</option>
              <option value="Python Programming Development">Python Programming Development</option>
              <option value="Full-Stack Web Development">Full-Stack Web Development</option>
              <option value="Frontend UI/UX Design">Frontend UI/UX Design</option>
              <option value="Robotics and Mechatronics">Robotics and Mechatronics</option>
            </select>
            <input 
              type="text" 
              placeholder="Yoki o'zingiz yangi kurs nomi yozing..." 
              value={customCourse} 
              onChange={(e) => setCustomCourse(e.target.value)}
              style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px', boxSizing: 'border-box', fontSize: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '12px', color:
