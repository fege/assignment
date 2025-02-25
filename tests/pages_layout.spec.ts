import { test, expect } from '@playwright/test';
import { base_url} from "@helpers/constants";

test.describe('Pages layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(base_url);
  });
    
  test('should containt all element in the landing page', async ({ page }) => {
    // Expect main page workspaces.
    await expect(page.getByTestId('kong-ui-app-layout-main').getByText('Workspaces')).toBeVisible();
  
    // Expect content in the sidebar.
    const sidebarList = page.getByRole('list').getByText('WorkspacesTeamsDev Portal (')
    await expect(sidebarList.getByRole('link', { name: 'Workspaces' })).toBeVisible()
    await expect(sidebarList.getByRole('link', { name: 'Teams' })).toBeVisible()
    await expect(sidebarList.getByRole('link', { name: 'Dev Portal (Konnect)' })).toBeVisible()
    await expect(sidebarList.getByRole('link', { name: 'Analytics (Konnect)' })).toBeVisible()
  });

  test('should have the correct content for Wokspaces tab', async ({ page }) => { 
    // Click on workspace
    await page.getByRole('link', { name: 'Workspaces' }).click()
    
    // Expect Summary content
    await expect(page.getByText('Summary')).toBeVisible();
    await expect(page.getByTestId('Services')).toContainText('Services');
    await expect(page.getByTestId('Routes')).toContainText('Routes');
    await expect(page.getByTestId('Consumers')).toContainText('Consumers');
    await expect(page.getByTestId('Plugins')).toContainText('Plugins');
    await expect(page.getByTestId('API Requests')).toContainText('API Requests');
  
    // Expect Workspaces filter content and summary
    await expect(page.getByRole('searchbox')).toHaveAccessibleName('Filter Workspaces');
    await expect(page.getByTestId('table-header-name')).toHaveText('Workspace Name');
    await expect(page.getByTestId('table-header-totalServices')).toHaveText('Gateway Services');
    await expect(page.getByTestId('table-header-totalConsumers')).toHaveText('Consumers');
    await expect(page.getByTestId('table-header-totalRoutes')).toHaveText('Routes');
  
    await expect(page.getByTestId('workspace-link-default')).toBeVisible();
  
    // Expect Kong Konnect section
    await expect(page.getByText('Konnect Another way to get')).toBeVisible();
  });

  test('should have the correct content for Teams tab', async ({ page }) => { 
    // Click on Teams
    await page.getByRole('link', { name: 'Teams' }).click()
    
    // Expect Teams header and content
    await expect(page.getByRole('heading').filter({ hasText: 'Teams' })).toBeVisible();

    const teamsList = page.getByRole('list').getByText('AdminsRBAC UsersGroupsRoles')
    await expect(teamsList.getByRole('listitem').filter({ hasText: 'Admins' })).toBeVisible()
    await expect(page.getByText('Users that have access to')).toBeVisible();

    // Expect Invited header
    await expect(page.getByRole('heading').filter({ hasText: 'Invited' })).toBeVisible();
    
    // Check RBAC Users tab in Teams
    await teamsList.getByRole('listitem').filter({ hasText: 'RBAC Users' }).click();
    await expect(page.getByText('Users that have programmatic')).toBeVisible();
    await expect(page.getByText('Workspace:')).toBeVisible();
    await page.getByTestId('select-input').click();
    await expect(page.getByRole('button', { name: 'default' })).toBeVisible();

    // Checks could continue here for every tab in Teams and Create Groups
    // Also the invited section can be checked for its content
  });
});
