import { ChannelListMessengerProps } from 'stream-chat-react'

import { useDiscordContext } from '@/context/DiscordContext'
import CategoryItem from './CategoryItem'
import ChannelListTopBar from './TopBar/ChannelListTopBar'

const CustomChannelList: React.FC<ChannelListMessengerProps> = () => {
	const { server, channelsByCategories } = useDiscordContext()

	return (
		<div className='w-72 bg-medium-gray h-full flex flex-col items-start'>
			<ChannelListTopBar serverName={server?.name || 'Direct Messages'} />

			<div className='w-full'>
				{Array.from(channelsByCategories.keys()).map((category, index) => (
					<CategoryItem
						key={`${category}-${index}`}
						category={category}
						serverName={server?.name || 'Direct Messages'}
						channels={channelsByCategories.get(category) || []}
					/>
				))}
			</div>
		</div>
	)
}

export default CustomChannelList
