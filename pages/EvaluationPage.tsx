
import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Link as LinkIcon, 
  ExternalLink, 
  Copy, 
  Check, 
  Upload, 
  Building2, 
  User, 
  Info,
  GraduationCap,
  ClipboardCheck,
  Plus,
  Trash2,
  FileCheck,
  Truck,
  Mail,
  MapPin,
  Save,
  Clock
} from 'lucide-react';
import { Language } from '../types';

interface UniDocument {
  id: string;
  name: string;
  category: 'Sending' | 'Evaluation' | 'Requirement' | 'Other';
  status: 'empty' | 'uploaded';
  fileName?: string;
}

interface EvaluationPageProps {
  lang: Language;
}

const EvaluationPage: React.FC<EvaluationPageProps> = ({ lang }) => {
  const t = {
    EN: {
      title: "University Evaluation",
      subtitle: "Manage documents and links required by your educational institution.",
      portalSync: "University Portal Sync",
      linksTitle: "Supervisor Evaluation Links",
      linksSub: "Paste external form links for your supervisor to fill.",
      addLink: "Add New Evaluation Link",
      linkLabel: "Link Label",
      linkUrl: "Paste URL here...",
      saveLink: "Save Link for Supervisor",
      deliveryTitle: "Evaluation Delivery Details",
      deliverySub: "Provide contact info and instructions for where final documents should be sent.",
      recipient: "Recipient Name / Professor",
      dept: "University Department",
      method: "Delivery Method",
      methodEmail: "Digital (Email)",
      methodPost: "Postal Mail (Hard Copy)",
      methodCarry: "Hand-carry by Intern",
      emailLabel: "Recipient Email Address",
      addressLabel: "Physical Mailing Address",
      instLabel: "Additional Instructions",
      saveInst: "Save Delivery Instructions for Supervisor",
      saving: "Saving Instructions...",
      docsTitle: "University Documentation",
      docsSub: "Upload files required for your academic credit or final sign-off.",
      companyInfo: "Company Info",
      officialName: "Official Name",
      taxId: "Tax ID / Reg",
      deptName: "Department",
      mentorRef: "Mentor Reference",
      finalTasks: "Final Tasks",
      importantNote: "Most universities require these forms 2 weeks before your end date.",
      catSending: "Sending",
      catEval: "Evaluation",
      catReq: "Requirement",
      catOther: "Other"
    },
    TH: {
      title: "การประเมินผลจากมหาวิทยาลัย",
      subtitle: "จัดการเอกสารและลิงก์ที่สถาบันการศึกษาของคุณกำหนด",
      portalSync: "ซิงค์ข้อมูลกับมหาวิทยาลัย",
      linksTitle: "ลิงก์การประเมินสำหรับที่ปรึกษา",
      linksSub: "วางลิงก์แบบฟอร์มภายนอกเพื่อให้ที่ปรึกษาของคุณกรอกข้อมูล",
      addLink: "เพิ่มลิงก์การประเมินใหม่",
      linkLabel: "หัวข้อลิงก์",
      linkUrl: "วาง URL ที่นี่...",
      saveLink: "บันทึกลิงก์สำหรับที่ปรึกษา",
      deliveryTitle: "รายละเอียดการนำส่งผลการประเมิน",
      deliverySub: "ระบุข้อมูลการติดต่อและคำแนะนำในการจัดส่งเอกสารประเมินผลตัวจริง",
      recipient: "ชื่อผู้รับ / อาจารย์",
      dept: "คณะ / ภาควิชา",
      method: "รูปแบบการนำส่ง",
      methodEmail: "ดิจิทัล (อีเมล)",
      methodPost: "ไปรษณีย์ (ฉบับจริง)",
      methodCarry: "นักศึกษานำส่งด้วยตัวเอง",
      emailLabel: "อีเมลของผู้รับ",
      addressLabel: "ที่อยู่ในการจัดส่ง",
      instLabel: "คำแนะนำเพิ่มเติม",
      saveInst: "บันทึกคำแนะนำสำหรับที่ปรึกษา",
      saving: "กำลังบันทึกข้อมูล...",
      docsTitle: "เอกสารของมหาวิทยาลัย",
      docsSub: "อัปโหลดไฟล์ที่จำเป็นสำหรับการขอหน่วยกิตหรือการอนุมัติขั้นสุดท้าย",
      companyInfo: "ข้อมูลบริษัท",
      officialName: "ชื่อบริษัทอย่างเป็นทางการ",
      taxId: "เลขประจำตัวผู้เสียภาษี",
      deptName: "แผนก",
      mentorRef: "ข้อมูลที่ปรึกษา",
      finalTasks: "รายการตรวจสอบสุดท้าย",
      importantNote: "มหาวิทยาลัยส่วนใหญ่ต้องการเอกสารเหล่านี้ 2 สัปดาห์ก่อนวันสิ้นสุดการฝึกงาน",
      catSending: "การส่งตัว",
      catEval: "การประเมิน",
      catReq: "ข้อกำหนด",
      catOther: "อื่นๆ"
    }
  }[lang];

  const [uniDocs] = useState<UniDocument[]>([
    { id: '1', name: lang === 'EN' ? 'University Request Letter' : 'หนังสือขอความอนุเคราะห์จากมหาวิทยาลัย', category: 'Sending', status: 'uploaded', fileName: 'uni_request_alex.pdf' },
    { id: '2', name: lang === 'EN' ? 'Formal Evaluation Form' : 'แบบฟอร์มการประเมินผลงาน', category: 'Evaluation', status: 'empty' },
  ]);

  const [deliveryDetails, setDeliveryDetails] = useState({
    recipientName: 'Dr. Julian Thorne',
    department: 'Faculty of Digital Arts',
    method: 'Email',
    email: 'j.thorne@university-edu.ac',
    address: '',
    instructions: ''
  });

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 overflow-hidden relative p-6 md:p-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div><h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h1><p className="text-slate-500 text-sm mt-1">{t.subtitle}</p></div>
          <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2"><GraduationCap size={16} /> {t.portalSync}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto pb-24 scrollbar-hide pr-1">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><LinkIcon size={20} /></div><div><h2 className="text-xl font-bold text-slate-900">{t.linksTitle}</h2><p className="text-xs text-slate-400 mt-1">{t.linksSub}</p></div></div>
              <div className="bg-blue-50/30 p-6 rounded-[1.5rem] border border-blue-100/50">
                <h4 className="text-[10px] font-black text-blue-400 uppercase mb-4">{t.addLink}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input type="text" placeholder={t.linkLabel} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold" />
                  <input type="url" placeholder={t.linkUrl} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold" />
                </div>
                <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"><Plus size={16} /> {t.saveLink}</button>
              </div>
            </section>
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Truck size={20} /></div><div><h2 className="text-xl font-bold text-slate-900">{t.deliveryTitle}</h2><p className="text-xs text-slate-400 mt-1">{t.deliverySub}</p></div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">{t.recipient}</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" value={deliveryDetails.recipientName} /></div>
                  <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">{t.dept}</label><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" value={deliveryDetails.department} /></div>
                  <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">{t.method}</label><select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" value={deliveryDetails.method}><option value="Email">{t.methodEmail}</option><option value="Postal Mail">{t.methodPost}</option><option value="Hand-carry">{t.methodCarry}</option></select></div>
                </div>
                <div className="space-y-4">
                  {deliveryDetails.method === 'Email' ? (
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">{t.emailLabel}</label><input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs" value={deliveryDetails.email} /></div>
                  ) : (
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">{t.addressLabel}</label><textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs h-[112px] resize-none" /></div>
                  )}
                  <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">{t.instLabel}</label><textarea placeholder="..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs h-[52px] resize-none" /></div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-2xl text-xs font-bold shadow-xl"><Save size={16} /> {t.saveInst}</button>
            </section>
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><FileText size={20} /></div><div><h2 className="text-xl font-bold text-slate-900">{t.docsTitle}</h2><p className="text-xs text-slate-400 mt-1">{t.docsSub}</p></div></div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {uniDocs.map(doc => (
                  <div key={doc.id} className="p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4 overflow-hidden"><div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-300'}`}>{doc.status === 'uploaded' ? <FileCheck size={24} /> : <FileText size={24} />}</div><div className="overflow-hidden"><p className="text-[9px] font-black text-slate-400 uppercase mb-1.5">{doc.category}</p><p className="text-sm font-bold text-slate-800 truncate">{doc.name}</p></div></div>
                    <button className={`w-10 h-10 rounded-xl flex items-center justify-center ${doc.status === 'uploaded' ? 'bg-slate-50 text-slate-400' : 'bg-blue-600 text-white shadow-lg'}`}>{doc.status === 'uploaded' ? <Check size={18} /> : <Upload size={18} />}</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Building2 size={20} className="text-blue-400" /></div><h3 className="text-lg font-bold">{t.companyInfo}</h3></div>
                <div className="space-y-6">
                  <div><p className="text-[9px] font-black text-slate-500 uppercase mb-1.5">{t.officialName}</p><p className="text-xs font-bold">internPlus Tech Solutions Co., Ltd.</p></div>
                  <div className="grid grid-cols-2 gap-4"><div><p className="text-[9px] font-black text-slate-500 uppercase mb-1.5">{t.taxId}</p><p className="text-xs font-bold">0123456789012</p></div><div><p className="text-[9px] font-black text-slate-500 uppercase mb-1.5">{t.deptName}</p><p className="text-xs font-bold">Product Design</p></div></div>
                </div>
              </div>
            </section>
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center"><ClipboardCheck size={18} /></div><h3 className="text-base font-bold text-slate-900">{t.finalTasks}</h3></div>
              <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3"><Info size={16} className="text-blue-500 shrink-0 mt-0.5" /><p className="text-[10px] text-slate-500 font-medium leading-relaxed">{t.importantNote}</p></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
