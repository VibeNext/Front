// src/stores/useAuthStore.js
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 이미지
import avatar1 from '../assets/icons/profile/avatar1.svg';
import avatar2 from '../assets/icons/profile/avatar2.svg';
import avatar3 from '../assets/icons/profile/avatar3.svg';
import avatar4 from '../assets/icons/profile/avatar4.svg';

const avatars = [avatar1, avatar2, avatar3, avatar4];

function getAvatarByEmail(email) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash + email.charCodeAt(i)) % avatars.length;
  }
  return avatars[hash];
}

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        email: null,
        name: null,
        avatar: null,
        grantType: null,
        accessToken: null,
        refreshToken: null,
        accessExpireAt: null,
        refreshExpireAt: null,
      },
      isAuthenticated: false,

      // 회원가입: 랜덤 아바타 배정
      registerUser: ({ name, email }) => {
        const avatar = getAvatarByEmail(email);
        set({
          user: {
            ...get().user,
            name,
            email,
            avatar, // 고정 아바타
          },
          isAuthenticated: false,
        });
      },

      // 로그인(API 응답 저장 + 랜덤 아바타 없는 경우 자동 생성)
      login: (payload) => {
        const prevUser = get().user;

        // avatar 없으면 랜덤 생성
        const avatar =
          prevUser?.avatar ??
          avatars[Math.floor(Math.random() * avatars.length)];

        set({
          user: {
            email: payload.email ?? prevUser.email,
            name: prevUser.name, // 이름은 회원조회 API에서 갱신됨
            avatar,
            grantType: payload.grantType,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            accessExpireAt: payload.accessExpireAt,
            refreshExpireAt: payload.refreshExpireAt,
          },
          isAuthenticated: true,
        });
      },

      // 회원정보 조회 후 이름·프로필 업데이트
      updateProfile: ({ name, profile_image }) => {
        set({
          user: {
            ...get().user,
            name,
            avatar: profile_image ?? get().user.avatar,
          },
        });
      },

      // 로그아웃
      logout: () =>
        set({
          isAuthenticated: false,
          user: {
            email: null,
            name: null,
            avatar: null,
            grantType: null,
            accessToken: null,
            refreshToken: null,
            accessExpireAt: null,
            refreshExpireAt: null,
          },
        }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
