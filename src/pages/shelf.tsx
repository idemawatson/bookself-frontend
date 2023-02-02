import { FC } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import Page from '@/components/templates/shelf'
import AuthRequired from '@/components/templates/AuthRequired'

const AuthPage: FC & { layout?: typeof MainLayout } = AuthRequired(Page)
AuthPage.layout = MainLayout

export default AuthPage
