import { render, fireEvent } from '@testing-library/react';
import { ConfigItem } from '../configItem';
import { useSiteConfig } from '../SiteConfigProvider';

jest.mock('../SiteConfigProvider', () => ({
  useSiteConfig: jest.fn(),
}));

const mockSiteConfigSetter = jest.fn();

describe('ConfigItem Component', () => {

  test('renders boolean config entry if type is boolean', () => {
    (useSiteConfig as jest.Mock).mockReturnValue({
      siteConfig: {
        statsAnimateChange: { name: 'Test Name', type: 'boolean', value: true },
      },
      siteConfigSetter: mockSiteConfigSetter,
    });

    const { getByText } = render(<ConfigItem configKey='statsAnimateChange' />);
    expect(getByText('Test Name')).toBeInTheDocument();
  });

  test('clicking on ListItem makes TextConfigEntry visible if type is not boolean', () => {
    (useSiteConfig as jest.Mock).mockReturnValueOnce({
      siteConfig: {
        statsRefreshRate: { name: 'Refresh rate', type: 'int', value: 3 },
      },
      siteConfigSetter: mockSiteConfigSetter,
    });

    const { getByText } = render(<ConfigItem configKey='statsRefreshRate' />);
    fireEvent.click(getByText('Refresh rate'));
    expect(getByText('3')).toBeInTheDocument();
    // Check if a input field of type number is rendered
    expect(getByText('3')).toHaveAttribute('type', 'number');
    
  });
});
