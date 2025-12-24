import React from 'react';

import SupervisorDashboard from './pages/SupervisorDashboard';
import { renderCommonPage } from '../common/renderCommonPage';

import { Language, UserProfile, UserRole } from '../../types';

interface RenderSupervisorPageParams {
  activePage: string;
  activeRole: UserRole;
  user: UserProfile;
  lang: Language;
  onNavigate: (pageId: string) => void;
}

export function renderSupervisorPage({
  activePage,
  activeRole,
  user,
  lang,
  onNavigate,
}: RenderSupervisorPageParams): React.ReactNode {
  if (activePage === 'dashboard') {
    return <SupervisorDashboard user={user} onNavigate={onNavigate} currentTab="dashboard" />;
  }

  if (activePage === 'manage-interns') {
    return <SupervisorDashboard user={user} onNavigate={onNavigate} currentTab="manage-interns" />;
  }

  return renderCommonPage({ activePage, activeRole, user, lang, onNavigate });
}
