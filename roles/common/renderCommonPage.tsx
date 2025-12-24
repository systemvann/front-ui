import React from 'react';

import ActivitiesPage from '../../pages/ActivitiesPage';
import AllowancePage from '../../pages/AllowancePage';
import AssignmentPage from '../../pages/AssignmentPage';
import AttendancePage from '../../pages/AttendancePage';
import CertificatesPage from '../../pages/CertificatesPage';
import EvaluationPage from '../../pages/EvaluationPage';
import FeedbackPage from '../../pages/FeedbackPage';
import InvitationsPage from '../../pages/InvitationsPage';
import LeaveRequestPage from '../../pages/LeaveRequestPage';
import OffboardingPage from '../../pages/OffboardingPage';
import OnboardingPage from '../../pages/OnboardingPage';
import ProfilePage from '../../pages/ProfilePage';
import SystemSettingsPage from '../../pages/SystemSettingsPage';
import TrainingPage from '../../pages/TrainingPage';
import WithdrawalPage from '../../pages/WithdrawalPage';

import { Language, UserProfile, UserRole } from '../../types';

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
