import { useDiscordContext } from '@/context/DiscordContext'
import { TUserObject } from '@/models/UserObject'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useChatContext } from 'stream-chat-react'
import CloseIcon from '../Icons'
import UserRow from './UserRow'

type TFormState = {
	serverName: string
	serverImage: string
	users: TUserObject[]
}

export default function CreateServerForm() {
	const { client } = useChatContext()
	const params = useSearchParams()
	const showCreateServerForm = params.get('createServer')
	const dialogRef = useRef<HTMLDialogElement>(null)
	const router = useRouter()
	const { createServer } = useDiscordContext()

	const initialState: TFormState = {
		serverName: '',
		serverImage: '',
		users: [],
	}
	const [formData, setFormData] = useState<TFormState>(initialState)
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
		if (showCreateServerForm && dialogRef.current) {
			dialogRef.current.showModal()
		} else {
			dialogRef.current?.close()
		}
	}, [showCreateServerForm])

	useEffect(() => {
		loadUsers()
	}, [loadUsers])

	return (
		<dialog className='absolute z-10 space-y-2 rounded-xl' ref={dialogRef}>
			<div className='w-full flex items-center justify-between py-8 px-6'>
				<h2 className='text-3xl font-semibold text-gray-600'>
					Создать новый сервер
				</h2>
				<Link href='/'>
					<CloseIcon />
				</Link>
			</div>
			<form method='dealog' className='flex flex-col space-y-2 px-6'>
				<label htmlFor='serverName' className='labelTitle'>
					Название сервера
				</label>
				<div className='flex items-center bg-gray-100 rounded'>
					<span className='text-2xl p-2 text-gray-500'>#</span>
					<input
						type='text'
						id='serverName'
						name='serverName'
						value={formData.serverName}
						onChange={e =>
							setFormData({ ...formData, serverName: e.target.value })
						}
						required
					/>
				</div>
				<label htmlFor='serverImage' className='labelTitle'>
					Ссылка на Изображения
				</label>
				<div className='flex items-center bg-gray-100 rounded'>
					<span className='text-2xl p-2 text-gray-500'>#</span>
					<input
						type='text'
						id='serverImage'
						name='serverImage'
						value={formData.serverImage}
						onChange={e =>
							setFormData({ ...formData, serverImage: e.target.value })
						}
						required
					/>
				</div>
				<h2 className='mb-2 labelTitle'>Добавить на сервер</h2>
				<div className='max-h-64 overflow-y-scroll'>
					{users.map(user => (
						<UserRow key={user.id} user={user} userChanged={userChanged} />
					))}
				</div>
			</form>
			<div className='flex space-x-6 items-center justify-end p-6 bg-gray-200'>
				<Link href={'/'} className='font-semibold text-gray-500'>
					Завершить
				</Link>
				<button
					onClick={createServerClicked}
					type='submit'
					disabled={buttonDisabled()}
					className={`bg-discord rounded py-2 px-4 text-white font-bold uppercase ${
						buttonDisabled() ? 'opacity-50 cursor-not-allowed' : ''
					}`}
				>
					Создать Сервер
				</button>
			</div>
		</dialog>
	)

	function createServerClicked() {
		createServer(
			client,
			formData.serverName,
			formData.serverImage,
			formData.users.map(user => user.id)
		)
		setFormData(initialState)
		router.replace('/')
	}

	function buttonDisabled(): boolean {
		return (
			!formData.serverName || !formData.serverImage || formData.users.length < 1
		)
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
