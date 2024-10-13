import { SFC } from '@/types';
import MainContent from './MainContent/index';
import PageTemplate from '@/components/PageTemplate';
import TopBar from '@/components/TopBar';

const MainContainer: SFC = () => {
    return <PageTemplate TopBar={TopBar} MainContent={MainContent} />;
};

export default MainContainer;
