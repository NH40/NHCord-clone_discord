'Use clint'

import { UseClient } from '@/hooks/useClient'
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
	if (!chatClient) {
		return <div>Загрузка идет поиск клиента для отрисовки компонента</div>
	}
	return (
		<Chat client={chatClient} theme='str-chat__theme-light'>
			<section className='flex h-screen w-screen layout'>
				<ServerList />
				<ChannelList />
				<Channel>
					<Window>
						<MessageList />
						<MessageInput />
					</Window>
					<Thread />
				</Channel>
			</section>
		</Chat>
	)
}

export default MyChat
