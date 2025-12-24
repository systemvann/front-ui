
import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Info, 
  FileText, 
  Send, 
  RefreshCw, 
  Check, 
  Copy,
  Layout,
  Settings2,
  ArrowUpRight,
  UserCheck,
  Briefcase,
  Users
} from 'lucide-react';
import { UserRole } from '../types';

const InvitationsPage: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [inviteRole, setInviteRole] = useState<UserRole>('INTERN');
  
  const generateRandomCode = (length: number = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [currentInviteCode, setCurrentInviteCode] = useState("");
  const [recipientName, setRecipientName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedHrLead, setSelectedHrLead] = useState('');
  const [selectedDept, setSelectedDept] = useState('Design');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [emailSubject, setEmailSubject] = useState('Welcome to the internPlus Program!');
  const [emailBody, setEmailBody] = useState('');

  // Update default email body based on role
  useEffect(() => {
    if (inviteRole === 'INTERN') {
      setEmailBody('Dear {{NAME}},\n\nCongratulations! We are thrilled to invite you to join the internPlus team as a trainee. Your internship is scheduled to begin on {{START_DATE}} at {{START_TIME}}.\n\nYou will be reporting directly to {{SUPERVISOR_NAME}} who will serve as your primary mentor.\n\nPlease use the following unique secure invitation code to initialize your portal access: {{INVITE_CODE}}');
    } else {
      setEmailBody('Dear {{NAME}},\n\nWelcome to the internPlus Mentorship team. We are granting you Supervisor access to manage trainees within the {{DEPARTMENT}} division. Your primary point of contact for HR matters will be {{HR_LEAD}}.\n\nPlease use the following unique secure invitation code to initialize your administrative profile: {{INVITE_CODE}}');
    }
  }, [inviteRole]);

  useEffect(() => {
    setCurrentInviteCode(generateRandomCode());
  }, []);

  const regenerateInviteCode = () => {
    setCurrentInviteCode(generateRandomCode());
  };

  const handleSendInvite = () => {
    if (!inviteEmail || !recipientName) {
      alert('Please fill in Name and Email.');
      return;
    }
    if (inviteRole === 'INTERN' && !selectedSupervisor) {
      alert('Please assign a Supervisor for the Trainee.');
      return;
    }
    if (inviteRole === 'SUPERVISOR' && !selectedHrLead) {
      alert('Please assign an HR Lead for the Supervisor.');
      return;
    }

    const leadInfo = inviteRole === 'INTERN' ? `Supervisor: ${selectedSupervisor}` : `HR Lead: ${selectedHrLead}`;
    alert(`Invitation deployed for ${recipientName} as ${inviteRole}\n${leadInfo}\nCode: ${currentInviteCode}`);
    
    setRecipientName('');
    setInviteEmail('');
    setSelectedSupervisor('');
    setSelectedHrLead('');
    setCurrentInviteCode(generateRandomCode());
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-50 overflow-hidden relative p-4 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Invitations</h1>
            <p className="text-slate-500 text-sm font-medium pt-2">Manage and deploy secure access codes to new trainees or supervisors.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-8 space-y-8">
              {/* Main Invitation Form Card */}
              <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                
                {/* Role Switcher */}
                <div className="flex justify-center mb-12">
                   <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
                      <button 
                        onClick={() => setInviteRole('INTERN')}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inviteRole === 'INTERN' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <User size={16} /> Intern
                      </button>
                      <button 
                        onClick={() => setInviteRole('SUPERVISOR')}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inviteRole === 'SUPERVISOR' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <ShieldCheck size={16} /> Supervisor
                      </button>
                   </div>
                </div>

                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-14 h-14 ${inviteRole === 'INTERN' ? 'bg-blue-600' : 'bg-indigo-600'} text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-blue-100 transition-colors`}>
                    {inviteRole === 'INTERN' ? <UserPlus size={28} /> : <UserCheck size={28} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Deploy {inviteRole === 'INTERN' ? 'Trainee' : 'Mentor'} Access</h2>
                    <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mt-1">Credentials Configuration</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Full Name</label>
                      <div className="relative">
                         <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                         <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Recipient Email</label>
                      <div className="relative">
                         <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                         <input type="email" placeholder="user@company.io" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
                      </div>
                    </div>
                    
                    {/* Unique Access Code Box */}
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Invitation Code</label>
                         <button onClick={regenerateInviteCode} className="text-[10px] font-black text-blue-600 uppercase flex items-center gap-1.5 hover:text-blue-700">
                           <RefreshCw size={12} /> Regenerate
                         </button>
                      </div>
                      <div className="flex items-center justify-between">
                         <p className="text-xl font-black text-slate-900 tracking-[0.2em] uppercase">{currentInviteCode}</p>
                         <span className={`text-[9px] font-black ${inviteRole === 'INTERN' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'} px-2 py-0.5 rounded uppercase`}>Role: {inviteRole}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {inviteRole === 'INTERN' ? (
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Assign Supervisor</label>
                        <div className="relative">
                           <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                           <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer" value={selectedSupervisor} onChange={(e) => setSelectedSupervisor(e.target.value)}>
                              <option value="">Select Supervisor...</option>
                              <option value="Sarah Connor">Sarah Connor (Design)</option>
                              <option value="Marcus Miller">Marcus Miller (Engineering)</option>
                              <option value="Emma Watson">Emma Watson (Product)</option>
                           </select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Assign HR Lead</label>
                          <div className="relative">
                            <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer" value={selectedHrLead} onChange={(e) => setSelectedHrLead(e.target.value)}>
                                <option value="">Select HR Representative...</option>
                                <option value="Vanness Plus">Vanness Plus (HR HQ)</option>
                                <option value="Alicia Keys">Alicia Keys (Benefits Lead)</option>
                                <option value="Tom Hardy">Tom Hardy (Compliance Lead)</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Assign Department</label>
                          <div className="relative">
                             <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                             <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                                <option value="Design">Design Division</option>
                                <option value="Engineering">Engineering Division</option>
                                <option value="Product">Product Division</option>
                                <option value="Operations">Operations Division</option>
                             </select>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Effective Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                          <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Start Time</label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                          <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Template Preview */}
                <div className="space-y-6 pt-10 border-t border-slate-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                      <FileText size={18} className="text-slate-400" /> Dispatch Template Preview
                    </h3>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Subject Line</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Message Content</label>
                    <textarea className="w-full min-h-[180px] bg-slate-50 border border-slate-200 rounded-[2rem] px-8 py-8 text-sm font-medium text-slate-600 leading-relaxed outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none shadow-inner" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                   <button className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">Discard Draft</button>
                   <button onClick={handleSendInvite} className={`flex-[2] py-5 ${inviteRole === 'INTERN' ? 'bg-slate-900 hover:bg-blue-600' : 'bg-[#111827] hover:bg-indigo-600'} text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-3`}>
                     <Send size={18} /> Deploy Official Invite
                   </button>
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 space-y-8">
              {/* Rules & Automation Sidebar */}
              <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                     <ShieldCheck className="text-blue-400" />
                     <h3 className="text-lg font-bold">Protocol Settings</h3>
                  </div>
                  <div className="space-y-4">
                    <RuleToggle label="Notify HR Lead" active={true} />
                    <RuleToggle label="Attach Welcome Kit" active={inviteRole === 'INTERN'} />
                    <RuleToggle label="Grant Audit Rights" active={inviteRole === 'SUPERVISOR'} />
                  </div>
                </div>
              </section>

              <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2"><Settings2 size={16} /> Advanced Audit</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white transition-all">Audit Dispatched Codes</button>
                  <button className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-600 hover:text-white transition-all">View Role permissions</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RuleToggle = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-blue-200 transition-all">
    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{label}</span>
    <div className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${active ? 'bg-blue-600' : 'bg-slate-700'}`}>
      <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

export default InvitationsPage;
