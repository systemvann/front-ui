import React from 'react';

import InternDashboard from './pages/InternDashboard';
import { renderCommonPage } from '../common/renderCommonPage';

import { Language, UserProfile, UserRole } from '@/types';

interface RenderInternPageParams {
  activePage: string;
  activeRole: UserRole;
  user: UserProfile;
  lang: Language;
  onNavigate: (pageId: string) => void;
}

export function renderInternPage({
  activePage,
  activeRole,
  user,
  lang,
  onNavigate,
}: RenderInternPageParams): React.ReactNode {
  if (activePage === 'dashboard') {
    return <InternDashboard user={user} onNavigate={onNavigate} lang={lang} />;
  }

  return renderCommonPage({ activePage, activeRole, user, lang, onNavigate });
}
