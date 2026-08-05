export enum UserStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum SocialPlatform {
  WEBSITE = 'WEBSITE',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  YOUTUBE = 'YOUTUBE',
  TIKTOK = 'TIKTOK',
  DISCORD = 'DISCORD',
}

export type jwtPayloadType = {
  sub: string;
  role: UserRoles;
};

export type AccessTokenType = {
  accessToken: string;
};
