
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MoreHorizontal,
  Plus,
  Circle,
  CalendarX,
  PlaneTakeoff,
  UserX
} from 'lucide-react';
import { Language } from '../types';

interface ActivityEvent {
  id: string;
  day: string;
  month: { EN: string; TH: string };
  title: { EN: string; TH: string };
  time: string;
  type: 'LEARNING' | 'MEETING' | 'DEADLINE' | 'TASK' | 'LEAVE';
  internName?: string;
}

interface ActivitiesPageProps {
  lang: Language;
}

const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ lang }) => {
  const t = {
    EN: {
      title: "Activities & Timeline",
      subtitle: "Upcoming events, workshops, tasks, and approved leaves.",
      calendar: "Calendar Overview",
      nov: "November 2024",
      syncTitle: "Live Ecosystem Sync",
      syncDesc: "Tasks and approved leaves are automatically mirrored here from your workspace and leave manager.",
      days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      absence: "ABSENCE LOG"
    },
    TH: {
      title: "กิจกรรมและลำดับเวลา",
      subtitle: "กิจกรรม, เวิร์กช็อป, งานที่ได้รับมอบหมาย และการลางานที่อนุมัติแล้ว",
      calendar: "ภาพรวมปฏิทิน",
      nov: "พฤศจิกายน 2024",
      syncTitle: "ซิงค์ข้อมูลระบบแล้ว",
      syncDesc: "งานและการลางานที่ได้รับอนุมัติจะถูกแสดงที่นี่โดยอัตโนมัติ",
      days: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
      absence: "บันทึกการลา"
    }
  }[lang];

  const UPCOMING_ACTIVITIES: ActivityEvent[] = [
    { id: 'leave-1', day: '10', month: { EN: 'NOV', TH: 'พ.ย.' }, title: { EN: 'Sick Leave (Unpaid)', TH: 'ลาป่วย (ไม่ได้รับเบี้ยเลี้ยง)' }, time: 'Full Day', type: 'LEAVE' },
    { id: '1', day: '20', month: { EN: 'NOV', TH: 'พ.ย.' }, title: { EN: 'Internal Workshop: Intro to Figma', TH: 'เวิร์กช็อปภายใน: การใช้งาน Figma เบื้องต้น' }, time: '14:00', type: 'LEARNING' },
    { id: '2', day: '22', month: { EN: 'NOV', TH: 'พ.ย.' }, title: { EN: 'Weekly Intern Sync', TH: 'ประชุมติดตามงานประจำสัปดาห์' }, time: '10:00', type: 'MEETING' },
    { id: 'task-1', day: '23', month: { EN: 'NOV', TH: 'พ.ย.' }, title: { EN: 'Task: User Flow Mapping', TH: 'งาน: การจัดทำแผนผังขั้นตอนการใช้งาน' }, time: '09:00 - 12:30', type: 'TASK' },
    { id: 'leave-2', day: '25', month: { EN: 'NOV', TH: 'พ.ย.' }, title: { EN: 'Personal Leave (Away)', TH: 'ลากิจ (ลางาน)' }, time: '09:00 - 18:00', type: 'LEAVE' },
    { id: '4', day: '01', month: { EN: 'DEC', TH: 'ธ.ค.' }, title: { EN: 'Project Review Phase 1', TH: 'การตรวจสอบโครงการระยะที่ 1' }, time: '17:00', type: 'DEADLINE' },
  ];

  const [currentDate] = useState(new Date(2024, 10, 20));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="h-full w-full flex flex-col bg-slate-50/50 overflow-hidden relative p-6 md:p-10 lg:p-12">
      <div className="max-w-7xl mx-auto w-full overflow-y-auto scrollbar-hide pb-20">
        <div className="mb-12">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t.title}</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            {UPCOMING_ACTIVITIES.map((item) => (
              <div key={item.id} className={`bg-white rounded-[1.5rem] p-6 border shadow-sm flex items-center group hover:shadow-md transition-all cursor-pointer ${item.type === 'LEAVE' ? 'border-rose-100 bg-rose-50/10' : 'border-slate-100/60'}`}>
                <div className={`flex flex-col items-center justify-center min-w-[80px] border-r pr-8 mr-8 ${item.type === 'LEAVE' ? 'border-rose-100' : 'border-slate-100'}`}>
                  <span className={`text-2xl font-black leading-none ${item.type === 'LEAVE' ? 'text-rose-500' : 'text-slate-800'}`}>{item.day}</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{item.month[lang]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {item.type === 'LEAVE' && <UserX size={14} className="text-rose-400" />}
                    <h3 className={`text-[15px] font-bold leading-tight group-hover:text-blue-600 transition-colors ${item.type === 'LEAVE' ? 'text-rose-600' : 'text-slate-800'}`}>
                      {item.title[lang]}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-[11px] font-black mt-1 uppercase tracking-wider">{item.time}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border ${
                    item.type === 'LEARNING' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                    item.type === 'MEETING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                    item.type === 'TASK' ? 'bg-slate-50 text-slate-600 border-slate-100' : 
                    item.type === 'LEAVE' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                    'bg-red-50 text-red-500 border-red-100'
                  }`}>{item.type === 'LEAVE' ? t.absence : item.type}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100/60 sticky top-4">
              <h3 className="text-lg font-black text-slate-800 mb-8">{t.calendar}</h3>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{t.nov}</h4>
                  <div className="flex gap-1">
                    <button className="p-1 text-slate-400 hover:text-slate-900"><ChevronLeft size={16} /></button>
                    <button className="p-1 text-slate-400 hover:text-slate-900"><ChevronRight size={16} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center">
                  {t.days.map(d => (<div key={d} className="text-[10px] font-black text-slate-300 py-2">{d}</div>))}
                  {blanks.map(i => <div key={`b-${i}`} />)}
                  {calendarDays.map(day => {
                    const isToday = day === 20;
                    const hasLeave = [10, 25].includes(day);
                    const hasActivity = [20, 22, 23].includes(day);
                    return (
                      <div key={day} className={`relative aspect-square flex items-center justify-center text-xs font-black rounded-xl cursor-pointer transition-all ${isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}>
                        {day}
                        {hasActivity && !isToday && (<div className="absolute bottom-1.5 w-1 h-1 bg-blue-400 rounded-full"></div>)}
                        {hasLeave && !isToday && (<div className="absolute bottom-1.5 w-1 h-1 bg-rose-400 rounded-full"></div>)}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-50">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <CalendarIcon size={16} />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight">{t.syncTitle}</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed font-medium">{t.syncDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
