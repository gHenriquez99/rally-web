type AppleAppSiteAssociation = {
  applinks: {
    apps: string[];
    details: Array<{
      appID: string;
      paths: string[];
    }>;
  };
};

export const IOS_BUNDLE_ID = "com.rallyapp.app";
export const CLAIMED_UNIVERSAL_LINK_PATHS = ["/e/*"];

const appleTeamId = "N77BC3L3XU";

export function getAppleAppSiteAssociation(): AppleAppSiteAssociation {
  return {
    applinks: {
      apps: [],
      details: [
        {
          appID: `${appleTeamId}.${IOS_BUNDLE_ID}`,
          paths: CLAIMED_UNIVERSAL_LINK_PATHS,
        },
      ],
    },
  };
}
