import { SFC } from '@/types';
import * as S from './Styles';
import { mdiCog } from '@mdi/js';
import { useState } from 'react';
import SettingModal from './SettingModal';

const ProfileMenu: SFC = () => {
    const [settingModalVisible, setSettingModalVisible] = useState(false);

    return (
        <S.Container>
            <S.MenuButton
                onClick={() => setSettingModalVisible(true)}
                aria-controls="popup_menu"
                aria-haspopup
            >
                <S.MenuIcon path={mdiCog} size={1} />
            </S.MenuButton>

            {/*  Setting Modal  */}
            <SettingModal
                visible={settingModalVisible}
                setVisibleProp={setSettingModalVisible}
            />
        </S.Container>
    );
};

export default ProfileMenu;
