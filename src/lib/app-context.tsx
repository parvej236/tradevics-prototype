import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lang } from './i18n';

type Product = 'tax' | 'academy';
type Route = 'chat' | 'docs' | 'calc' | 'draft' | 'notice' | 'academy' | 'admin' | 'subscriptions' | 'courses' | 'landing' | 'auth';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  product: Product;
  setProduct: (p: Product) => void;
  route: Route;
  setRoute: (r: Route) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const [product, setProduct] = useState<Product>('tax');
  const [route, setRoute] = useState<Route>('landing');
  return (
    <AppCtx.Provider value={{ lang, setLang, product, setProduct, route, setRoute }}>
      {children}
    </AppCtx.Provider>
  );
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp outside provider');
  return c;
}
