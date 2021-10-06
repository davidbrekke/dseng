import NextAuth from 'next-auth'

export default NextAuth({
  // next-auth azure-ad provider wasnt working for me, credit here
  // https://github.com/nextauthjs/next-auth/discussions/2690
  providers: [
    {
      id: 'azure-ad',
      name: 'Azure Active Directory',
      type: 'oauth',
      authorization: {
        url: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/authorize?response_mode=query`,
        params: {
          scope: 'user.read offline_access',
        },
      },
      token: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`,
      userinfo: 'https://graph.microsoft.com/oidc/userinfo',
      profile(profile) {
        return {
          id: profile.sub,
          ...profile,
        }
      },
      options: {
        clientId: process.env.AZURE_AD_CLIENT_ID,
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      },
    },
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
})
