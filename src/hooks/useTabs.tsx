import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';

type TabType = {
  code: string;
  label: React.ReactNode;
  component: React.ReactNode;
};

const useTabs = (tabs: TabType[]) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState((tabs.find((item) => item.code === router.query.tab) ?? tabs[0]).code);

  const handleTabChange = (event: React.SyntheticEvent, value: any) => {
    setActiveTab(value);
    const search = new URLSearchParams({ ...router.query, tab: value }).toString();
    router.push(`${router.pathname}?${search}`, undefined, { shallow: true });
  };

  return [activeTab, handleTabChange] as [any, (event: SyntheticEvent<Element, Event>, value: any) => void];
};

export default useTabs;
