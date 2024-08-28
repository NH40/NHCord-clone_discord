'Use clint'

import { useDiscordContext } from '@/context/DiscordContext'
import { UseClient } from '@/hooks/useClient'
import { useVideoClient } from '@/hooks/useViseoClient'
import { StreamVideo } from '@stream-io/video-react-sdk'
import { User } from 'stream-chat'
import {
	Channel,
	ChannelList,
	Chat,
	MessageInput,
	MessageList,
	Thread,
	Window,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'
import CustomChannelList from './ChannalList/CustomChannelList'
import CustomChannelHeader from './MessageList/CustomChannelHeader/CustomChannelHeader'
import CustomDateSeparator from './MessageList/CustomDateSeparator/CustomDateSeparator'
import MyCall from './MyCall/MyCall'
import ServerList from './ServerList/ServerList'

const MyChat = ({
	apiKey,
	user,
	token,
}: {
	apiKey: string
	user: User
	token: string
}) => {
	const chatClient = UseClient({
		apiKey,
		user,
		tokenOrProvider: token,
	})

	const videoClient = useVideoClient({
		apiKey,
		user,
		tokenOrProvider: token,
	})

	const { callId } = useDiscordContext()

	if (!chatClient) {
		return <div>Загрузка идет поиск клиента для отрисовки компонента</div>
	}

	if (!videoClient) {
		return <div>Загрузка идет поиск видео для отрисовки компонента</div>
	}

	return (
		<StreamVideo client={videoClient}>
			<Chat client={chatClient} theme='str-chat__theme-light'>
				<section className='flex h-screen w-screen layout'>
					<ServerList />
					<ChannelList List={CustomChannelList} />
					{callId && <MyCall callId={callId} />}
					{!callId && (
						<Channel
							DateSeparator={CustomDateSeparator}
							HeaderComponent={CustomChannelHeader}
							// Message={CustomMessage}
							// reactionOptions={customReactionOptions}
							// Input={MessageComposer}
						>
							<Window>
								<MessageList />
								<MessageInput />
							</Window>
							<Thread />
						</Channel>
					)}
				</section>
			</Chat>
		</StreamVideo>
	)
}

export default MyChat
