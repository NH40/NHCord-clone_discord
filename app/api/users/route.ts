import { TUserObject } from '@/models/UserObject'
import { StreamChat } from 'stream-chat'

export async function GET() {
	const serverClient = StreamChat.getInstance(
		'y7uy4wwyq7u8',
		process.env.STREAM_SECRET
	)
	const response = await serverClient.queryUsers({})
	const data: TUserObject[] = response.users
		.filter(user => user.role !== 'admin')
		.map(user => {
			return {
				id: user.id,
				name: user.name ?? user.id,
				image: user.image as string,
				online: user.online,
				lastOnline: user.last_active,
			}
		})

	return Response.json({ data })
}
