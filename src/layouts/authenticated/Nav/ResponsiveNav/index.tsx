import * as S from './Styles';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import Nav from '..';
import { SFC } from '@/types';
import NewsFeedColumn from '@/components/LeftPannel';

const ResponsiveNav: SFC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [leftPannleOpen, setLeftPannelOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleLeftPannel = () => {
        setLeftPannelOpen(!leftPannleOpen);
    };

    return (
        <>
            <div>
                <IconButton onClick={toggleMenu}>
                    <S.AnimatedIconContainer>
                        <S.HamburgerSpan open={menuOpen}></S.HamburgerSpan>
                        <S.HamburgerSpan open={menuOpen}></S.HamburgerSpan>
                        <S.HamburgerSpan open={menuOpen}></S.HamburgerSpan>
                    </S.AnimatedIconContainer>
                </IconButton>
                <S.SlideOutMenu open={menuOpen} onClick={toggleMenu}>
                    <Nav />
                </S.SlideOutMenu>
            </div>
            <div>
                <S.LeftPanelSlideIconContainer>
                    <IconButton onClick={toggleLeftPannel}>
                        {leftPannleOpen ? (
                            <S.SlidingArrowLeft />
                        ) : (
                            <S.SlidingArrowRight />
                        )}
                    </IconButton>
                </S.LeftPanelSlideIconContainer>
                <S.SlideOutForLeftPanel open={leftPannleOpen}>
                    <NewsFeedColumn />
                </S.SlideOutForLeftPanel>
            </div>
        </>
    );
};

export default ResponsiveNav;
