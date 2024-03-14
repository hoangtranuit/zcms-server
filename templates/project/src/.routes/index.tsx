import { Fragment, Suspense } from 'react'
// import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import type { ActionFunction, RouteObject, LoaderFunction } from 'react-router-dom'
import { generateRegularRoutes } from './utils'

type Element = () => JSX.Element
type Module = { default: Element; Loader?: LoaderFunction; Action?: ActionFunction; Catch?: Element; Pending?: Element }

const PAGES = import.meta.glob<Module>(['/src/pages/**/[\\w[-]*.{jsx,tsx,mdx}', '!**/({404,login/index}).*'], { eager: true })
const LAYOUT = import.meta.glob<Module>('/src/layout/index.{tsx,jsx}', { eager: true })
const FALLBACK = import.meta.glob<Module>('/src/pages/404.{tsx,jsx}', { eager: true })
const LOGIN = import.meta.glob<Module>('/src/pages/login/index.{tsx,jsx}', { eager: true })

const _app = LAYOUT?.['/src/layout/index.tsx']
const _fallback = FALLBACK?.['/src/pages/404.tsx']
const _login = LOGIN?.['/src/pages/login/index.tsx']

const Element: any = _app?.default || Fragment
const Layout = () => (_app?.Pending ? <Suspense fallback={<_app.Pending />} children={<Element />} /> : <Element><Outlet /></Element>)

const app = { Component: Layout, ErrorBoundary: _app.Catch, loader: _app?.Loader }
const fallback = { path: '*', Component: _fallback?.default || Fragment }
const login = { path: '/login', Component: _login?.default || Fragment }


const pages = generateRegularRoutes<RouteObject, Partial<Module>>(PAGES, (module, key) => {
    const index = /index\.(jsx|tsx|mdx)$/.test(key) && !key.includes('pages/index') ? { index: true } : {}
    const Element = module?.default || Fragment
    const Page = () => (module?.Pending ? <Suspense fallback={<module.Pending />} children={<Element />} /> : <Element />)
    return { ...index, Component: Page, ErrorBoundary: module?.Catch, loader: module?.Loader, action: module?.Action }
})


const routes: RouteObject[] = [{ ...app, children: [...pages, fallback] }, login]
export const AppRoute = () => <RouterProvider router={createBrowserRouter(routes)} />
