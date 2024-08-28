import { useDiscordContext } from '@/context/DiscordContext'
import Image from 'next/image'
import { ChannelListMessengerProps } from 'stream-chat-react'
import CategoryItem from './CategoryItem'

import ChannelListBottomBar from './BottomBar/ChannelListBottomBar'
import CallList from './CallList/CallList'
import CreateChannelForm from './CreateChannelForm/CreateChannelForm'
import ChannelListTopBar from './TopBar/ChannelListTopBar'

const CustomChannelList: React.FC<ChannelListMessengerProps> = () => {
	const { server, channelsByCategories } = useDiscordContext()

	return (
		<div className='w-72 bg-medium-gray h-full flex flex-col items-start'>
			<ChannelListTopBar serverName={server?.name || 'Direct Messages'} />

			{server?.image ? (
				<Image
					src={server.image}
					width={783}
					height={200}
					alt=''
					className='w-full h-48'
				/>
			) : (
				''
			)}
			<div className='w-full'>
				{Array.from(channelsByCategories.keys()).map((category, index) => (
					<CategoryItem
						key={`${category}-${index}`}
						category={category}
						serverName={server?.name || 'Личные сообщение'}
						channels={channelsByCategories.get(category) || []}
					/>
				))}
			</div>
			<CallList />
			<CreateChannelForm />
			<ChannelListBottomBar />
		</div>
	)
}

export default CustomChannelList
