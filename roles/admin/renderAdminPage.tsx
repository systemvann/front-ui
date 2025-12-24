import React from 'react';

import AdminDashboard from './pages/AdminDashboard';
import { renderCommonPage } from '../common/renderCommonPage';

import { Language, UserProfile, UserRole } from '@/types';

interface RenderAdminPageParams {
  activePage: string;
  activeRole: UserRole;
  user: UserProfile;
  lang: Language;
  onNavigate: (pageId: string) => void;
}

export function renderAdminPage({
  activePage,
  activeRole,
  user,
  lang,
  onNavigate,
}: RenderAdminPageParams): React.ReactNode {
  if (activePage === 'dashboard') {
    return <AdminDashboard />;
  }

  return renderCommonPage({ activePage, activeRole, user, lang, onNavigate });
}
