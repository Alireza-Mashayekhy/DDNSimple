import { SFC } from '@/types';
import * as S from './Styles';
import defaultAvatar from '@/assets/default-avatar-square.png';
import { getUserData } from '@/utils/authentication.ts';

const Profile: SFC = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const userData = getUserData();

    return (
        <S.Container>
            <S.Image src={userData.image || defaultAvatar} />
            <S.Name>{`${userData.first_name} ${userData.last_name}`}</S.Name>
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
        </S.Container>
    );
};

export default Profile;
