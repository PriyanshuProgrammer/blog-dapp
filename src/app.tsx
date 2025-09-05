import { AppProviders } from '@/components/app-providers.tsx'
import { AppLayout } from '@/components/app-layout.tsx'
import { RouteObject, useRoutes } from 'react-router'
import { lazy } from 'react'

const links = [
  //
  { label: 'Home', path: '/' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'My Blogs', path: '/my-blogs' },
]

const Blogs = lazy(() => import('@/components/blogs'))
const MyBlogs = lazy(() => import('@/components/myblogs'))
const LazyDashboard = lazy(() => import('@/components/dashboard'))
const CreateBlogs = lazy(() => import('@/components/createBlogs'))
const BlogView = lazy(() => import('@/components/blog-view'))

const routes: RouteObject[] = [
  { index: true, element: <LazyDashboard /> },
  {
    path: 'blogs',
    children: [
      { index: true, element: <Blogs /> },
      { path: ':id', element: <BlogView /> },
    ],
  },
  {
    path: 'create-blog',
    children: [{ index: true, element: <CreateBlogs /> }],
  },
  {
    path: 'my-blogs',
    children: [{ index: true, element: <MyBlogs /> }],
  }
]

export function App() {
  const router = useRoutes(routes)
  return (
    <AppProviders>
      <AppLayout links={links}>{router}</AppLayout>
    </AppProviders>
  )
}
