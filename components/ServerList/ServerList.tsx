import { useDiscordContext } from '@/context/DiscordContext'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { Channel } from 'stream-chat'
import { useChatContext } from 'stream-chat-react'
import CreateServerForm from './CreateServerForm'

export default function ServerList() {
	const { server: activeServer, changeServer } = useDiscordContext()
	const { client } = useChatContext()
	const [serverList, setServerList] = useState<DiscordServer[]>([])

	const loaderServerList = useCallback(async (): Promise<void> => {
		const channels = await client.queryChannels({
			type: 'messaging',
			members: {
				$in: [client.userID as string],
			},
		})
		const serverSet: Set<DiscordServer> = new Set(
			channels
				.map((channel: Channel) => {
					return {
						//@ts-ignore
						id: channel.data?.data?.id,
						//@ts-ignore
						name: (channel.data?.data?.server as string) ?? 'Unknown',
						//@ts-ignore
						image: channel.data?.data?.image,
					}
				})
				.filter((server: DiscordServer) => server.name !== 'Unknown')
				.filter(
					(server: DiscordServer, index, self) =>
						index ===
						self.findIndex(serverObject => serverObject.name == server.name)
				)
		)
		const serverArray = Array.from(serverSet.values())
		setServerList(serverArray)
		if (serverArray.length > 0) {
			console.log(serverArray[0])
			changeServer(serverArray[0], client)
		}
	}, [client, changeServer])

	useEffect(() => {
		loaderServerList()
	}, [loaderServerList])

	return (
		<div className='bg-dark-gray h-full flex flex-col items-center'>
			<button
				onClick={() => changeServer(undefined, client)}
				className={`block p-3 aspect-square sidebar-icon border-b-2 border-b-gray-300 ${
					activeServer === undefined ? 'selected-icon' : ''
				}`}
			>
				<div className='rounded-icon discord-icon'></div>
			</button>
			{serverList.map(server => (
				<button
					className={`p-4 sidebar-icon ${
						server.name === activeServer?.name ? 'selected-icon' : ''
					}`}
					key={server.name}
					onClick={() => changeServer(server, client)}
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
