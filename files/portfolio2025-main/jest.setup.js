import '@testing-library/jest-dom';

// Mock next/navigation functions
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
  notFound: jest.fn(),
  useSearchParams: jest.fn(() => null),
}));

// Mock next-intl functions
jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn((params) => {
    // Create a function that returns a mock translation
    const mockTranslator = jest.fn((key, values) => {
      if (values) {
        return `${key} with values: ${JSON.stringify(values)}`;
      }
      return `${key} translation`;
    });

    // Add raw method to the translator function
    mockTranslator.raw = jest.fn((key) => {
      // Return mock data based on namespace
      if (params.namespace === 'Work') {
        return { items: [{ company: 'Test Company', title: 'Test Title', start: '2023', end: 'Present', description: 'Test description' }] };
      }
      if (params.namespace === 'Education') {
        return { items: [{ school: 'Test School', degree: 'Test Degree', start: '2020', end: '2024' }] };
      }
      if (params.namespace === 'Projects') {
        return { items: [{ title: 'Test Project', description: 'Test description' }] };
      }
      if (params.namespace === 'Certifications') {
        return { items: [{ title: 'Test Certification', dates: '2023', location: 'Remote', description: 'Test description', certificate: 'Test certificate' }] };
      }
      return { [key]: 'Mock translation data' };
    });

    return mockTranslator;
  }),
  setRequestLocale: jest.fn(),
}));

jest.mock('next-intl', () => ({
  hasLocale: jest.fn().mockReturnValue(true),
}));

// Mock the next/link component
jest.mock('next/link', () => {
  return jest.fn(({ children, ...props }) => {
    return <a {...props}>{children}</a>;
  });
});
