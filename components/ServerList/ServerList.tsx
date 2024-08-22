import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CreateServerForm from './CreateServerForm'

export default function ServerList() {
	const [activeServer, setActiveServer] = useState<DiscordServer | undefined>()
	const servers: DiscordServer[] = [
		{
			id: '1',
			name: 'Test',
			image:
				'https://i.pinimg.com/564x/49/80/12/498012f5e058c5133f19a0552c9acc30.jpg',
		},
		{
			id: '2',
			name: 'Test2',
			image:
				'https://i.pinimg.com/564x/26/2d/7d/262d7daf788bd8b4729a06812f63d298.jpg',
		},
		{
			id: '3',
			name: 'Test3',
			image:
				'https://i.pinimg.com/564x/01/0f/de/010fde7adc3e0cd0f3afe4d11c5dc3e0.jpg',
		},
		{
			id: '4',
			name: 'Test4',
			image: '',
		},
	]
	return (
		<div className='bg-dark-gray h-full flex flex-col items-center'>
			{servers.map(server => (
				<button
					className={`p-4 sidebar-icon ${
						server.id === activeServer?.id ? 'selected-icon' : ''
					}`}
					key={server.id}
					onClick={() => setActiveServer(server)}
				>
					{server.image && checkUrl(server.image) ? (
						<Image
							className='rounded-icon'
							src={server.image}
							width={50}
							height={50}
							alt='Server Icon'
						/>
					) : (
						<span className='rounded-icon bg-gray-600 w-[50px] flex items-center justify-center text-sm'>
							{server.name.charAt(0)}
						</span>
					)}
				</button>
			))}
			<Link
				href={'/?createServer=true'}
				className='flex items-center justify-center rounded-icon bg-white p-2 my-2 text-2xl font-light h-12 w-12 text-green-500 hover:bg-green-500 hover:text-white hover:rounded-xl transition-all duration-200 ease-in-out'
			>
				<span className='initial-block'>+</span>
			</Link>
			<CreateServerForm />
		</div>
	)

	function checkUrl(path: string): Boolean {
		try {
			const _ = new URL(path)
			return true
		} catch (_) {
			return false
		}
	}
}
