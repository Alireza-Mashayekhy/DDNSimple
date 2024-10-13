import { useState } from 'react';
import { SFC } from '@/types';
import * as S from './Styles';

interface TopBarProps {
    isSecondColumnVisible: boolean;
    toggleSecondColumn: () => void;
}

interface PageTemplateProps {
    TopBar?: SFC<TopBarProps>;
    MainContent?: SFC;
}

const PageTemplate: SFC<PageTemplateProps> = ({ TopBar, MainContent }) => {
    const [isSecondColumnVisible, setIsSecondColumnVisible] = useState(true);

    const toggleSecondColumn = () => {
        setIsSecondColumnVisible(!isSecondColumnVisible);
    };
    return (
        <>
            <S.Container>
                <S.FirstColumn>
                    <S.TopRow>
                        {TopBar && (
                            <TopBar
                                isSecondColumnVisible={isSecondColumnVisible}
                                toggleSecondColumn={toggleSecondColumn}
                            />
                        )}
                    </S.TopRow>
                    <S.FlexContainerSecondRow>
                        <div>{MainContent && <MainContent />}</div>
                    </S.FlexContainerSecondRow>
                </S.FirstColumn>
            </S.Container>
        </>
    );
};

export default PageTemplate;
