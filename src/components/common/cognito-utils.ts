const clientId = '5j6sue1pf7pvv36ehq2carmc03';
const domain = 'https://authhub.auth.ap-southeast-2.amazoncognito.com';
const redirectUri = 'http://localhost:3001/callback';

export const getCognitoLoginUrl = () => {
  return `https://${domain}/login?client_id=${clientId}&response_type=code&scope=openid+profile+email&redirect_uri=${redirectUri}`;
};
