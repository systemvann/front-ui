import React from 'react';

import ActivitiesPage from '../../pages/intern/ActivitiesPage';
import AllowancePage from '../../pages/intern/AllowancePage';
import AssignmentPage from '../../pages/intern/AssignmentPage';
import AttendancePage from '../../pages/intern/AttendancePage';
import CertificatesPage from '../../pages/intern/CertificatesPage';
import EvaluationPage from '../../pages/intern/EvaluationPage';
import FeedbackPage from '../../pages/intern/FeedbackPage';
import InvitationsPage from '../../pages/admin/InvitationsPage';
import LeaveRequestPage from '../../pages/shared/LeaveRequestPage';
import OffboardingPage from '../../pages/intern/OffboardingPage';
import OnboardingPage from '../../pages/intern/OnboardingPage';
import ProfilePage from '../../pages/intern/ProfilePage';
import SystemSettingsPage from '../../pages/admin/SystemSettingsPage';
import TrainingPage from '../../pages/intern/TrainingPage';
import WithdrawalPage from '../../pages/intern/WithdrawalPage';

import { Language, UserProfile, UserRole } from '@/types';

interface RenderCommonPageParams {
  activePage: string;
  activeRole: UserRole;
  user: UserProfile;
  lang: Language;
  onNavigate: (pageId: string) => void;
}

export function renderCommonPage({
  activePage,
  activeRole,
  user,
  lang,
  onNavigate,
}: RenderCommonPageParams): React.ReactNode {
  switch (activePage) {
    case 'onboarding':
      return <OnboardingPage onNavigate={onNavigate} lang={lang} />;
    case 'training':
      return <TrainingPage onNavigate={onNavigate} lang={lang} />;
    case 'attendance':
      return <AttendancePage lang={lang} />;
    case 'leave':
      return <LeaveRequestPage lang={lang} role={activeRole} />;
    case 'assignment':
      return <AssignmentPage lang={lang} />;
    case 'activities':
      return <ActivitiesPage lang={lang} />;
    case 'feedback':
      return <FeedbackPage lang={lang} user={user} />;
    case 'evaluation':
      return <EvaluationPage lang={lang} />;
    case 'certificates':
      return <CertificatesPage lang={lang} />;
    case 'offboarding':
      return <OffboardingPage lang={lang} />;
    case 'allowance':
      return <AllowancePage lang={lang} />;
    case 'withdrawal':
      return <WithdrawalPage lang={lang} />;
    case 'profile':
      return <ProfilePage lang={lang} />;
    case 'invitations':
      return <InvitationsPage />;
    case 'system-settings':
      return <SystemSettingsPage lang={lang} />;
    default:
      return <div className="p-20 text-center font-bold text-slate-400">Page under development.</div>;
  }
}
