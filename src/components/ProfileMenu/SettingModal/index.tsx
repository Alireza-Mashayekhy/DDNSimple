import { SFC } from '@/types';
import * as S from './Styles.ts';
import defaultAvatar from '@/assets/default-avatar-square.png';
import { useEffect, useRef, useState } from 'react';
import { updateProfile } from '@/api/customerData.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileUpload } from 'primereact/fileupload'; // Import FileUpload type
import { getUserData } from '@/utils/authentication.ts';
import { updateUserData } from '@/dispatchers/authentication.ts';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/store/authentication.ts';

export interface SettingModalProps {
    visible: boolean;
    setVisibleProp: (value: boolean) => void;
}

const SettingModal: SFC<SettingModalProps> = ({ visible, setVisibleProp }) => {
    const [profile, setProfile] = useState(() => {
        const userData = getUserData();
        return userData;
    });
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for the image preview
    const [name, setName] = useState(profile.first_name || '');
    const [lastname, setLastname] = useState(profile.last_name || '');
    const [email, setEmail] = useState(profile.email || '');
    const dispatch = useDispatch();

    const uploadRef = useRef<FileUpload | null>(null);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_APP_API_URL;

    const resetForm = () => {
        setName(profile.first_name);
        setLastname(profile.last_name);
        setEmail(profile.email);
        setImagePreview(profile.image ? profile.image : null);
        setUploadedImage(null);
        if (uploadRef.current) {
            uploadRef.current.clear();
        }
    };

    useEffect(() => {
        if (visible) {
            resetForm();
        }
    }, [visible]);

    const save = () => {
        const formData = new FormData();
        formData.append('national_id', profile.national_id);
        formData.append('first_name', name);
        formData.append('last_name', lastname);
        formData.append('email', email);
        if (uploadedImage) {
            formData.append('image', uploadedImage);
        }

        updateProfile(formData)
            .then((res) => {
                const updatedProfile = res.data;
                const imageUrl = `${BASE_URL}${updatedProfile.image}`;
                const updatedUserData = {
                    ...profile,
                    ...updatedProfile,
                    image: imageUrl,
                };
                console.log(updatedUserData);

                dispatch(setUserData(updatedUserData));
                setProfile(updatedUserData);
                navigate('/');
                setVisibleProp(false);
            })
            .catch((error) => {
                toast(error.message);
            });
    };

    const handleImageSelect = (e: any) => {
        const file = e.files[0];
        if (file) {
            setUploadedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearUpload = () => {
        setUploadedImage(null);
        setImagePreview(null);
        if (uploadRef.current) {
            uploadRef.current.clear();
        }
    };

    const footerContent = (
        <S.FooterContainer>
            <S.FooterButton
                label="انصراف"
                onClick={() => setVisibleProp(false)}
                autoFocus
            ></S.FooterButton>
            <S.FooterButton
                label="ذخیره"
                onClick={() => save()}
                autoFocus
            ></S.FooterButton>
        </S.FooterContainer>
    );

    return (
        <S.Container
            header={'تنظیمات حساب کاربری'}
            footer={footerContent}
            visible={visible}
            onHide={() => {
                if (!visible) return;
                setVisibleProp(false);
            }}
            style={{ width: '45vw', minWidth: '300px' }}
        >
            <S.PhoneContainer>
                شماره موبایل: <S.Phone>{profile.phone || 'نامشخص'}</S.Phone>
            </S.PhoneContainer>

            <S.Image
                size="xlarge"
                shape="circle"
                image={imagePreview || profile.image || defaultAvatar}
            />

            <S.UploadContainer>
                {uploadedImage && imagePreview ? (
                    <S.CancelUpload type={'button'} onClick={clearUpload}>
                        <span>+</span>
                    </S.CancelUpload>
                ) : null}
                <S.ImageUpload
                    mode="basic"
                    chooseLabel="انتخاب تصویر پروفایل"
                    name="demo[]"
                    accept="image/*"
                    maxFileSize={1000000}
                    onSelect={handleImageSelect}
                    customUpload
                    ref={uploadRef}
                />
            </S.UploadContainer>

            <S.InputsContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="name">نام</S.InputLabel>
                    <S.Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="lastName">نام خانوادگی</S.InputLabel>
                    <S.Input
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        id="lastName"
                    />
                </S.InputContainer>
                <S.InputContainer>
                    <S.InputLabel htmlFor="email">ایمیل</S.InputLabel>
                    <S.Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                    />
                </S.InputContainer>
            </S.InputsContainer>
        </S.Container>
    );
};

export default SettingModal;
