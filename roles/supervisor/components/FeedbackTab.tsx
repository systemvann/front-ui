import React from 'react';
import { MessageSquareMore, Play, Star, Zap } from 'lucide-react';

export interface FeedbackItem {
  id: string;
  label: string;
  period: string;
  status: string;
  internReflection?: string;
  internProgramFeedback?: string;
  videoUrl?: string;
  supervisorScore?: number;
  programRating: number;
  supervisorComments?: string;
}

interface FeedbackTabProps {
  feedback: FeedbackItem[];
  activeFeedbackId: string;
  onSelectFeedback: (id: string) => void;
  activeFeedback?: FeedbackItem;
  tempScore: number;
  onTempScoreChange: (score: number) => void;
  tempComment: string;
  onTempCommentChange: (comment: string) => void;
  onSave: () => void;
}

const FeedbackTab: React.FC<FeedbackTabProps> = ({
  feedback,
  activeFeedbackId,
  onSelectFeedback,
  activeFeedback,
  tempScore,
  onTempScoreChange,
  tempComment,
  onTempCommentChange,
  onSave,
}) => {
  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500">
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-4">SELECT ASSESSMENT PERIOD</span>
        <div className="flex bg-white p-2 rounded-[2rem] border border-slate-100 shadow-sm w-fit overflow-x-auto scrollbar-hide max-w-full">
          {feedback.map((f) => (
            <button
              key={f.id}
              onClick={() => onSelectFeedback(f.id)}
              className={`px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all flex-shrink-0 ${
                activeFeedbackId === f.id ? 'bg-[#0B0F19] text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {activeFeedback ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.75rem] flex items-center justify-center">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">{activeFeedback.period}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">INTERN SUBMISSION DETAILS</p>
                  </div>
                </div>
                {activeFeedback.status === 'reviewed' && (
                  <div className="bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    REVIEWED
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 pb-12 border-b border-slate-50">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">VLOG REFLECTION</h4>
                  <div className="aspect-video bg-[#0B0F19] rounded-[2.5rem] relative overflow-hidden group/video cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/10 transition-all">
                      <Play size={48} className="text-white fill-white drop-shadow-2xl" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">PROGRAM SATISFACTION</h4>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          activeFeedback.programRating >= s
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-100'
                            : 'bg-slate-50 text-slate-200'
                        }`}
                      >
                        <Star size={20} fill={activeFeedback.programRating >= s ? 'currentColor' : 'none'} />
                      </div>
                    ))}
                  </div>
                  <p className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm leading-relaxed font-medium">
                    "{activeFeedback.internProgramFeedback || 'No feedback provided'}"
                  </p>
                </div>
              </div>

              <div className="p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-4">INTERN SELF-REFLECTION</h4>
                <p className="text-lg text-slate-700 leading-relaxed italic font-medium">
                  "{activeFeedback.internReflection || 'Submission pending'}"
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 h-fit">
            <div className="bg-[#0B0F19] rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px] -mr-20 -mt-20"></div>
              <h3 className="text-xl font-black mb-10 tracking-tight relative z-10">Mentor Evaluation</h3>
              <div className="space-y-10 relative z-10">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TECHNICAL SCORE</label>
                    <span className="text-4xl font-black tracking-tighter text-blue-400">
                      {tempScore}
                      <span className="text-base text-slate-700 ml-1">/100</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    value={tempScore}
                    onChange={(e) => onTempScoreChange(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">EVALUATION FEEDBACK</label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-6 text-sm text-indigo-50 leading-relaxed outline-none focus:ring-4 focus:ring-blue-500/20 h-40 resize-none"
                    placeholder="Provide constructive feedback..."
                    value={tempComment}
                    onChange={(e) => onTempCommentChange(e.target.value)}
                  />
                </div>
                <button
                  onClick={onSave}
                  className="w-full py-5 bg-blue-600 text-white rounded-full font-black text-sm uppercase tracking-[0.15em] shadow-2xl shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
                >
                  DEPLOY ASSESSMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-40 text-center flex flex-col items-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100 shadow-inner">
            <MessageSquareMore size={48} />
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em]">No feedback milestones available</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackTab;
