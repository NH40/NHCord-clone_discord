import { CloseIcon } from '@/components/Icons'
import UserRow from '@/components/ServerList/UserRow'
import { useDiscordContext } from '@/context/DiscordContext'
import { TUserObject } from '@/models/UserObject'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatContext } from 'stream-chat-react'

type TChannelForm = {
	channelName: string
	category: string
	users: TUserObject[]
}

export default function CreateChannelForm() {
	const params = useSearchParams()
	const router = useRouter()
	const { client } = useChatContext()
	const { createChannel } = useDiscordContext()

	const showCreateChannelForm = params.get('createChannel')
	const category = params.get('category')

	const dialogRef = useRef<HTMLDialogElement>(null)

	const initialState: TChannelForm = {
		channelName: '',
		category: category ?? '',
		users: [],
	}

	const [formData, setFormData] = useState<TChannelForm>(initialState)
	const [users, setUsers] = useState<TUserObject[]>([])

	const loadUsers = useCallback(async () => {
		const response = await client.queryUsers({})
		const users: TUserObject[] = response.users
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
		if (users) setUsers(users)
	}, [client])

	useEffect(() => {
		loadUsers()
	}, [loadUsers])

	useEffect(() => {
		if (showCreateChannelForm && dialogRef.current) {
			dialogRef.current.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showCreateChannelForm])

	return (
		<dialog className=' absolute z-10 space-y-2 rounded-xl' ref={dialogRef}>
			<div className='w-full flex items-center justify-between py-8 px-6'>
				<h2 className='text-3xl font-semibold text-gray-600'>
					Создание канала
				</h2>
				<Link href='/'>
					<CloseIcon className=' w-6 h-6 text-gray-400' />
				</Link>
			</div>
			<form method='dialog' className='flex flex-col space-y-4 px-6'>
				<label htmlFor='channelName' className='labelTitle'>
					Название канала
				</label>
				<div className='flex items-center bg-gray-100'>
					<span className=' text-2xl p-2 text-gray-500'>#</span>
					<input
						type='text'
						id='channelName'
						name='channelName'
						value={formData.channelName}
						onChange={e =>
							setFormData({ ...formData, channelName: e.target.value })
						}
					/>
				</div>
				<label
					htmlFor='category'
					className='labelTitle flex items-center justify-between'
				>
					Тип канала
				</label>
				<div className='flex items-center bg-gray-100'>
					<span className=' text-2xl p-2 text-gray-500'>#</span>
					<input
						type='text'
						id='category'
						name='category'
						value={formData.category}
						onChange={e =>
							setFormData({ ...formData, category: e.target.value })
						}
					/>
				</div>
				<h2 className='mb-2 labelTitle'>Добавить пользователей</h2>
				<div className='max-h-64 overflow-y-scroll'>
					{users.map(user => (
						<UserRow user={user} userChanged={userChanged} key={user.id} />
					))}
				</div>
			</form>
			<div className='flex space-x-6 items-center justify-end p-6 bg-gray-200'>
				<Link href={'/'} className='font-semibold text-gray-500'>
					Cancel
				</Link>
				<button
					type='submit'
					disabled={buttonDisabled()}
					className={`bg-discord rounded py-2 px-4 text-white font-bold uppercase ${
						buttonDisabled() ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					onClick={createClicked}
				>
					Создать канал
				</button>
			</div>
		</dialog>
	)

	function buttonDisabled(): boolean {
		return (
			!formData.channelName || !formData.category || formData.users.length <= 1
		)
	}

	function createClicked() {
		createChannel(
			client,
			formData.channelName,
			formData.category,
			formData.users.map(user => user.id)
		)
		setFormData(initialState)
		router.replace('/')
	}

	function userChanged(user: TUserObject, checked: boolean) {
		if (checked) {
			setFormData({
				...formData,
				users: [...formData.users, user],
			})
		} else {
			setFormData({
				...formData,
				users: formData.users.filter(thisUser => thisUser.id !== user.id),
			})
		}
	}
}
