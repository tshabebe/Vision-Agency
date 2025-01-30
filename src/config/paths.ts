export const paths = {
  home: {
    getHref: () => '/',
  },
  social: {
    gitHub: {
      getHref: () => 'https://github.com/tshabebe/Instuctise',
    },
    twitter: {
      getHref: () => '#',
    },
    linkedIn: {
      getHref: () => '#',
    },
  },
  auth: {
    register: {
      getHref: () => '/login',
    },
    login: {
      getHref: () => '/login/google',
    },
    callback: {
      getHref: () => '/login/google/callback',
    },
  },

  app: {
    root: {
      getHref: () => '/',
    },
    dashboard: {
      getHref: () => '/home',
    },
  },
  landing: {
    root: {
      getHref: () => '/',
    },
    pricing: {
      getHref: () => '/pricing',
    },
    FAQ: {
      getHref: () => '/faq',
    },
    blogs: {
      getHref: () => '/blogs',
    },
  },
} as const;
