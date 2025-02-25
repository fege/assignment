import { test, expect, Page } from '@playwright/test';
import { base_url, api_url } from "@helpers/constants";

const serviceName = 'example_service_'+(Math.random().toString(36).substring(7));
const serviceUrl = 'https://httpbin.konghq.com';
const routeName = 'mocking';
const routePath = '/mock';


test.describe('Creates a new service', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(base_url);
    await page.getByTestId('workspace-link-default').click();
    await expect(page.getByTestId('kong-ui-app-layout-main').getByText('Overview')).toBeVisible();
  });

  test.afterEach(async ({ request }) => {
    const deleteRoute = await request.delete(api_url+'routes/'+routeName);
    expect(deleteRoute.ok()).toBeTruthy();

    const deleteService = await request.delete(api_url+'services/'+serviceName);
    expect(deleteService.ok()).toBeTruthy();

  });
    

  test('should be possible from Gateway Service', async ({ page }) => {
    await page.getByRole('link', { name: 'Gateway Service'}).click();
    await expect(page.getByTestId('kong-ui-app-layout-main').getByText('Gateway Services', { exact: true })).toBeVisible();
    await expect(page.getByText('Configure a New Gateway')).toBeVisible();
    await page.getByTestId('empty-state-action').filter({ hasText: 'New Gateway Service' }).click();

    await createService(page);
    await verifyService(page);
    await createRoute(page);
    await verifyRoute(page)
  });
});

async function createService(page) {
    await expect(page.getByText('New Gateway Service', { exact: true })).toBeVisible();
    await page.getByTestId('gateway-service-name-input').fill(serviceName);
    await page.getByTestId('gateway-service-tags-input').fill('tag1');
    await page.getByTestId('gateway-service-url-input').fill(serviceUrl);
    await page.getByRole('button', { name: 'Save'}).click()
}

async function verifyService(page) {
    await expect(page.getByRole('link', { name: serviceName })).toBeVisible();
    await expect(page.getByText(serviceUrl)).toBeVisible();
}

async function createRoute(page) {
    await page.getByRole('button', { name: 'Routes'}).click();
    await expect(page.getByTestId('vtab-content').getByText('Routes', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'New Route' }).click();
    await expect(page.getByText('Create Route', { exact: true })).toBeVisible();
    await page.getByTestId('route-form-name').fill(routeName);
    await page.getByTestId('route-form-paths-input-1').fill(routePath);
    await page.getByRole('button', { name: 'Save'}).click();
}

async function verifyRoute(page) {
    await expect(page.getByText(routeName, { exact: true })).toBeVisible();
    await expect(page.getByText(routePath, { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Overview' }).click();
    await expect(page.getByText('Gateway Service was created', { exact: true })).toBeVisible();
    await expect(page.getByText('Route was created', { exact: true })).toBeVisible();
}
