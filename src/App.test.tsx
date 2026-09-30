import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import App from './App';

describe('App', () => {
    afterEach(() => {
        cleanup();
        document.getElementById('modal-root')?.remove();
    });

    it('Рендерит запуски после загрузки', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                json: async () => ({
                    launches: [
                        {
                            mission_name: 'Test Mission',
                            details: 'Test details',
                            rocket: {
                                rocket_name: 'Falcon 9',
                            },
                            links: {
                                mission_patch_small: 'small.jpg',
                                mission_patch: 'large.jpg',
                            },
                        },
                    ],
                }),
            })
        );

        render(
            <MantineProvider>
                <App />
            </MantineProvider>
        );

        expect(
            await screen.findByText('Test Mission')
        ).toBeInTheDocument();
    });

    it('Открывает модальное окно при нажатии See more', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                json: async () => ({
                    launches: [
                        {
                            mission_name: 'Test Mission',
                            details: 'Test details',
                            rocket: {
                                rocket_name: 'Falcon 9',
                            },
                            links: {
                                mission_patch_small: 'small.jpg',
                                mission_patch: 'large.jpg',
                            },
                        },
                    ],
                }),
            })
        );

        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);

        render(
            <MantineProvider>
                <App />
            </MantineProvider>
        );

        const button = await screen.findByRole('button', {
            name: 'See more',
        });

        button.click();

        expect(
            await screen.findByText('Mission name:')
        ).toBeInTheDocument();
    });

    it('Закрывает модальное окно', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                json: async () => ({
                    launches: [
                        {
                            mission_name: 'Test Mission',
                            details: 'Test details',
                            rocket: {
                                rocket_name: 'Falcon 9',
                            },
                            links: {
                                mission_patch_small: 'small.jpg',
                                mission_patch: 'large.jpg',
                            },
                        },
                    ],
                }),
            })
        );

        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);

        render(
            <MantineProvider>
                <App />
            </MantineProvider>
        );

        const openButton = await screen.findByRole('button', {
            name: 'See more',
        });

        openButton.click();

        expect(
            await screen.findByText('Mission name:')
        ).toBeInTheDocument();

        const closeButton = screen.getByRole('button', {
            name: 'X',
        });

        closeButton.click();

        await waitFor(() => {
            expect(
                screen.queryByText('Mission name:')
            ).not.toBeInTheDocument();
        });
    });
    it('Показывает Loader во время загрузки', () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockReturnValue(
                new Promise(() => {})
            )
        );

        render(
            <MantineProvider>
                <App />
            </MantineProvider>
        );

        expect(
            document.querySelector('.mantine-Loader-root')
        ).toBeInTheDocument();
    });
});