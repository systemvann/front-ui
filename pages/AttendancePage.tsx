
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Filter, 
  Play, 
  Square, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  Info,
  Home,
  Building2
} from 'lucide-react';
import { Language } from '../types';

type WorkMode = 'WFH' | 'WFO';

interface AttendanceRecord {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: 'PRESENT' | 'LATE' | 'ABSENT';
  workMode: WorkMode;
  workDuration?: string;
}

interface AttendancePageProps {
  lang: Language;
}

const INITIAL_HISTORY: AttendanceRecord[] = [
  { id: '1', date: '2024-11-04', clockIn: '09:30', clockOut: '18:00', status: 'LATE', workMode: 'WFO', workDuration: '8h 30m' },
  { id: '2', date: '2024-11-03', clockIn: '08:45', clockOut: '17:15', status: 'PRESENT', workMode: 'WFH', workDuration: '8h 30m' },
];

const AttendancePage: React.FC<AttendancePageProps> = ({ lang }) => {
  const [history, setHistory] = useState<AttendanceRecord[]>(INITIAL_HISTORY);
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [activeWorkMode, setActiveWorkMode] = useState<WorkMode>('WFO');
  const [pendingWorkMode, setPendingWorkMode] = useState<WorkMode>('WFO');
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const t = {
    EN: {
      title: "Time Attendance",
      subtitle: "Track your working hours and view history.",
      clockInBtn: "Clock In Now",
      clockOutBtn: "Clock Out Now",
      filter: "Time Report Filter",
      dateRange: "Date Range",
      statusFilter: "Status Filter",
      allStatus: "All Status",
      apply: "Apply Filter",
      session: "Active Session",
      office: "At Office",
      home: "Working Home",
      startedAt: "Started at",
      history: "Attendance History",
      last30: "Last 30 Days",
      dateCol: "Date",
      inCol: "Clock In",
      outCol: "Clock Out",
      modeCol: "Mode",
      statusCol: "Status",
      present: "PRESENT",
      late: "LATE"
    },
    TH: {
      title: "ลงเวลาเข้าออก",
      subtitle: "ติดตามเวลาทำงานและดูประวัติย้อนหลัง",
      clockInBtn: "ลงเวลาเข้างาน",
      clockOutBtn: "ลงเวลาออกงาน",
      filter: "ตัวกรองรายงานเวลา",
      dateRange: "ช่วงวันที่",
      statusFilter: "กรองตามสถานะ",
      allStatus: "สถานะทั้งหมด",
      apply: "ใช้ตัวกรอง",
      session: "ช่วงเวลาทำงานปัจจุบัน",
      office: "ทำงานที่ออฟฟิศ",
      home: "ทำงานจากบ้าน",
      startedAt: "เริ่มเมื่อเวลา",
      history: "ประวัติการลงเวลา",
      last30: "30 วันที่ผ่านมา",
      dateCol: "วันที่",
      inCol: "เวลาเข้า",
      outCol: "เวลาออก",
      modeCol: "รูปแบบ",
      statusCol: "สถานะ",
      present: "ปกติ",
      late: "สาย"
    }
  }[lang];

  const handleClockToggle = () => {
    if (!isClockedIn) {
      const now = new Date();
      setClockInTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setActiveWorkMode(pendingWorkMode);
      setIsClockedIn(true);
    } else {
      setIsClockedIn(false);
      setClockInTime(null);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 overflow-hidden relative p-4 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-12">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{t.title}</h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">{t.subtitle}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {!isClockedIn && (
              <div className="flex p-1 bg-slate-200/50 rounded-2xl border border-slate-200/50 h-fit">
                <button onClick={() => setPendingWorkMode('WFO')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${pendingWorkMode === 'WFO' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}><Building2 size={14} /> WFO</button>
                <button onClick={() => setPendingWorkMode('WFH')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${pendingWorkMode === 'WFH' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}><Home size={14} /> WFH</button>
              </div>
            )}
            <button onClick={handleClockToggle} className={`flex items-center gap-3 px-8 py-3 rounded-2xl font-bold text-sm transition-all shadow-xl ${isClockedIn ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
              {isClockedIn ? <><Square size={18} fill="currentColor" /> {t.clockOutBtn}</> : <><Play size={18} fill="currentColor" /> {t.clockInBtn}</>}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-8">{t.filter}</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">{t.dateRange}</label>
                  <div className="flex flex-col gap-3">
                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">{t.statusFilter}</label>
                  <div className="relative">
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-600 appearance-none outline-none cursor-pointer">
                      <option>{t.allStatus}</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3.5 rounded-2xl text-xs font-bold border border-blue-100/50"><Filter size={16} /> {t.apply}</button>
              </div>
            </div>

            {isClockedIn && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-xl animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Clock size={20} /></div>
                    <div>
                      <h4 className="text-xs font-bold uppercase opacity-70">{t.session}</h4>
                      <p className="text-sm font-black">{activeWorkMode === 'WFO' ? t.office : t.home}</p>
                    </div>
                  </div>
                </div>
                <div className="text-4xl font-black mb-4">{currentTime.toLocaleTimeString()}</div>
                <div className="bg-white/10 p-4 rounded-2xl flex justify-between">
                  <div><p className="text-[9px] uppercase font-bold opacity-60">{t.startedAt}</p><p className="text-sm font-bold">{clockInTime}</p></div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold text-slate-900">{t.history}</h3>
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.last30}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase pl-4">{t.dateCol}</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase">{t.inCol}</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase">{t.outCol}</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase">{t.modeCol}</th>
                    <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase">{t.statusCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((record) => (
                    <tr key={record.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-6 pl-4 font-bold text-slate-700 text-sm">{record.date}</td>
                      <td className="py-6 text-sm">{record.clockIn}</td>
                      <td className="py-6 text-sm">{record.clockOut || '--'}</td>
                      <td className="py-6">
                        <div className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-[9px] font-bold">{record.workMode}</div>
                      </td>
                      <td className="py-6">
                        <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${record.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {record.status === 'PRESENT' ? t.present : t.late}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
