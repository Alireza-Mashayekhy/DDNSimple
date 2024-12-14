import { SFC } from '@/types';
import * as S from './Styles';
import profileLight from '@/assets/profileLight.png';
import profileDark from '@/assets/profile.png';
import pattern from '@/assets/back-pattern.png';
import { getUserData } from '@/utils/authentication.ts';
import { useSelector } from 'react-redux';
import { getTheme } from '@/redux/selectors';
import { useState } from 'react';
import SettingModal from '../ProfileMenu/SettingModal';

const Profile: SFC = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const userData = getUserData();
    const theme = useSelector(getTheme);
    const [settingModalVisible, setSettingModalVisible] = useState(false);

    return (
        <S.Container>
            <S.PatternBackground src={pattern} />
            {userData?.image ? (
                <S.Image
                    src={userData?.image}
                    onClick={() => setSettingModalVisible(true)}
                />
            ) : (
                <S.DefaultImageContainer>
                    <S.DefaultImage
                        src={theme === 'dark' ? profileLight : profileDark}
                        onClick={() => setSettingModalVisible(true)}
                    />
                </S.DefaultImageContainer>
            )}
            <S.Name
                onClick={() => setSettingModalVisible(true)}
            >{`${userData?.first_name} ${userData?.last_name}`}</S.Name>
            <S.Date>
                {currentHour >= 18 || currentHour < 6
                    ? 'شب بخیر؛ '
                    : 'روز بخیر؛ '}
                {currentDate.toLocaleDateString('fa-IR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                })}
            </S.Date>
            <SettingModal
                visible={settingModalVisible}
                setVisibleProp={setSettingModalVisible}
            />
        </S.Container>
    );
};

export default Profile;
