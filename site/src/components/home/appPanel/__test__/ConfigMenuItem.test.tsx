import { fireEvent, render, screen } from '@testing-library/react';
import { ConfigMenuItem } from '../ConfigMenuItem';

describe('ConfigMenuItem Component', () => {
    test('renders without crashing', () => {
        const { getByText } = render(<ConfigMenuItem />);

        expect(getByText("Settings")).toBeInTheDocument();
    });

    test('config panel is not visible initially', () => {
        render(<ConfigMenuItem />);

        const configPanel = screen.queryByTestId('config-panel');
        expect(configPanel).not.toBeInTheDocument();
    });

    test('config panel opens and closes when settings button is clicked', () => {
        render(<ConfigMenuItem />);

        const settingsButton = screen.getByRole('button');
        fireEvent.click(settingsButton);

        let configPanel = screen.getByText('Dark mode');
        expect(configPanel).toBeInTheDocument();

        fireEvent.click(settingsButton);
        // configPanel = screen.queryByTestId('config-panel');
        expect(configPanel).not.toBeInTheDocument();
    });
});
