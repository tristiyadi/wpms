import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header Component', () => {
  it('renders the correct title', () => {
    render(<Header title="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders admin user profile info', () => {
    render(<Header title="Packages" />);
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('Super Admin')).toBeInTheDocument();
  });

  it('contains the profile initials', () => {
    render(<Header title="Packages" />);
    expect(screen.getByText('AD')).toBeInTheDocument();
  });
});
