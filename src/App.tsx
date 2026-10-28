import { AppProvider, useApp } from '@/lib/app-context';
import { AppShell } from '@/components/AppShell';
import { Landing, Auth } from '@/components/Landing';
import { ChatView } from '@/components/ChatView';
import { DocsView } from '@/components/DocsView';
import { CalcView } from '@/components/CalcView';
import { DraftView, NoticeView } from '@/components/DraftView';
import { AcademyView, AdminView } from '@/components/AcademyView';
import { SubscriptionsView } from '@/components/SubscriptionsView';
import { CoursesView } from '@/components/CoursesView';

function Router() {
  const { route } = useApp();

  if (route === 'landing') return <Landing />;
  if (route === 'auth') return <Auth />;

  return (
    <AppShell>
      {route === 'chat' && <ChatView />}
      {route === 'docs' && <DocsView />}
      {route === 'calc' && <CalcView />}
      {route === 'draft' && <DraftView />}
      {route === 'notice' && <NoticeView />}
      {route === 'academy' && <AcademyView />}
      {route === 'admin' && <AdminView />}
      {route === 'subscriptions' && <SubscriptionsView />}
      {route === 'courses' && <CoursesView />}
    </AppShell>
  );
}

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
