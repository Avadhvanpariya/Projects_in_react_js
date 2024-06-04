const hostname = window.location.hostname;

let baseUrl;
if (hostname === 'admin.rajrachna.com') {
  baseUrl = 'https://api-prod.rajrachna.com';
} else if (hostname === 'test-admin.rajrachna.com') {
  baseUrl = 'https://api-prod.rajrachna.com';
} else {
  baseUrl = 'https://api-prod.rajrachna.com';
  // baseUrl = 'http://localhost';
}

const apiConfig = {
  BASE_URL: baseUrl,
};

export default apiConfig;
