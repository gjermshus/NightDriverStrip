import { render } from '@testing-library/react';
import { AppPannel } from '../AppPannel';

describe('AppPannel', () => {
    it('should render AppBar and Drawer', () => {
        const { getByText } = render(<AppPannel />);
        expect(getByText('NightDriverStrip')).toBeInTheDocument();
        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Settings')).toBeInTheDocument();
    });
});