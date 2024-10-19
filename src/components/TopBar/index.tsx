import * as S from './Styles';
import defaultAvatar from '@/assets/default-avatar.png';
import { Avatar } from 'primereact/avatar';

const TopBar = () => {
    const pages = {
        home: 'صفحه اصلی',
        upload: 'بارگذاری',
        statistics: 'آمار تغییرات',
        records: 'سوابق دارندگان واحدهای صندوق',
        fee: 'محاسبه کارمزد مدیر',
        users: 'کاربران',
    };
    return (
        <>
            <S.ImageContainer>
                <Avatar label="P" size="xlarge" image={defaultAvatar} />
            </S.ImageContainer>
            <S.Gap />
            {/* {Object.keys(pages).map((key) => {
                if (location.pathname.includes(key)) {
                    return pages[key];
                }
            })} */}
            <S.Gap />
            <div className="text-lg ml-2">
                {new Date()
                    .toLocaleDateString('fa-ir', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                    })
                    .toString()}
            </div>
        </>
    );
};

export default TopBar;
