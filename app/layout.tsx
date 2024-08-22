import { DiscordContextProvider } from '@/context/DiscordContext'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'NHcord | NH Discord',
	description: 'Discord create to NH',
	icons: '/discord.svg',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang='ru'>
				<DiscordContextProvider>
					<body className={inter.className}>{children}</body>
				</DiscordContextProvider>
			</html>
		</ClerkProvider>
	)
}
